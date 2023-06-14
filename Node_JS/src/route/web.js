import express from "express";
import taskControllers from "../controllers/taskControllers";
let router = express.Router();
let initWebRoutes = (app) => {
  // router.get("/", homeController.getHomePage);
  // router.get("/crud", homeController.getCRUD);

  // router.post("/post-crud", homeController.getPost);

  // router.get("/get-crud", homeController.displayGetCRUD);

  // router.get("/edit-crud", homeController.getEditCRUD);

  // router.post("/put-crud", homeController.putCRUD);

  // router.get("/delete-crud", homeController.deleteCRUD);

  // router.post("/api/login", userController.handleLogin);

  router.get("/api/get-all-done-task", taskControllers.handleGetAllDoneTask);

  router.delete(
    "/api/remove-all-done-task",
    taskControllers.handleRemoveAllDoneTask
  );
  router.post("/api/create-new-task", taskControllers.handleCreateNewTask);

  router.delete("/api/delete-task/:taskId", taskControllers.handleDeleteTask);

  router.get("/api/get-all-task", taskControllers.handleGetAllTask);

  router.get("/api/get-task-by-id", taskControllers.handleGetTaskById);

  router.put("/api/edit-task", taskControllers.handleEditTask);

  router.put("/api/done-task", taskControllers.handleDoneTask);
  router.put("/api/done-all-task", taskControllers.handleDoneAllTask);
  router.post("/api/remove-all-task", taskControllers.handleRemoveAllTask);

  // router.get("/api/top-doctor-home", doctorControllers.getTopDoctorHome);

  // router.get("/api/get-all-doctors", doctorControllers.getAllDoctors);

  // router.get(
  //   "/api/get-detai-doctor-by-id",
  //   doctorControllers.getDetailDoctorById
  // );

  // router.get(
  //   "/api/get-content-markdown-doctor",
  //   doctorControllers.getContentMarkdown
  // );

  return app.use("/", router);
};
module.exports = initWebRoutes;
