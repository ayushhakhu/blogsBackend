const { body } = require("express-validator");

const userSignupSanitizers = () => {
  return [body("username").trim().toLowerCase(), body("password").trim()];
};

const userLoginSanitizers = () => {
  return [body("username").trim().toLowerCase(), body("password").trim()];
};

module.exports = {
  userSignupSanitizers,
  userLoginSanitizers,
};
