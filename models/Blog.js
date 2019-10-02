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
    author: {
      type: String,
      required: true
    },
    tags: {
      type: String
    },
    body: [
      {
        type: {
          // type is either image or text
          type: String,
          required: true
        },
        index: {
          // index is used to be able to order items and swap them
          type: Number,
          required: true
        },
        image: {
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
        text: {
          type: String
        }
      }
    ]
  },
  { timestamps: true }
);

module.exports = Blog = mongoose.model('blog', BlogSchema);
