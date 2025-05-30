const Employee = require('../models/Employee');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register new employee
exports.registerEmployee = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if employee already exists
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) return res.status(400).json({ message: 'Employee already exists' });

    // Create new employee
    const employee = new Employee({ name, email, password, role });
    await employee.save();

    res.status(201).json({ message: 'Employee registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Employee login
exports.loginEmployee = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find employee by email
    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: employee._id, email: employee.email, role: employee.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Return the token and user info
    return res.json({
      token,
      user: {
        name: employee.name,
        email: employee.email,
        role: employee.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get employee profile



// Get employee profile
exports.getEmployeeProfile = async (req, res) => {
  try {
    const employee = await Employee.findById(req.user.id).select('-password');

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json({
      id: employee._id,
      name: employee.name,
      email: employee.email,
      role: employee.role,
      createdAt: employee.createdAt
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all employees (for TL Dashboard)
exports.getAllEmployees = async (req, res) => {
  try {
    // Only allow Team Leads to access this
    if (req.user.role !== 'TL') {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    const employees = await Employee.find()
      .select('-password')
      .sort({ createdAt: -1 });

    res.json(employees);
  } catch (error) {
    console.error('Get employees error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update employee profile
exports.updateEmployee = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const updateData = { name, email, role };

    // Only allow Team Leads to change roles
    if (role && req.user.role !== 'TL') {
      return res.status(403).json({ message: 'Only Team Leads can change roles' });
    }

    // Employees can only update their own profile unless they're Team Leads
    if (req.user.role !== 'TL' && req.params.id !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to update this profile' });
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json({
      message: 'Profile updated successfully',
      employee: updatedEmployee
    });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete employee (Team Lead only)
exports.deleteEmployee = async (req, res) => {
  try {
    // Only allow Team Leads to delete employees
    if (req.user.role !== 'TL') {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    // Cannot delete yourself
    if (req.params.id === req.user.id) {
      return res.status(400).json({ message: 'Cannot delete your own account' });
    }

    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);

    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


