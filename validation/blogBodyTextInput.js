const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateBlogBodyTextInput(data) {
  let errors = {};

  data.type = !isEmpty(data.type) ? data.type : '';

  if (Validator.isEmpty(data.type)) {
    errors.type = 'Type is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
