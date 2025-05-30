const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { auth } = require('../middleware/auth'); 


// Routes
router.post('/',  projectController.addProject);             // Add project
router.get('/',  projectController.getAllProjects);          // Get all projects
router.get('/:id', projectController.getProjectById);       // Get project by ID
router.put('/:id',  projectController.updateProject);        // Update project
router.delete('/:id', projectController.deleteProject);

module.exports = router;
