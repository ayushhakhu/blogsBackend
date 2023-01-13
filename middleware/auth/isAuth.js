const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
  try {
    const token = await req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new Error("Token was not provided.");
    }

    const decodedToken = await jwt.verify(
      token,
      "superSecretPasscodeImpossibletoCrack"
    );
    req.username = await decodedToken.username;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = isAuth;
