const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      if (decode) {
        req.body.name = decode.name;
        req.body.userID = decode._id;
        next();
      } else {
        res.send.status(401).json({ message: "please Login" });
      }
    } catch (error) {
      res.send.status(401).json({ message: "Internal server error" });
    }
  } else {
    res.send.status(401).json({ message: "please Login" });
  }
};

module.exports = auth;
