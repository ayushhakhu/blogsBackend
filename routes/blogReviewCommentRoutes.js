const express = require("express");

const router = express.Router();

const isAuth = require("../middleware/isAuth");
const blogReviewCommentController = require("../controllers/blogReviewCommentsController");

router.get("/:reviewId", blogReviewCommentController.fetchBlogReviewComments);

router.post(
  "/:reviewId",
  isAuth,
  blogReviewCommentController.postBlogReviewComment
);

router.delete(
  "/:reviewCommentId",
  isAuth,
  blogReviewCommentController.deleteReviewComment
);

router.put(
  "/:reviewCommentId",
  isAuth,
  blogReviewCommentController.updateReviewComment
);

module.exports = router;
