const jwt = require('jsonwebtoken'); // For decoding token if needed, though authMiddleware does it.
                                  // Actually, we rely on authMiddleware to populate req.user.

// This middleware assumes that `authMiddleware` has already run and populated `req.user`.
const adminAuthMiddleware = (req, res, next) => {
  // req.user should be populated by the preceding authMiddleware
  // It should contain { userId, userType, email, role }

  if (!req.user) {
    // This should ideally be caught by authMiddleware if it runs first.
    // Adding as a safeguard in case middleware order is incorrect.
    return res.status(401).json({ message: 'Access denied. Authentication required.' });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
  }

  // If user is admin, proceed to the next middleware or route handler
  next();
};

module.exports = adminAuthMiddleware;
