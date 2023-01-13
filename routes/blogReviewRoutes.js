const express = require("express");
const {
  fetchBlogReviews,
  postBlogReview,
  deleteReview,
  updateReview,
} = require("../controllers/blogReviewController");
const isAuth = require("../middleware/auth/isAuth");

const {
  ValidationBlogReview,
  createBlogReviewValidator,
  ValidationBlogReviewUpdate,
  updateBlogReviewValidator,
} = require("../middleware/validators/blogReviewValidators");

const router = express.Router();

router.get("/:blogId", fetchBlogReviews);

router.post(
  "/:blogId",
  isAuth,
  createBlogReviewValidator(),
  ValidationBlogReview,
  postBlogReview
);

router.delete("/:reviewId", isAuth, deleteReview);

router.put(
  "/:reviewId",
  isAuth,
  updateBlogReviewValidator(),
  ValidationBlogReviewUpdate,
  updateReview
);

module.exports = router;
