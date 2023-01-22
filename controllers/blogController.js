const BlogModel = require("../model/BlogModel");
const BlogReviewCommentsModel = require("../model/BlogReviewsCommentsModel");
const BlogReviews = require("../model/BlogReviewsModel");
const UserModel = require("../model/UserModel");

const LIMIT = 10;

const fetchAllBlogs = async (req, res, next) => {
  try {
    const { page } = req.query;

    const blogs = await BlogModel.find({})
      .populate({ path: "blogAuthor", select: "username -_id" })
      .limit(LIMIT)
      .skip((page - 1) * LIMIT);

    await res.status(200).json(blogs);
  } catch (err) {
    next(err);
  }
};

const createBlog = async (req, res, next) => {
  const { username } = req;

  try {
    const foundUser = await UserModel.findOne({ username: username });

    const { blogTitle, blogDetails, blogCategory } = req.body;
    const userId = foundUser._id;

    const blogModel = new BlogModel({
      blogDetails,
      blogTitle,
      blogCategory,
      blogAuthor: userId,
    });

    let noOfBlogs = foundUser.noOfBlogs + 1;

    await blogModel.save();
    await UserModel.findByIdAndUpdate(userId, { noOfBlogs: noOfBlogs });
    await res.status(201).json({ message: "Created New Blog" });
  } catch (err) {
    next(err);
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    const { blogId } = req.params;

    const result = await BlogModel.findByIdAndDelete({
      _id: blogId,
    });
    if (!result) {
      throw new Error("No Such Blog Exists");
    } else {
      const reviews = await BlogReviews.find({ blogId: blogId });
      const reviewCommentsEntry = reviews.filter(
        (item) => item.reviewCommentsCount > 0
      );
      await Promise.all(
        reviewCommentsEntry.map(async (item) => {
          await BlogReviewCommentsModel.deleteMany({
            blogReviewId: item._id,
          });
        })
      );

      await BlogReviews.deleteMany({ blogId: blogId });
      await res.status(200).json({ message: "Deleted Blog" });
    }
  } catch (err) {
    next(err);
  }
};

const updateBlog = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    const { blogTitle, blogDetails, blogCategory } = req.body;

    const result = await BlogModel.findByIdAndUpdate(
      { _id: blogId },
      { blogTitle, blogDetails, blogCategory }
    );
    if (!result) {
      throw new Error("No Such Blog exists");
    } else {
      await res.status(200).json({ message: "Updated Blog" });
    }
  } catch (err) {
    next(err);
  }
};

const getBlog = async (req, res, next) => {
  try {
    const { blogId } = req.params;

    const result = await BlogModel.findById({
      _id: blogId,
    }).populate({ path: "blogAuthor", select: "username -_id" });
    if (!result) {
      throw new Error("No Such Blog Exists");
    } else {
      await res.status(200).json(result);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  fetchAllBlogs,
  createBlog,
  deleteBlog,
  updateBlog,
  getBlog,
};
