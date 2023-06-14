import axios from "../axios";

const createNewTaskService = (data) => {
  console.log(data);
  return axios.post("/api/create-new-task", data);
};
const getAlltaskService = () => {
  return axios.get("/api/get-all-task");
};
const getAllDoneTaskService = () => {
  return axios.get("/api/get-all-done-task");
};

const deleteTaskService = (taskId) => {
  console.log("check task id", taskId);
  return axios.delete(`/api/delete-task/${taskId}`);
};
const editTaskService = (data) => {
  return axios.put("/api/edit-task", data);
};
const removeAllDoneTask = () => {
  return axios.delete("/api/remove-all-done-task");
};
const removeAllDoneTaskServie = (data) => {
  return axios.put("/api/done-all-task", data);
};
const removeAllTaskServie = (data) => {
  return axios.post("/api/remove-all-task", data);
};
export {
  createNewTaskService,
  getAlltaskService,
  deleteTaskService,
  editTaskService,
  getAllDoneTaskService,
  removeAllDoneTask,
  removeAllDoneTaskServie,
  removeAllTaskServie,
};
