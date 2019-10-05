const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateBlogInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.author = !isEmpty(data.author) ? data.author : '';

  if (!Validator.isLength(data.title, { min: 2, max: 100 })) {
    errors.title = 'Title must be between 2 and 100 characters';
  }
  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title is required';
  }
  if (Validator.isEmpty(data.author)) {
    errors.author = 'Author is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
