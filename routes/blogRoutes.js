const express = require("express");
const {
  fetchAllBlogs,
  createBlog,
  deleteBlog,
  updateBlog,
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

router.post(
  "/",
  isAuth,
  createBlogValidationRules(),
  createBlogSanitizers(),
  ValidationBlogCreate,
  createBlog
);

router.delete("/:blogId", isAuth, deleteBlog);

router.put(
  "/:blogId",
  isAuth,
  updateBlogValidationRules(),
  updateBlogSanitizers(),
  ValidationBlogUpdate,
  updateBlog
);

module.exports = router;
