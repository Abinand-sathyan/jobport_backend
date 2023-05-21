const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["admintoken"];

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decode) => {
      if (err) {
        return res.status(200).send({ message: "Auth failed", success: false });
      } else {
        console.log("admin auth--");
        req.admin_id = decode.id;
        if (decode.role =="admin") {
          console.log("admin with token");
          next();
        } else {
          return res.status(403).send("Access Denied");
        }
      }
    });
  } catch (error) {
    return res.status(401).send({ message: "Auth failed", success: false });
  }
};
