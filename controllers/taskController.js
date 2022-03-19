import Project from "../models/Project.js";
import Task from "../models/Task.js";

// Nueva Tarea
const newTask = async (req, res) => {
  const { project } = req.body;

  const checkProject = await Project.findById(project);

  if (!checkProject) {
    const error = new Error("El proyecto no existe");
    return res.status(404).json({ error: error.message });
  }

  if (checkProject.owner.toString() !== req.user._id.toString()) {
    const error = new Error("No tienes los permisos para añadir tareas");
    return res.status(403).json({ error: error.message });
  }

  try {
    const taskSaved = await Task.create(req.body);
    res.json(taskSaved);
  } catch (error) {
    console.log(error);
  }
};
// Obtener Tarea
const getTask = async (req, res) => {
  const { id } = req.params;

  const task = await Task.findById(id).populate("project");

  if (!task) {
    const error = new Error("No se encontro la tarea");
    return res.status(404).json({ error: error.message });
  }

  if (task.project.owner.toString() !== req.user._id.toString()) {
    const error = new Error("Acción no válida");
    return res.status(403).json({ error: error.message });
  }

  res.json(task);
};
// Editar Tarea
const updateTask = async (req, res) => {
  const { id } = req.params;

  const task = await Task.findById(id).populate("project");

  if (!task) {
    const error = new Error("No se encontro la tarea");
    return res.status(404).json({ error: error.message });
  }

  if (task.project.owner.toString() !== req.user._id.toString()) {
    const error = new Error("Acción no válida");
    return res.status(403).json({ error: error.message });
  }
  task.name = req.body.name || task.name;
  task.description = req.body.description || task.description;
  task.priority = req.body.priority || task.priority;
  task.taskDate = req.body.taskDate || task.taskDate;

  try {
    const taskSaved = await task.save();
    res.json(taskSaved);
  } catch (error) {
    console.log(error);
  }
};
// Borrar Tarea
const deleteTask = async (req, res) => {
  const { id } = req.params;

  const task = await Task.findById(id).populate("project");

  if (!task) {
    const error = new Error("No se encontro la tarea");
    return res.status(404).json({ error: error.message });
  }

  if (task.project.owner.toString() !== req.user._id.toString()) {
    const error = new Error("Acción no válida");
    return res.status(403).json({ error: error.message });
  }

  try {
    await task.deleteOne();
    res.json({ msg: "Tarea eliminada correctamente" });
  } catch (error) {
    console.log(error);
  }
};
// Cambiar Estado
const changeStatus = async (req, res) => {};

export { newTask, getTask, updateTask, deleteTask, changeStatus };
