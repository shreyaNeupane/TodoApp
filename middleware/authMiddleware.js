const JWT = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    //req.headers["authorization"] is the Authorization header sent by the frontend.
    const token = req.headers["authorization"].split(" ")[1];
    //This checks if the token is valid and not tampered with.
    // process.env.JWT_SECRET is the secret key used to sign the token originally.
    JWT.verify(token, process.env.JWT_SECERT, (err, decode) => {
      if (err) {
        console.log("JWT verification error:", err.message);
        return res.status(401).send({
          success: false,
          message: "Unauthorized user",
        });
      } else {
        req.userId = decode.id;
        next();
      }
    });
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: "please provide auth token",
      error: error.message,
    });
  }
};

module.exports = authMiddleware;
