const Project = require('../models/Project');

// ✅ Add a new project
exports.addProject = async (req, res) => {
    const { name, description, deadline, status, assignedTo } = req.body;

    try {
        const newProject = new Project({
            name,
            description,
            deadline,
            status: status || 'pending',  // Default status to 'pending'
            assignedTo
        });

        await newProject.save();
        res.status(201).json({ message: 'Project added successfully', project: newProject });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add project', error: error.message });
    }
};

// ✅ Get all projects
exports.getAllProjects = async (req, res) => {
    try {
      const projects = await Project.find();
      res.status(200).json(projects);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch projects', error: error.message });
    }
  };

// ✅ Get a single project by ID
exports.getProjectById = async (req, res) => {
    const { id } = req.params;

    try {
        const project = await Project.findById(id).populate( 'name email role');
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch project', error: error.message });
    }
};

// ✅ Update project details
exports.updateProject = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updatedProject = await Project.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.status(200).json({ message: 'Project updated successfully', project: updatedProject });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update project', error: error.message });
    }
};
// ✅ Delete a project by ID
exports.deleteProject = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProject = await Project.findByIdAndDelete(id);

        if (!deletedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete project', error: error.message });
    }
};