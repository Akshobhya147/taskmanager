const mongoose = require("mongoose");
const schema = mongoose.Schema;

const taskSchema = new schema({
  taskName: {
    type: String,
    required: true,
  },

  taskDescription: {
    type: String,
    require: false,
  },
  isDone: {
    type: Boolean,
    required: true,
  },
});

const TaskModel = mongoose.model("tasks", taskSchema); //tasks is the name of the collection
module.exports = TaskModel;
