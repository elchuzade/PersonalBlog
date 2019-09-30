const express = require('express');
const router = express.Router();
const passport = require('passport');
const Blog = require('../../models/Blog');
const validateBlogInput = require('../../validation/blog');

// AWS IMAGES
const aws = require('aws-sdk');
const config = require('../../config/keys');
const upload = require('../files');
const blogAvatar = upload.uploadBlogAvatar.single('blogAvatar');
const blogCover = upload.uploadBlogCover.single('blogCover');

aws.config.update({
  secretAccessKey: config.secretAccessKey,
  accessKeyId: config.accessKeyId,
  region: 'eu-central-1'
});

const s3 = new aws.S3();

// @route GET api/blogs
// @desc Get all blogs
// @access Public
router.get('/', (req, res) => {
  const errors = {};
  Blog.find()
    .sort({ createdAt: -1 })
    .then(allBlogs => {
      res.json(allBlogs);
    })
    .catch(err => {
      errors.blogsnotfound = 'Blogs not found';
      console.log(err);
      res.status(404).json(errors);
    });
});

// @route GET api/blogs/:id
// @desc Get single blog by id
// @access Public
router.get('/:id', (req, res) => {
  const errors = {};
  Blog.findById(req.params.id)
    .then(foundBlog => {
      res.json(foundBlog);
    })
    .catch(err => {
      errors.blognotfound = 'Blog not found';
      console.log(err);
      res.status(404).json(errors);
    });
});

// @route POST api/blogs
// @desc Post new blog
// @access Private / Admin
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateBlogInput(req.body);
    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors obj
      return res.status(400).json(errors);
    }
    const blogFields = {};
    if (req.body.title) blogFields.title = req.body.title;
    if (req.body.intro) blogFields.intro = req.body.intro;
    if (req.body.body) blogFields.body = req.body.body;
    if (req.body.author) blogFields.author = req.body.author;
    new Blog(blogFields)
      .save()
      .then(newBlog => {
        res.status(200).json({
          item: newBlog,
          action: 'add',
          message: 'Added blog'
        });
      })
      .catch(err => {
        errors.blog = 'Blog can not be saved';
        console.log(err);
        return res.status(400).json(errors);
      });
  }
);

// @route PUT api/blogs/:id
// @desc Update existing blog
// @access Private / Admin
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateBlogInput(req.body);
    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors obj
      return res.status(400).json(errors);
    }
    const blogFields = {};
    if (req.body.title) blogFields.title = req.body.title;
    if (req.body.intro) blogFields.intro = req.body.intro;
    if (req.body.body) blogFields.body = req.body.body;
    if (req.body.author) blogFields.author = req.body.author;
    if (req.body.description) blogFields.description = req.body.description;
    Blog.findByIdAndUpdate(req.params.id, blogFields, { new: true })
      .then(updatedBlog => {
        res.status(200).json({
          item: updatedBlog,
          action: 'update',
          message: 'Updated blog'
        });
      })
      .catch(err => {
        errors.blog = 'Blog can not be updated';
        console.log(err);
        return res.status(400).json(errors);
      });
  }
);

// @route DELETE api/blogs/:id
// @desc Delete blog
// @access Private / Admin
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Blog.findById(req.params.id)
      .then(blog => {
        let deleteObjects = [];
        let deleteBucket = '';
        if (blog.avatar.key || blog.cover.key) {
          if (blog.avatar && blog.avatar.key) {
            deleteBucket = blog.avatar.bucket;
            deleteObjects.push({ Key: blog.avatar.key });
          }
          const params = {
            Bucket: deleteBucket,
            Delete: {
              Objects: deleteObjects
            }
          };
          s3.deleteObjects(params, (err, data) => {
            if (err) {
              console.log(err);
            } else {
              blog
                .remove()
                .then(() =>
                  res.status(200).json({
                    item: { _id: req.params.id },
                    action: 'delete',
                    message: 'Deleted blog'
                  })
                )
                .catch(err => {
                  errors.blog = 'Blog can not be deleted';
                  console.log(err);
                  return res.status(400).json(errors);
                });
            }
          });
        } else {
          blog
            .remove()
            .then(() =>
              res.status(200).json({
                item: { _id: req.params.id },
                action: 'delete',
                message: 'Deleted blog'
              })
            )
            .catch(err => {
              errors.blog = 'Blog can not be deleted';
              console.log(err);
              return res.status(400).json(errors);
            });
        }
      })
      .catch(err => {
        errors.blognotfound = 'Blog not found';
        console.log(err);
        res.status(404).json(errors);
      });
  }
);

