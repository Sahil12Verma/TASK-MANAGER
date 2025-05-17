// Routes/taskRoute.js
const express = require("express");
const {
  createTask,
  getTasksByUserId,
  getAllTasks,
  getTaskByTaskId,
  deleteTaskById,
  updateTaskById,
} = require("../Controllers/taskController");

const router = express.Router();

router.post("/", createTask);
router.get("/:userId", getTasksByUserId);
router.get("/", getAllTasks);
router.get("/task/:taskId", getTaskByTaskId);
router.delete("/:taskId", deleteTaskById);
router.put("/:taskId", updateTaskById);

module.exports = router;
