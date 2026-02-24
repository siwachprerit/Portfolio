import Project from '../models/Project.js';

export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ order: 1 });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
