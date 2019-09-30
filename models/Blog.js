const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const BlogSchema = new Schema(
  {
    avatar: {
      location: {
        type: String
      },
      key: {
        type: String
      },
      bucket: {
        type: String
      },
      originalname: {
        type: String
      },
      mimetype: {
        type: String
      },
      size: {
        type: Number
      },
      fieldName: {
        type: String
      }
    },
    title: {
      type: String,
      required: true
    },
    intro: {
      type: String,
      required: true
    },
    body: {
      type: String
    },
    author: {
      type: String,
      required: true
    },
    tags: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = Blog = mongoose.model('blog', BlogSchema);
