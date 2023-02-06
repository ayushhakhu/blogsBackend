const express = require("express");

const router = express.Router();

const { getCategoryWiseBlogs } = require("../controllers/blogController");

router.get("/:category", getCategoryWiseBlogs);

module.exports = router;
