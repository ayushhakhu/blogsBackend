const { body, validationResult, param } = require("express-validator/check");
const BlogModel = require("../../model/BlogModel");
const BlogReviews = require("../../model/BlogReviewsModel");

const createBlogReviewValidator = () => {
  return [
    body("blogReview").notEmpty().withMessage("Review cannot be empty"),
    param("blogId").custom((value) => {
      return BlogModel.findById(value).then((item) => {
        if (!item) {
          throw new Error(`No such blog exists ${item}`);
        }
      });
    }),
  ];
};

const ValidationBlogReview = (req, res, next) => {
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

const updateBlogReviewValidator = () => {
  return [
    body("blogReview").notEmpty().withMessage("Review cannot be empty"),
    param("reviewId").custom((value) => {
      return BlogReviews.findById(value).then((item) => {
        if (!item) {
          throw new Error("No Such review exits");
        }
      });
    }),
  ];
};

const ValidationBlogReviewUpdate = async (req, res, next) => {
  const errors = await validationResult(req);

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
  ValidationBlogReview,
  createBlogReviewValidator,
  ValidationBlogReviewUpdate,
  updateBlogReviewValidator,
};
