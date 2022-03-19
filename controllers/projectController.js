import Project from "../models/Project.js";
import Task from "../models/Task.js";

// Obtener todos los proyectos
const getAllProjects = async (req, res) => {
  const projects = Project.find().where("owner").equals(req.user);
  res.json(projects);
};

// Obtener un proyecto
const getProject = async (req, res) => {
  const { id } = req.params;
  const project = await Project.findById(id);

  if (!project) {
    const error = new Error("Proyecto no encontrado");
    return res.status(404).json({ msg: error.message });
  }

  if (project.owner.toString() !== req.user._id.toString()) {
    const error = new Error("Acción no válida");
    return res.status(401).json({ msg: error.message });
  }

  // Filtrar las tareas proyectos
  const tasks = await Task.find().where("project").equals(project._id);
  res.json({
    project,
    tasks,
  });
};

// Agrear Proyecto
const newProject = async (req, res) => {
  const project = new Project(req.body);
  project.owner = req.user._id;

  try {
    const projectSaved = await project.save();
    res.json(projectSaved);
  } catch (error) {
    console.log(error);
  }
};

// Editar proyecto
const editProject = async (req, res) => {
  const { id } = req.params;
  const project = await Project.findById(id);

  if (!project) {
    const error = new Error("Projecto con encotrado");
    return res.status(404).json({ error: error.message });
  }

  if (project.owner.toString() !== req.user._id.toString()) {
    const error = new Error("Acción no válida");
    return res.status(401).json({ error: error.message });
  }

  project.name = req.body.name || project.name;
  project.description = req.body.description || project.description;
  project.projectDate = req.body.projectDate || project.projectDate;
  project.client = req.body.client || project.client;

  try {
    const projectSaved = await project.save();
    res.json(projectSaved);
  } catch (error) {
    console.log(error);
  }
};

// Borrar proyecto
const deleteProject = async (req, res) => {
  const { id } = req.params;
  const project = await Project.findById(id);

  if (!project) {
    const error = new Error("Projecto con encotrado");
    return res.status(404).json({ error: error.message });
  }

  if (project.owner.toString() !== req.user._id.toString()) {
    const error = new Error("Acción no válida");
    return res.status(401).json({ error: error.message });
  }

  try {
    await project.deleteOne();
    res.json({ msg: "Projecto Eliminado" });
  } catch (error) {
    console.log(error);
  }
};

// Agregar colaborador
const addCollaborator = async (req, res) => {};

// Borrar un colaborador
const deleteCollaborator = async (req, res) => {};

export {
  getAllProjects,
  getProject,
  newProject,
  editProject,
  deleteProject,
  addCollaborator,
  deleteCollaborator,
};
