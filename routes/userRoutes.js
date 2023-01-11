const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");
const isAuth = require("../middleware/isAuth");

router.post("/signup", userController.signup);

router.post("/login", userController.login);

router.get("/count", isAuth, userController.getBlogsCount);

module.exports = router;
