import db from "../models/index";

let createNewTask = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Task.create({
        taskName: data.taskName,
        description: data.description,
        priority: data.priority,
        taskStatus: data.taskStatus,
        dueDate: data.dueDate,
      });
      resolve({
        errCode: 0,
        message: "OK",
      });
    } catch (e) {
      reject(e);
    }
  });
};
let getAllTaskService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let tasks = await db.Task.findAll({
        order: [["dueDate", "ASC"]],
        where: { taskStatus: "no" },
      });
      if (tasks) {
        resolve({
          errorCode: 0,
          data: tasks,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getAllDoneTaskService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let tasks = await db.Task.findAll({
        order: [["dueDate", "ASC"]],
        where: { taskStatus: "yes" },
      });
      if (tasks) {
        resolve({
          errorCode: 0,
          data: tasks,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let deleteTaskService = (taskId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let task = await db.Task.findOne({
        where: { id: taskId },
      });
      if (!task) {
        resolve({
          errCode: 2,
          errMessage: `Task is not exist !`,
        });
      }
      await db.Task.destroy({
        where: { id: taskId },
      });
      resolve({
        errCode: 0,
        message: `delete dones`,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getTaskByIdService = (taskId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let task = await db.Task.findOne({
        where: { id: taskId },
      });
      if (!task) {
        resolve({
          errCode: 2,
          errMessage: `Task is not exist !`,
        });
      }
      resolve({
        errCode: 0,
        data: task,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let editTaskService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("check data", data);
      if (
        !data.taskId ||
        !data.description ||
        !data.taskName ||
        !data.priority
      ) {
        resolve({
          errCode: 2,
          errMessage: `missing require parameters`,
        });
      }
      let task = await db.Task.findOne({
        where: {
          id: data.taskId,
        },
        raw: false,
      });
      if (task) {
        (task.taskName = data.taskName),
          (task.description = data.description),
          (task.priority = data.priority);
        task.dueDate = data.dueDate;
        await task.save();
        resolve({
          errCode: 0,
          message: "Edit success !",
        });
      } else {
        resolve({
          errCode: 2,
          message: "Don't have this task",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let doneTaskService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.taskId) {
        resolve({
          errCode: 2,
          errMessage: `missing require parameters`,
        });
      }
      let task = await db.Task.findOne({
        where: {
          id: data.taskId,
        },
        raw: false,
      });
      if (task) {
        task.taskStatus = "yes";
        // task.dueDate = data.dueDate
        await task.save();
        resolve({
          errCode: 0,
          message: "Done task !",
        });
      } else {
        resolve({
          errCode: 2,
          message: "Don't have this task",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let removeAllDoneTaskService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let task = await db.Task.findAll({
        where: { taskStatus: "yes" },
      });
      if (!task) {
        resolve({
          errCode: 2,
          errMessage: `Do not have done task !`,
        });
      }
      await db.Task.destroy({
        where: { taskStatus: "yes" },
      });
      resolve({
        errCode: 0,
        message: `delete dones`,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let handleDoneAllTaskService = (arrTask) => {
  return new Promise(async (resolve, reject) => {
    try {
      let tasks = [];
      for (let i = 0; i < arrTask.length; i++) {
        let task = await db.Task.findOne({ where: { id: arrTask[i].id } });
        tasks.push(task);
      }
      console.log(tasks);
      let taskIds = tasks.map((task) => task.id);
      await db.Task.update({ taskStatus: "yes" }, { where: { id: taskIds } });
      resolve({
        errCode: 0,
        message: "done all",
      });
    } catch (e) {
      reject(e);
    }
  });
};
let handleRemoveAllTaskService = (arrTask) => {
  return new Promise(async (resolve, reject) => {
    try {
      let tasks = [];
      for (let i = 0; i < arrTask.length; i++) {
        let task = await db.Task.findOne({
          where: { id: arrTask[i].id },
          raw: true,
        });
        tasks.push(task);
      }
      console.log(tasks);
      let taskIds = tasks.map((task) => task.id);
      console.log(taskIds);
      await db.Task.destroy({ where: { id: taskIds } });
      resolve({
        errCode: 0,
        message: "remove all",
      });
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createNewTask: createNewTask,
  getAllTaskService: getAllTaskService,
  deleteTaskService: deleteTaskService,
  getTaskByIdService: getTaskByIdService,
  editTaskService: editTaskService,
  doneTaskService: doneTaskService,
  getAllDoneTaskService: getAllDoneTaskService,
  removeAllDoneTaskService: removeAllDoneTaskService,
  handleDoneAllTaskService: handleDoneAllTaskService,
  handleRemoveAllTaskService: handleRemoveAllTaskService,
};
