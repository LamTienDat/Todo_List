import db from "../models/index";
import CRUDService from "../services/CRUDService";
import taskService from "../services/taskService";

let handleCreateNewTask = async (req, res) => {
  let info = req.body;
  // taskName: data.taskName,
  //       description: data.description,
  //       priority: data.priority === "" ? "Normal" : data.priority,
  //       taskStatus: data.taskStatus,
  //       dueDate: !data.dueDate ? new Date() : data.dueDate,
  if (
    !info.taskName ||
    !info.description ||
    !info.priority ||
    !info.taskStatus ||
    !info.dueDate
  ) {
    return res.status(201).json({
      errCode: -2,
      message: "Fill all input ",
    });
  }
  let message = await taskService.createNewTask(req.body);
  return res.status(200).json(message);
};
let handleGetAllTask = async (req, res) => {
  try {
    let task = await taskService.getAllTaskService();
    return res.status(200).json(task);
  } catch (e) {
    console.log(e);

    return res.status(200).json({
      errorCode: -1,
      message: "Error from server...",
    });
  }
};
let handleGetAllDoneTask = async (req, res) => {
  try {
    let task = await taskService.getAllDoneTaskService();
    return res.status(200).json(task);
  } catch (e) {
    console.log(e);

    return res.status(200).json({
      errorCode: -1,
      message: "Error from server...",
    });
  }
};
let handleDeleteTask = async (req, res) => {
  let { taskId } = req.params;
  if (!taskId) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "missing ID task!",
    });
  }
  let message = await taskService.deleteTaskService(taskId);
  return res.status(200).json(message);
};

let handleGetTaskById = async (req, res) => {
  let idTask = req.body.taskId;
  if (!idTask) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "missing ID task!",
    });
  }
  let task = await taskService.getTaskByIdService(idTask);
  return res.status(200).json(task);
};
let handleEditTask = async (req, res) => {
  try {
    // if (
    //   !info.taskName ||
    //   !info.description ||
    //   !info.priority ||
    //   !info.taskStatus ||
    //   !info.dueDate
    // ) {
    //   return res.status(201).json({
    //     errCode: -2,
    //     message: "Fill all input ",
    //   });
    // }
    let data = req.body;
    let message = await taskService.editTaskService(data);
    return res.status(200).json(message);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};
let handleDoneTask = async (req, res) => {
  try {
    let data = req.body;
    let message = await taskService.doneTaskService(data);
    return res.status(200).json(message);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};
let handleRemoveAllDoneTask = async (req, res) => {
  let message = await taskService.removeAllDoneTaskService();
  if (message && message.errCode === 2) {
    return res.status(200).json(message);
  }
  return res.status(200).json(message);
};
let handleDoneAllTask = async (req, res) => {
  let arrTask = req.body[0];
  try {
    let result = await taskService.handleDoneAllTaskService(arrTask);
    if (result && result.errCode === 0) {
      return res.status(200).json(result.message);
    } else {
      return res.status(200).json(result.message);
    }
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};
let handleRemoveAllTask = async (req, res) => {
  let arrTask = req.body[0];

  try {
    let result = await taskService.handleRemoveAllTaskService(arrTask);
    if (result && result.errCode === 0) {
      return res.status(200).json(result.message);
    } else {
      return res.status(200).json(result.message);
    }
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};
module.exports = {
  handleCreateNewTask: handleCreateNewTask,
  handleGetAllTask: handleGetAllTask,
  handleDeleteTask: handleDeleteTask,
  handleGetTaskById: handleGetTaskById,
  handleEditTask: handleEditTask,
  handleDoneTask: handleDoneTask,
  handleGetAllDoneTask: handleGetAllDoneTask,
  handleRemoveAllDoneTask: handleRemoveAllDoneTask,
  handleDoneAllTask: handleDoneAllTask,
  handleRemoveAllTask: handleRemoveAllTask,
};
