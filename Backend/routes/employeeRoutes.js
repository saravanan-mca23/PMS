const express = require('express');
const router = express.Router();
const { registerEmployee, loginEmployee, getEmployeeProfile, getAllEmployees, deleteEmployee } = require('../controllers/employeeController');
const { auth, adminAuth } = require('../middleware/auth');

// Employee Routes
router.post('/register', registerEmployee);  // Register
router.post('/login', loginEmployee);        // Login
router.get('/profile', auth, getEmployeeProfile);  // Profile
router.get('/', auth, getAllEmployees);    // ✅ Get all employees (TL access)
router.delete('/:id', auth, deleteEmployee); 
 // ✅ Delete employee

module.exports = router;
