const { body } = require("express-validator");

const createBlogSanitizers = () => {
  return [
    body("blogCategory")
      .customSanitizer((value) => {
        return value.charAt(0).toUpperCase() + value.slice(1);
      })
      .trim(),
  ];
};

const updateBlogSanitizers = () => {
  return [
    body("blogCategory")
      .customSanitizer(
        (value) => value.charAt(0).toUpperCase() + value.slice(1)
      )
      .trim(),
  ];
};

module.exports = {
  createBlogSanitizers,
  updateBlogSanitizers,
};
