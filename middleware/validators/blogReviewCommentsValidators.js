const { body, validationResult, param } = require("express-validator/check");
const BlogReviewCommentsModel = require("../../model/BlogReviewsCommentsModel");
const BlogReviews = require("../../model/BlogReviewsModel");

const createBlogReviewCommentValidator = () => {
  return [
    body("blogReviewComment")
      .notEmpty()
      .withMessage("Review Comment cannot be empty"),
    param("reviewId").custom((value) => {
      return BlogReviews.findById(value).then((item) => {
        if (!item) {
          throw new Error("No Such Review exists");
        }
      });
    }),
  ];
};

const ValidationBlogReviewComment = (req, res, next) => {
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

const updateBlogReviewCommentValidator = () => {
  return [
    body("blogReviewComment")
      .notEmpty()
      .withMessage("Review Comment cannot be empty"),
    param("reviewCommentId").custom((value) => {
      return BlogReviewCommentsModel.findById(value).then((item) => {
        if (!item) {
          throw new Error("No Such review comment exits");
        }
      });
    }),
  ];
};

const ValidationBlogReviewCommentUpdate = (req, res, next) => {
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
  createBlogReviewCommentValidator,
  ValidationBlogReviewComment,
  updateBlogReviewCommentValidator,
  ValidationBlogReviewCommentUpdate,
};
