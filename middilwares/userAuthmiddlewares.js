const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["accesstoken"];

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decode) => {
      if (err) {
        return res.status(200).send({ message: "Auth failed", success: false });
      } else {
        req.user_id = decode.id;
        next();
      }
    });
  } catch (error) {
    return res.status(401).send({ message: "Auth failed", success: false });
  }
};
