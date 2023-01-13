const express = require("express");

const router = express.Router();

const isAuth = require("../middleware/auth/isAuth");
const {
  fetchBlogReviewComments,
  postBlogReviewComment,
  deleteReviewComment,
  updateReviewComment,
} = require("../controllers/blogReviewCommentsController");

const {
  createBlogReviewCommentValidator,
  ValidationBlogReviewComment,
  updateBlogReviewCommentValidator,
  ValidationBlogReviewCommentUpdate,
} = require("../middleware/validators/blogReviewCommentsValidators");

router.get("/:reviewId", fetchBlogReviewComments);

router.post(
  "/:reviewId",
  isAuth,
  createBlogReviewCommentValidator(),
  ValidationBlogReviewComment,
  postBlogReviewComment
);

router.delete("/:reviewCommentId", isAuth, deleteReviewComment);

router.put(
  "/:reviewCommentId",
  isAuth,
  updateBlogReviewCommentValidator(),
  ValidationBlogReviewCommentUpdate,
  updateReviewComment
);

module.exports = router;
