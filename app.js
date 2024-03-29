const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const blogRoutes = require("./routes/blogRoutes");
const blogReviewRoutes = require("./routes/blogReviewRoutes");
const blogReviewCommentRoutes = require("./routes/blogReviewCommentRoutes");
const userRoutes = require("./routes/userRoutes");
const usersBlogsRoutes = require("./routes/usersBlogsRoutes");
const categoryBlogRoutes = require("./routes/categoryBlogRoutes");

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use("/blogs", blogRoutes);

app.use("/blog_reviews_comments", blogReviewCommentRoutes);

app.use("/blog_reviews", blogReviewRoutes);

app.use("/auth", userRoutes);

app.use("/user", usersBlogsRoutes);

app.use("/category", categoryBlogRoutes);

app.use((err, req, res, next) => {
  console.log("Error Handler Layer to catch all errors");
  res.status(500).json(`${err}`);
});

mongoose
  .connect(
    "mongodb+srv://your-own"
  )
  .then((m) => app.listen(8000))
  .catch((err) => console.log("Unable to connect to Db"));
