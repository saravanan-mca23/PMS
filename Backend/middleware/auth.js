const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');

// Middleware to verify token
exports.auth = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Middleware for role-based access
exports.adminAuth = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.user.id);

    if (!employee || employee.role !== 'admin') {
      return res.status(403).json({ message: 'Access forbidden: Admin only' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
