const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    logger.warn('Authorization denied: No token provided');
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    logger.info(`Authorization successful for user: ${decoded.user.email}`);
    next();
  } catch (err) {
    logger.warn('Authorization denied: Invalid token');
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
