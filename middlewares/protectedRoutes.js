const jwt = require('jsonwebtoken');
const protectRoute = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'Authentication required. Token missing or invalid.',
      });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        message: 'Invalid token format.',
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.decoded = decoded;
    next();
  } catch (error) {
    console.error('JWT Error:', error.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
module.exports = { protectRoute };