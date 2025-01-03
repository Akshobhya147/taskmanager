const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../Controllers/TaskController");

const router = require("express").Router();
//To get all the tasks.
router.get("/", getTasks);

//To create a task.
router.post("/", createTask);

//To update a task.
router.put("/:id", updateTask);

//To delete a task.
router.delete("/:id", deleteTask);
module.exports = router;