// @route POST api/blogs/avatar/:id
// @desc Upload blog's avatar
// @access Private / Admin
router.post(
  '/avatar/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Blog.findById(req.params.id).then(blog => {
      if (blog.avatar && blog.avatar.key) {
        // Delete blog avatar
        const params = {
          Bucket: blog.avatar.bucket,
          Delete: {
            Objects: [{ Key: blog.avatar.key }]
          }
        };
        s3.deleteObjects(params, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            // Deleted blog avatar - now create a new one
            blogAvatar(req, res, err => {
              if (err) {
                console.log(err);
                errors.uploadfail = 'Failed to upload an image';
                return res.json(errors);
              }
              if (req.file == undefined) {
                console.log(err);
                errors.selectfail = 'No file selected';
                return res.json(errors);
              }
              blog.avatar.location = req.file.location;
              blog.avatar.key = req.file.key;
              blog.avatar.bucket = req.file.bucket;
              blog.avatar.originalname = req.file.originalname;
              blog.avatar.mimetype = req.file.mimetype;
              blog.avatar.size = req.file.size;
              blog.avatar.fieldName = req.file.metadata.fieldName;
              blog
                .save()
                .then(deletedAvatarBlog =>
                  res.status(200).json(deletedAvatarBlog)
                )
                .catch(err => {
                  console.log(err);
                  errors.blognotsaved = 'Blog not saved';
                  return res.status(404).json(errors);
                });
            });
          }
        });
      } else {
        // Create blog avatar
        blogAvatar(req, res, err => {
          if (err) {
            console.log(err);
            errors.uploadfail = 'Failed to upload an image';
            return res.json(errors);
          }
          if (req.file == undefined) {
            console.log(err);
            errors.selectfail = 'No file selected';
            return res.json(errors);
          }
          blog.avatar.location = req.file.location;
          blog.avatar.key = req.file.key;
          blog.avatar.bucket = req.file.bucket;
          blog.avatar.originalname = req.file.originalname;
          blog.avatar.mimetype = req.file.mimetype;
          blog.avatar.size = req.file.size;
          blog.avatar.fieldName = req.file.metadata.fieldName;
          blog
            .save()
            .then(deletedAvatarBlog => res.status(200).json(deletedAvatarBlog))
            .catch(err => {
              console.log(err);
              errors.blognotsaved = 'Blog not saved';
              return res.status(404).json(errors);
            });
        });
      }
    });
  }
);

// @route DELETE api/blogs/avatar/:id
// @desc Delete blog's avatar
// @access Private / Admin
router.delete(
  '/avatar/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Blog.findById(req.params.id)
      .then(blog => {
        if (blog.avatar && blog.avatar.key) {
          const params = {
            Bucket: blog.avatar.bucket,
            Delete: {
              Objects: [{ Key: blog.avatar.key }]
            }
          };
          s3.deleteObjects(params, (err, data) => {
            if (err) {
              console.log(err);
            } else {
              blog.avatar = null;
              blog
                .save()
                .then(deletedAvatarBlog =>
                  res.status(200).json(deletedAvatarBlog)
                )
                .catch(err => {
                  console.log(err);
                  errors.blognotsaved = 'Blog not saved';
                  return res.status(404).json(errors);
                });
            }
          });
        } else {
          errors.avatarnotfound = 'Blog avatar not found';
          return res.status(404).json(errors);
        }
      })
      .catch(err => {
        console.log(err);
        errors.blognotfound = 'Blog not found';
        return res.status(404).json(errors);
      });
  }
);

module.exports = router;
