const express = require("express");
const app = express();
require("dotenv").config();
require("./Models/Database");
const TaskRouter = require("./Routes/TaskRouter");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8080;
const cors = require("cors");
app.get("/", (req, res) => {
  res.send("sup......says the server");
});
app.use(cors());
app.use(bodyParser.json()); //allows client to send json data

app.use("/tasks", TaskRouter);

app.listen(PORT, () => {
  console.log(`Server is running, gg.\nPORTTT:${PORT}`);
});
