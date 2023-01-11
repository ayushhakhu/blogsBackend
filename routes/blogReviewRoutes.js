const express = require("express");
const blogReviewsController = require("../controllers/blogReviewController");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.get("/:blogId", blogReviewsController.fetchBlogReviews);

router.post("/:blogId", isAuth, blogReviewsController.postBlogReview);

router.delete("/:reviewId", isAuth, blogReviewsController.deleteReview);

router.put("/:reviewId", isAuth, blogReviewsController.updateReview);

module.exports = router;
