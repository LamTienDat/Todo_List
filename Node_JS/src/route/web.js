import express from "express";
import taskControllers from "../controllers/taskControllers";
import path from "path";
import cors from "cors";

let router = express.Router();
let initWebRoutes = (app) => {
  router.get("/get-all-done-task", taskControllers.handleGetAllDoneTask);

  router.delete(
    "/remove-all-done-task",
    taskControllers.handleRemoveAllDoneTask
  );
  router.post("/create-new-task", taskControllers.handleCreateNewTask);

  router.delete("/delete-task/:taskId", taskControllers.handleDeleteTask);

  router.get("/get-all-task", taskControllers.handleGetAllTask);

  router.get("/get-task-by-id", taskControllers.handleGetTaskById);

  router.put("/edit-task", taskControllers.handleEditTask);

  router.put("/done-task", taskControllers.handleDoneTask);
  router.put("/done-all-task", taskControllers.handleDoneAllTask);
  router.post("/remove-all-task", taskControllers.handleRemoveAllTask);

  app.use(cors());

  app.use("/api", router);

  app.use(express.static(path.resolve(__dirname, "../../../React_JS/build")));

  app.get("*", function (req, res) {
    res.sendFile(
      path.resolve(__dirname, "../../../React_JS/build", "index.html")
    );
  });

  return app;
};
module.exports = initWebRoutes;
