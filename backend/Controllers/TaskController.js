const TaskModel = require("../Models/TaskModel");
const createTask = async (req, res) => {
  const data = req.body;
  try {
    const model = new TaskModel(data);
    await model.save();
    res
      .status(201)
      .json({ message: "Task created successfully.", success: true });
  } catch (err) {
    res.status(500).json({
      message: "Failed to create task. Error:" + err,
      success: false,
    });
  }
};

const getTasks = async (req, res) => {
  try {
    const data = await TaskModel.find({});

    res.status(201).json({ message: "All tasks.", success: true, data: data });
  } catch (err) {
    res.status(500).json({
      message: "Failed to get tasks. Error:" + err,
      success: false,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const obj = { $set: { ...body } };
    const data = await TaskModel.findByIdAndUpdate(id, obj);

    res.status(200).json({ message: "Task updated. OK", success: true });
  } catch (err) {
    res.status(500).json({
      message: "Failed to update task. Error:" + err,
      success: false,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    await TaskModel.findByIdAndDelete(id);

    res.status(200).json({ message: "Task deleted. OK", success: true });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete task. Error:" + err,
      success: false,
    });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
