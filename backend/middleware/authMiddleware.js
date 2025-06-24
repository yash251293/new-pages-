const jwt = require('jsonwebtoken'); // Requires npm install by user

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1]; // Get token part

    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
      // Verify token
      // Ensure JWT_SECRET is in your .env file
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Add user from payload to request object
      req.user = decoded; // Contains payload like { userId, userType, email }
      next(); // Pass control to the next middleware or route handler
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Access denied. Token expired.' });
      }
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Access denied. Invalid token.' });
      }
      // For other errors, it might be a server issue or an unexpected JWT error
      console.error('Error in authMiddleware:', error);
      return res.status(500).json({ message: 'Failed to authenticate token.' });
    }
  } else {
    // No Authorization header or not Bearer type
    return res.status(401).json({
      message: 'Access denied. Authorization header missing or malformed (Bearer token expected).',
    });
  }
};

module.exports = authMiddleware;
