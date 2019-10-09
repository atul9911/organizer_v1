const jwt = require('jsonwebtoken');

function validateUser(req, res, next) {
  jwt.verify(req.headers['x-access-token'], process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      res.status(401).json({ status: "error", message: "invalid authorization token", data: null });
    } else {
      // add user id to request
      req.body.userId = decoded.id;
      next();
    }
  });

}

module.exports = { validateUser };