const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
  try {
    const token = await req.headers.authorization?.split(" ")[1];

    console.log("token~~~~~~>", token);

    if (!token) {
      throw new Error("Token was not provided.");
    }

    const decodedToken = await jwt.verify(
      token,
      "superSecretPasscodeImpossibletoCrack"
    );
    req.username = await decodedToken.username;
    req.userFullName =
      await `${decodedToken.firstName} ${decodedToken.lastName}`;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = isAuth;
