const BlogReviewModel = require("../model/BlogReviewsModel");
const BlogReviewsCommentsModel = require("../model/BlogReviewsCommentsModel");
const UserModel = require("../model/UserModel");

const LIMIT = 10;

const fetchBlogReviews = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    const { page } = req.query;

    const blogReviews = await BlogReviewModel.find({ blogId: blogId })
      .populate({
        path: "user",
        select: "firstName lastName -_id",
      })
      .select(["-blogId"])
      .limit(LIMIT)
      .skip((page - 1) * LIMIT);

    await res.status(201).json(blogReviews);
  } catch (err) {
    next(err);
  }
};

const postBlogReview = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    const { blogReview } = req.body;
    const username = req.username;

    const userId = await UserModel.findOne({ username: username });

    const blogReviews = new BlogReviewModel({
      blogReview: blogReview,
      blogId: blogId,
      reviewCommentsCount: 0,
      user: userId,
    });

    await blogReviews.save();

    await res.status(201).json({ mesage: "Created New Block" });
  } catch (err) {
    next(err);
  }
};

const deleteReview = async (req, res, next) => {
  try {
    const { reviewId } = req.params;

    const result = await BlogReviewModel.findByIdAndDelete({ _id: reviewId });

    if (!result) {
      throw new Error("No Such id exists");
    } else {
      await BlogReviewsCommentsModel.deleteMany({
        blogReviewId: reviewId,
      });

      await res.status(200).json({ message: "Deleted Review Comment" });
    }
  } catch (err) {
    next(err);
  }
};

const updateReview = async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    const { blogReview } = req.body;

    const result = await BlogReviewModel.findByIdAndUpdate(
      { _id: reviewId },
      { blogReview: blogReview }
    );
    if (!result) {
      throw new Error("No Such id exists");
    } else {
      await res.status(200).json({ message: "Updated Review Comment" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  updateReview,
  deleteReview,
  postBlogReview,
  fetchBlogReviews,
};
