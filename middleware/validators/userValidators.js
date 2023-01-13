const { body, validationResult } = require("express-validator");
const UserModel = require("../../model/UserModel");

const useSignUpValidationRules = () => {
  return [
    body("username")
      .custom((value) => {
        return UserModel.find({ username: value }).then((user) => {
          if (user.length > 0) {
            throw new Error("User Exists");
          }
        });
      })
      .notEmpty()
      .withMessage("Empty Field is not accepted")
      .isEmail()
      .withMessage("username should be of type valid email"),
    body("password")
      .isStrongPassword({ minLength: 5, minNumbers: 1, minUppercase: 1 })
      .withMessage(
        "Password should contain Capital , Numbers and Special Chars "
      ),
  ];
};

const validateUserSignUp = (req, res, next) => {
  const errors = validationResult(req);
  try {
    if (errors.isEmpty()) {
      return next();
    } else {
      throw new Error(JSON.stringify(errors.errors));
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  useSignUpValidationRules,
  validateUserSignUp,
};
