

// backend/middleware/authorize.js
const jwt = require('jsonwebtoken');
// Authorization middleware 
//RBAC
// This middleware checks if the user has the required role to access a route
const authorize = (allowedRoles = []) => {
  return (req, res, next) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    // Admin has full access
    if (user.roleId === 1) return next();

    // Allow only specific roleIds
    if (!allowedRoles.includes(user.roleId)) {
      return res.status(403).json({ message: 'Access denied: Insufficient role privileges' });
    }

    next();
  };
};

module.exports = authorize;
