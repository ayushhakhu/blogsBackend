const express = require("express");

const router = express.Router();

const {
  signup,
  login,
  getBlogsCount,
} = require("../controllers/userController");

const isAuth = require("../middleware/auth/isAuth");

const {
  useSignUpValidationRules,
  validateUserSignUp,
} = require("../middleware/validators/userValidators");

const {
  userSignupSanitizers,
  userLoginSanitizers,
} = require("../middleware/sanitizers/userSanitizers");

router.post(
  "/signup",
  useSignUpValidationRules(),
  userSignupSanitizers(),
  validateUserSignUp,
  signup
);

router.post("/login", userLoginSanitizers(), login);

router.get("/count", isAuth, getBlogsCount);

module.exports = router;
