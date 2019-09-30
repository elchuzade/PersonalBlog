const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateBlogInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.intro = !isEmpty(data.intro) ? data.intro : '';
  data.author = !isEmpty(data.author) ? data.author : '';
  data.body = !isEmpty(data.body) ? data.body : '';

  if (!Validator.isLength(data.title, { min: 2, max: 100 })) {
    errors.title = 'Title must be between 2 and 100 characters';
  }
  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title is required';
  }
  if (Validator.isEmpty(data.intro)) {
    errors.intro = 'Intro is required';
  }
  if (Validator.isEmpty(data.author)) {
    errors.author = 'Author is required';
  }
  if (Validator.isEmpty(data.body)) {
    errors.body = 'Body is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
