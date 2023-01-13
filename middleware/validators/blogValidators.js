const { body, validationResult } = require("express-validator/check");

const createBlogValidationRules = () => {
  return [
    body("blogTitle").notEmpty().withMessage("Blog Title cannot be Empty"),
    body("blogDetails")
      .notEmpty()
      .withMessage("Blog Details cannot be Empty")
      .isLength({ min: 250, max: 2500 })
      .withMessage("Blog Details needs to be of minimum of 250 to 2500 chars"),
    body("blogCategory")
      .notEmpty()
      .withMessage("Blog Category cannot be Empty")
      .isIn(["Science", "Philposophy", "Technology"])
      .withMessage(
        "Blog Category is not in the Science, Philposophy, Technology"
      ),
  ];
};

const ValidationBlogCreate = (req, res, next) => {
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

const updateBlogValidationRules = () => {
  return [
    body("blogTitle").notEmpty().withMessage("Blog Title cannot be Empty"),
    body("blogDetails")
      .notEmpty()
      .withMessage("Blog Details cannot be Empty")
      .isLength({ min: 250, max: 2500 })
      .withMessage("Blog Details needs to be of minimum of 250 to 2500 chars"),
    body("blogCategory")
      .notEmpty()
      .withMessage("Blog Category cannot be Empty")
      .isIn(["Science", "Philposophy", "Technology"])
      .withMessage(
        "Blog Category is not in the Science, Philposophy, Technology"
      ),
  ];
};

const ValidationBlogUpdate = (req, res, next) => {
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
  ValidationBlogCreate,
  createBlogValidationRules,
  updateBlogValidationRules,
  ValidationBlogUpdate,
};
