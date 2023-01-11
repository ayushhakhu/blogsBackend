const { Schema, SchemaTypes, default: mongoose } = require("mongoose");
const BlogReviewCommentsModel = require("./BlogReviewsCommentsModel");

const BlogReviewsModelSchema = new Schema(
  {
    blogReview: {
      type: SchemaTypes.String,
    },
    blogId: {
      type: SchemaTypes.ObjectId,
      ref: "Blog",
    },
    reviewCommentsCount: {
      type: SchemaTypes.Number,
    },
  },
  {
    versionKey: false,
  }
);

BlogReviewsModelSchema.statics.alterReviewCommentsCount = (reviewId) => {
  // return BlogReviewCommentsModel.find({ blogReviewId: reviewId });
  return BlogReviewCommentsModel.find({ blogReviewId: reviewId }).count();
};

const BlogReviews = mongoose.model("BlogReviews", BlogReviewsModelSchema);

module.exports = BlogReviews;
