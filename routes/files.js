const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const config = require('../config/keys');
const checkFileType = require('../validation/image');

aws.config.update({
  secretAccessKey: config.secretAccessKey,
  accessKeyId: config.accessKeyId,
  region: 'eu-central-1'
});

const s3 = new aws.S3();

const uploadBlogAvatar = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'elchuzade',
    acl: 'public-read',
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      var newFileName = Date.now() + '-' + file.originalname;
      var fullPath = 'blogAvatar/' + newFileName;
      cb(null, fullPath);
    }
  }),
  limits: { fileSize: 2000000 },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
});
const uploadBlogImage = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'elchuzade',
    acl: 'public-read',
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      var newFileName = Date.now() + '-' + file.originalname;
      var fullPath = 'blogImage/' + newFileName;
      cb(null, fullPath);
    }
  }),
  limits: { fileSize: 2000000 },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
});

module.exports.uploadBlogAvatar = uploadBlogAvatar;
module.exports.uploadBlogImage = uploadBlogImage;
