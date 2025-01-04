import { useEffect, useState } from "react";
import { FaPlus, FaSearch, FaCheck, FaUndoAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { RiPencilFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { ToastContainer } from "react-toastify";
import { createTask, deleteTaskbyId, getTasks, updateTaskbyId } from "./api";
import { makingToast } from "./utils";
import { RiCloseLargeFill } from "react-icons/ri";
import Typewriter from "typewriter-effect";

const TaskManager = () => {
  const [descState, setDescState] = useState(false);
  const [titleinput, setTitleInputState] = useState("");
  const [descriptioninput, setDescriptionInputState] = useState("");
  const noTasksString = ["No tasks currently.", "\nKeep it up!"];
  // local tasks
  const [tasks, setTasks] = useState([]);
  // for search results
  const [copyTasks, setCopyTasks] = useState([]);

  // for updating a task
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedTaskId, setUpdatedTaskId] = useState("");
  const [updatedTaskStatus, setUpdatedTaskStatus] = useState(false);
  const [updateClicked, setUpdateClicked] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, []);
  // console.log("w:", screenWidth);

  const addTaskHandler = async () => {
    const obj = {
      taskName: titleinput,
      taskDescription: descriptioninput,
      isDone: false,
    };

    // console.log(obj);
    // console.log(typeof obj);

    try {
      const { message, success } = await createTask(obj);
      // console.log("message:", message);
      // console.log("success:", success);
      if (success) {
        //task created
        //success toast
        makingToast(message, "success");
        fetchTasksHandler();
      } else {
        //error toast
        makingToast(message, "error");
      }

      setTitleInputState("");
      setDescriptionInputState("");
      setDescState(false);
    } catch (err) {
      // console.error(err);
      makingToast("Failed to create task.", "error");
    }
  };

  const fetchTasksHandler = async () => {
    try {
      const { data, success } = await getTasks();
      if (success) {
        // I am reversing the array, so that the last task apeears first,intutive
        data.reverse();
        setTasks(data);
        setCopyTasks(data);
      }
    } catch (err) {
      // console.error(err);
      makingToast("Failed to fetch tasks.", "error");
    }
  };

  useEffect(() => {
    fetchTasksHandler();
  }, []);

  const deleteTaskHandler = async (id: String) => {
    try {
      const { message, success } = await deleteTaskbyId(id);
      if (success) {
        //task deleted
        //success toast
        makingToast(message, "success");
        fetchTasksHandler();
      } else {
        //error toast
        makingToast(message, "error");
      }
    } catch (err) {
      // console.error(err);
      makingToast("Failed to delete task.", "error");
    }
  };

  const completeTaskHandler = async (t: any) => {
    const { _id, taskName, taskDescription, isDone } = t;
    const obj = {
      taskName: taskName,
      taskDescription: taskDescription,
      isDone: !isDone,
    };
    try {
      const { message, success } = await updateTaskbyId(_id, obj);
      if (success) {
        //task completed
        //success toast
        makingToast(message, "success");
        fetchTasksHandler();
      } else {
        //error toast
        makingToast(message, "error");
      }
    } catch (err) {
      // console.error(err);
      makingToast("Failed to update task status.", "error");
    }
  };

  const updateTaskHandler = async () => {
    const obj = {
      taskName: updatedTitle,
      taskDescription: updatedDescription,
      isDone: updatedTaskStatus,
    };
    console.log("obfmgj:", obj);
    try {
      const { message, success } = await updateTaskbyId(updatedTaskId, obj);
      if (success) {
        //task updated
        //success toast
        makingToast(message, "success");
        fetchTasksHandler();
        setUpdateClicked(false);
        setUpdatedTitle("");
        setUpdatedDescription("");
        setUpdatedTaskId("");
        setUpdatedTaskStatus(false);
      } else {
        //error toast
        makingToast(message, "error");
      }
    } catch (err) {
      // console.error(err);
      makingToast("Failed to update task.", "error");
    }
  };

  const searchTaskHandler = (e: any) => {
    const phrase = e.target.value.toLowerCase();
    console.log(phrase);
    const results = copyTasks.filter((i: any) =>
      (i["taskName"] + i["taskDescription"]).toLowerCase().includes(phrase)
    );
    setTasks(results);
  };
  return (
    <div className="parent">
      <h1 id="taskmanagerheading">
        <Typewriter
          options={{
            strings: "Task Manager",
            autoStart: true,
            cursor: "",
            delay: 70,
          }}
        />
      </h1>
      {/* Control Elements */}
      <div className="controlparent">
        <div className="inputgroup">
          <div
            className="inputbros"
            style={{
              height: screenWidth < 600 && descState == true ? "280px" : "",
            }}
          >
            <input
              type="text"
              className="addtaskinput"
              value={titleinput}
              placeholder="Add new Task"
              onFocus={() => {
                setDescState(true);
              }}
              onChange={(e) => {
                setTitleInputState(e.target.value);
              }}
            />
            <div
              className={"descriptionbros"}
              style={{
                opacity: descState ? 1 : 0,
                visibility: descState ? "visible" : "hidden",
                height: descState ? "100px" : "0",
                transition:
                  "opacity 0.5s ease, height 0.5s ease, visibility 0.5s ease",
              }}
            >
              <textarea
                className="taskdescription"
                placeholder="Description"
                value={descriptioninput}
                rows={5}
                cols={10}
                onChange={(e) => setDescriptionInputState(e.target.value)}
              />
              <button
                className="closebutton"
                onClick={() => {
                  setDescState(false);
                }}
              >
                <IoClose id="close" />
              </button>
            </div>
          </div>

          <button id="addbutton" onClick={addTaskHandler}>
            <FaPlus id="_plus" />
          </button>
        </div>

        <div className="searchgroup">
          <input
            type="text"
            className="searchinput"
            placeholder="Search Task"
            onChange={searchTaskHandler}
          />
          <button id="searchspan">
            <FaSearch id="_plus"></FaSearch>
          </button>
        </div>
      </div>
      {/* Task Elements */}
      <div className={tasks.length != 0 ? "taskblock" : "taskblock2"}>
        {tasks.length != 0
          ? tasks.map((t) => {
              // console.log(typeof t);
              return (
                <div className="task" key={t["_id"]}>
                  <div className="taskelement">
                    <div
                      className={
                        (t["taskDescription"] == "" ? "title2" : "title") +
                        (t["isDone"] ? " strikeclass" : "")
                      }
                    >
                      {t["taskName"]}
                    </div>
                    <div
                      className={
                        t["taskDescription"] == ""
                          ? "hiddenclass"
                          : "description"
                      }
                    >
                      {t["taskDescription"]}
                    </div>
                  </div>
                  <div className="optionsblock">
                    <button
                      className="options"
                      onClick={() => {
                        completeTaskHandler(t);
                      }}
                    >
                      {t["isDone"] ? (
                        <FaUndoAlt id="undo" />
                      ) : (
                        <FaCheck id="complete" />
                      )}
                    </button>
                    <button
                      className="options"
                      onClick={() => {
                        setUpdateClicked(true);
                        setUpdatedTitle(t["taskName"]);
                        setUpdatedDescription(t["taskDescription"]);
                        setUpdatedTaskId(t["_id"]);
                        setUpdatedTaskStatus(t["isDone"]);
                      }}
                    >
                      <RiPencilFill id="edit" />
                    </button>
                    <button
                      className="options"
                      onClick={() => {
                        deleteTaskHandler(t["_id"]);
                      }}
                    >
                      <MdDelete id="delete" />
                    </button>
                  </div>
                </div>
              );
            })
          : noTasksString}
      </div>
      {/* Toastify items */}
      {screenWidth > 600 ? (
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
        ></ToastContainer>
      ) : (
        ""
      )}
      <div
        className="blurrer"
        style={{ visibility: updateClicked ? "visible" : "hidden" }}
      ></div>
      {/* edit popup */}
      <div
        className="popup"
        style={{
          transform: updateClicked ? "" : "translateY(-1000px)",
          transition: "transform 0.6s ease",
        }}
      >
        <h3>Update Task</h3>
        <h4>Title</h4>
        <input
          type="text"
          className="popuptitle"
          value={updatedTitle}
          onChange={(e) => {
            setUpdatedTitle(e.target.value);
          }}
        />
        <h4>Description</h4>
        <textarea
          className="popupdescription"
          value={updatedDescription}
          rows={5}
          cols={10}
          onChange={(e) => {
            setUpdatedDescription(e.target.value);
          }}
        />
        <div className="popupoptions">
          <button
            className="options"
            onClick={() => {
              updateTaskHandler();
            }}
          >
            <FaCheck id="complete"></FaCheck>
          </button>
          <button
            className="options fontincrease"
            onClick={() => {
              setUpdateClicked(false);
            }}
          >
            <RiCloseLargeFill id="delete"></RiCloseLargeFill>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
