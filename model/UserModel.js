const { Schema, SchemaTypes, default: mongoose } = require("mongoose");

const UserModelSchema = new Schema(
  {
    username: {
      type: SchemaTypes.String,
      required: true,
    },
    password: {
      type: SchemaTypes.String,
      required: true,
    },
    noOfBlogs: {
      type: SchemaTypes.Number,
    },
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model("User", UserModelSchema);

module.exports = UserModel;
