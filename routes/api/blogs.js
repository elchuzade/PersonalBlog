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
const blogImage = upload.uploadBlogImage.single('blogImage');

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
      errors.blog = 'Blogs not found';
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
      errors.blog = 'Blog not found';
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
    Blog.findById(req.params.id)
      .then(blog => {
        blog.title = req.body.title;
        blog.intro = req.body.intro;
        blog.author = req.body.author;
        blog
          .save()
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
      })
      .catch(err => {
        errors.blog = 'Blog not found';
        console.log(err);
        return res.status(404).json(errors);
      });
  }
);

// @route POST api/blogs/text/:id
// @desc Add body item to the blog
// @access Private / Admin
router.post(
  '/text/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    const bodyTextFields = {};
    bodyTextFields.type = 'text';
    if (req.body.text) bodyTextFields.text = req.body.text;
    Blog.findById(req.params.id)
      .then(blog => {
        blog.body.push(bodyTextFields);
        blog
          .save()
          .then(savedBlog => {
            res.status(200).json({
              item: savedBlog,
              action: 'add',
              message: 'Added blog body text'
            });
          })
          .catch(err => {
            errors.blog = 'Blog can not be saved';
            console.log(err);
            return res.status(400).json(errors);
          });
      })
      .catch(err => {
        errors.blog = 'Blog can not be saved';
        console.log(err);
        return res.status(400).json(errors);
      });
  }
);

// @route POST api/blogs/text/:id/:textId
// @desc Add body item to the blog
// @access Private / Admin
router.put(
  '/text/:id/:textId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Blog.findById(req.params.id)
      .then(blog => {
        for (let i = 0; i < blog.body.length; i++) {
          if (blog.body[i]._id == req.params.textId) {
            blog.body[i].text = req.body.text;
          }
        }
        blog
          .save()
          .then(savedBlog => {
            res.status(200).json({
              item: savedBlog,
              action: 'update',
              message: 'Updated blog body text'
            });
          })
          .catch(err => {
            errors.blog = 'Blog can not be saved';
            console.log(err);
            return res.status(400).json(errors);
          });
      })
      .catch(err => {
        errors.blog = 'Blog can not be found';
        console.log(err);
        return res.status(400).json(errors);
      });
  }
);

// @route DELETE api/blogs/text/:id/:textId
// @desc Delete body item of the blog
// @access Private / Admin
router.delete(
  '/text/:id/:textId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Blog.findById(req.params.id)
      .then(blog => {
        var newbody = blog.body.filter(
          element => element._id != req.params.textId
        );
        blog.body = newbody;
        blog
          .save()
          .then(savedBlog => {
            res.status(200).json({
              item: savedBlog,
              action: 'delete',
              message: 'Deleted blog body text'
            });
          })
          .catch(err => {
            errors.blog = 'Blog can not be saved';
            console.log(err);
            return res.status(400).json(errors);
          });
      })
      .catch(err => {
        errors.blog = 'Blog can not be found';
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
        errors.blog = 'Blog not found';
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
    Blog.findById(req.params.id)
      .then(blog => {
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
                    errors.blog = 'Blog not saved';
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
              .then(deletedAvatarBlog =>
                res.status(200).json(deletedAvatarBlog)
              )
              .catch(err => {
                console.log(err);
                errors.blog = 'Blog not saved';
                return res.status(404).json(errors);
              });
          });
        }
      })
      .catch(err => {
        errors.blog = 'Blog not found';
        console.log(err);
        return res.status(400).json(errors);
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
                  errors.blog = 'Blog not saved';
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
        errors.blog = 'Blog not found';
        return res.status(404).json(errors);
      });
  }
);

// @route POST api/blogs/image/:id
// @desc Upload blog body image
// @access Private / Admin
router.post(
  '/image/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Blog.findById(req.params.id)
      .then(blog => {
        blogImage(req, res, err => {
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
          let newImage = {};
          newImage.location = req.file.location;
          newImage.key = req.file.key;
          newImage.bucket = req.file.bucket;
          newImage.originalname = req.file.originalname;
          newImage.mimetype = req.file.mimetype;
          newImage.size = req.file.size;
          newImage.fieldName = req.file.metadata.fieldName;
          let newElement = {};
          newElement.type = 'image';
          newElement.image = newImage;
          blog.body.push(newElement);
          blog
            .save()
            .then(blog => res.status(200).json(blog))
            .catch(err => {
              console.log(err);
              errors.blog = 'Blog not saved';
              return res.status(404).json(errors);
            });
        });
      })
      .catch(err => {
        errors.blog = 'Blog not found';
        console.log(err);
        return res.status(400).json(errors);
      });
  }
);

// @route PUT api/blogs/image/:id/:imageId
// @desc Upload blog body image
// @access Private / Admin
router.put(
  '/image/:id/:imageId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Blog.findById(req.params.id)
      .then(blog => {
        for (let i = 0; i < blog.body.length; i++) {
          if (blog.body[i]._id == req.params.imageId) {
            const params = {
              Bucket: blog.body[i].image.bucket,
              Delete: {
                Objects: [{ Key: blog.body[i].image.key }]
              }
            };
            s3.deleteObjects(params, (err, data) => {
              if (err) {
                console.log(err);
              } else {
                blogImage(req, res, err => {
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
                  let newImage = {};
                  newImage.location = req.file.location;
                  newImage.key = req.file.key;
                  newImage.bucket = req.file.bucket;
                  newImage.originalname = req.file.originalname;
                  newImage.mimetype = req.file.mimetype;
                  newImage.size = req.file.size;
                  newImage.fieldName = req.file.metadata.fieldName;
                  blog.body[i].image = newImage;
                  blog
                    .save()
                    .then(blog => res.status(200).json(blog))
                    .catch(err => {
                      console.log(err);
                      errors.blog = 'Blog not saved';
                      return res.status(404).json(errors);
                    });
                });
              }
            });
          }
        }
      })
      .catch(err => {
        errors.blog = 'Blog not found';
        console.log(err);
        return res.status(400).json(errors);
      });
  }
);

// @route DELETE api/blogs/image/:id/:imageId
// @desc Delete blog body image
// @access Private / Admin
router.delete(
  '/image/:id/:imageId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Blog.findById(req.params.id)
      .then(blog => {
        for (let i = 0; i < blog.body.length; i++) {
          if (blog.body[i]._id == req.params.imageId) {
            const params = {
              Bucket: blog.body[i].image.bucket,
              Delete: {
                Objects: [{ Key: blog.body[i].image.key }]
              }
            };
            s3.deleteObjects(params, (err, data) => {
              if (err) {
                console.log(err);
              } else {
                blog.body.splice(i, 1);
                blog
                  .save()
                  .then(deletedAvatarBlog =>
                    res.status(200).json(deletedAvatarBlog)
                  )
                  .catch(err => {
                    console.log(err);
                    errors.blog = 'Blog not saved';
                    return res.status(404).json(errors);
                  });
              }
            });
          }
        }
      })
      .catch(err => {
        console.log(err);
        errors.blog = 'Blog not found';
        return res.status(404).json(errors);
      });
  }
);

module.exports = router;
