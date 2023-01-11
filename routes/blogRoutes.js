const express = require("express");
const blogController = require("../controllers/blogController");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.get("/", blogController.fetchAllBlogs);

router.post("/", isAuth, blogController.createBlog);

router.delete("/:blogId", isAuth, blogController.deleteBlog);

router.put("/:blogId", isAuth, blogController.updateBlog);

module.exports = router;
