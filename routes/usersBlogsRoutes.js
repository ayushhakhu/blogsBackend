const express = require("express");

const router = express.Router();

const { getUserBlogs } = require("../controllers/blogController");

router.get("/:username", getUserBlogs);

module.exports = router;
