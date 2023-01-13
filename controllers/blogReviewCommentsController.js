const BlogReviewsCommentsModel = require("../model/BlogReviewsCommentsModel");
const BlogReviewModel = require("../model/BlogReviewsModel");

const fetchBlogReviewComments = async (req, res, next) => {
  try {
    const { reviewId } = req.params;

    const blogReviewComments = await BlogReviewsCommentsModel.find({
      blogReviewId: reviewId,
    }).select(["-blogReviewId"]);

    await res.status(201).json(blogReviewComments);
  } catch (err) {
    next(err);
  }
};

const postBlogReviewComment = async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    const { blogReviewComment } = req.body;

    const blogReviewComments = new BlogReviewsCommentsModel({
      blogReviewComment: blogReviewComment,
      blogReviewId: reviewId,
    });

    await blogReviewComments.save();

    const count = await BlogReviewModel.alterReviewCommentsCount(reviewId);

    await BlogReviewModel.updateOne(
      { _id: reviewId },
      { reviewCommentsCount: count }
    );

    await res.status(201).json({ mesage: "Added New Comment" });
  } catch (err) {
    next(err);
  }
};

const deleteReviewComment = async (req, res, next) => {
  try {
    const { reviewCommentId } = req.params;

    const result = await BlogReviewsCommentsModel.findByIdAndDelete({
      _id: reviewCommentId,
    });
    if (!result) {
      throw new Error("No Such Review Comment Exists");
    } else {
      await res.status(200).json({ message: "Deleted Review Comment" });
    }
  } catch (err) {
    next(err);
  }
};

const updateReviewComment = async (req, res, next) => {
  try {
    const { reviewCommentId } = req.params;
    const { blogReviewComment } = req.body;

    const result = await BlogReviewsCommentsModel.findByIdAndUpdate(
      { _id: reviewCommentId },
      { blogReviewComment: blogReviewComment }
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
  fetchBlogReviewComments,
  postBlogReviewComment,
  deleteReviewComment,
  updateReviewComment,
};
