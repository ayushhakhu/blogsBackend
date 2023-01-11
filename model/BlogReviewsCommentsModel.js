const { Schema, SchemaTypes, default: mongoose } = require("mongoose");

const BlogReviewsCommentsModelSchema = new Schema(
  {
    blogReviewComment: {
      type: SchemaTypes.String,
    },
    blogReviewId: {
      type: SchemaTypes.ObjectId,
      ref: "BlogReviews",
    },
  },
  {
    versionKey: false,
  }
);

const BlogReviewCommentsModel = mongoose.model(
  "BlogReviewComments",
  BlogReviewsCommentsModelSchema
);

module.exports = BlogReviewCommentsModel;
