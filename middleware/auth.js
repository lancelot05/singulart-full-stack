const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token)
    return res.status(401).json({ msg: 'Authorization failed. Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(400).json({ msg: 'Token is not valid' });
  }
};

module.exports = auth;
