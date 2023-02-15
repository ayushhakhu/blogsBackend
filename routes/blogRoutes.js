const express = require("express");
const {
  fetchAllBlogs,
  createBlog,
  deleteBlog,
  updateBlog,
  getBlog,
  fetchBlogsCount,
} = require("../controllers/blogController");
const isAuth = require("../middleware/auth/isAuth");

const {
  ValidationBlogCreate,
  createBlogValidationRules,
  updateBlogValidationRules,
  ValidationBlogUpdate,
} = require("../middleware/validators/blogValidators");

const {
  createBlogSanitizers,
  updateBlogSanitizers,
} = require("../middleware/sanitizers/blogSanitizers");

const router = express.Router();

router.get("/", fetchAllBlogs);

router.get("/count", fetchBlogsCount);

router.post(
  "/",
  isAuth,
  createBlogValidationRules(),
  createBlogSanitizers(),
  ValidationBlogCreate,
  createBlog
);

router.delete("/:blogId", isAuth, deleteBlog);

router.get("/:blogId", getBlog);

router.put(
  "/:blogId",
  isAuth,
  updateBlogValidationRules(),
  updateBlogSanitizers(),
  ValidationBlogUpdate,
  updateBlog
);

module.exports = router;
