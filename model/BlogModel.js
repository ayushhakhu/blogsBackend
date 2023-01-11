const { Schema, SchemaTypes, default: mongoose } = require("mongoose");

const BlogModelSchema = new Schema(
  {
    blogTitle: {
      type: SchemaTypes.String,
      required: true,
    },
    blogDetails: {
      type: SchemaTypes.String,
      required: true,
    },
    blogAuthor: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: "User",
    },
    blogCategory: {
      type: SchemaTypes.String,
      required: true,
    },
    blogReviews: {
      type: SchemaTypes.Number,
    },
  },
  {
    versionKey: false,
  }
);

const BlogModel = mongoose.model("Blog", BlogModelSchema);

module.exports = BlogModel;
