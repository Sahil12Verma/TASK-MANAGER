import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import { TaskContext } from "../context/TaskContext";
import { AuthContext } from "../context/AuthContext";
import { baseUrl } from "../utils/service";
import UpdateTaskForm from "../components/UpdateTaskForm";
import { GrDocumentUpdate } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import { MdCreateNewFolder } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const { tasks, isTaskLoading, taskError, setTasks } = useContext(TaskContext);
  const { user } = useContext(AuthContext);
  const [userTasks, setUserTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskStatus, setNewTaskStatus] = useState("incomplete");
  const [updateTaskId, setUpdateTaskId] = useState(null);
  // const [selectedTaskId, setSelectedTaskId] = useState("");
  const [selectedTaskToUpdate, setSelectedTaskToUpdate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 9;

  console.log("userTasks check for pagination", userTasks);

  useEffect(() => {
    if (user?._id) {
      const filteredTasks = tasks?.filter((task) => task.userId === user._id);
      setUserTasks(filteredTasks);
    }
  }, [tasks, user]);

  // Calculate the index of the first and last task for the current page
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = userTasks.slice(indexOfFirstTask, indexOfLastTask);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleCreateTask = async () => {
    try {
      const response = await axios.post(`${baseUrl}/tasks`, {
        title: newTaskTitle,
        des: newTaskDescription,
        userId: user._id,
        status: newTaskStatus,
      });
      setUserTasks([...userTasks, response.data]);
      setModalVisible(false);
      toast.success("Task created successfully!");
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`${baseUrl}/tasks/${taskId}`);
      const updatedTasks = userTasks.filter((task) => task._id !== taskId);
      setUserTasks(updatedTasks);
      toast.success("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleUpdateTask = (task) => {
    setSelectedTaskToUpdate(task);
    setUpdateModalVisible(true);
  };

  const handleSubmitUpdate = async (updateTaskDetails) => {
    try {
      const response = await axios.put(
        `${baseUrl}/tasks/${selectedTaskToUpdate._id}`,
        updateTaskDetails
      );
      console.log("Updated task:", response.data);

      // setUserTasks(updatedUserTasks);
      setUpdateModalVisible(false);
      toast.success("Task updated successfully!");

      // Delay the page reload by 1 second
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <Navbar />
      <section className="px-10 py-8 bg-[#292928] min-h-screen mt-16">
        <div className="flex justify-between items-center px-10 mb-10">
          <span className="font-bold text-2xl text-white">All Tasks</span>
          <button
            onClick={() => setModalVisible(true)}
            className="hover:bg-[#58554e] text-white text-4xl border border-gray-600 rounded-full p-2"
          >
            <MdCreateNewFolder />
          </button>
        </div>
        {isTaskLoading ? (
          <p>Loading tasks...</p>
        ) : taskError ? (
          <p>Error fetching tasks: {taskError.message}</p>
        ) : userTasks.length === 0 ? (
          <p className="text-white text-center text-3xl font-bold">
            Make your first Task
          </p>
        ) : (
          <div className="flex flex-wrap justify-center gap-5">
            {currentTasks?.map((task) => (
              <div
                key={task._id}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4"
              >
                <div className="bg-[#4a4a48] shadow-md rounded-md p-4 text-white">
                  <h2 className="text-xl font-semibold mb-2">{task?.title}</h2>
                  <p className="text-white mb-2">{task?.des}</p>

                  <div className="flex justify-between items-center mt-5">
                    <div>
                      <span
                        className={`text-sm font-semibold ${
                          task?.status === "complete"
                            ? "bg-green-600 text-white rounded-full py-1 px-2 cursor-pointer"
                            : " bg-red-500 text-white rounded-full py-1 px-2 cursor-pointer"
                        }`}
                      >
                        {task?.status}
                      </span>
                    </div>
                    <div className="flex justify-center items-center">
                      <button
                        onClick={() => handleUpdateTask(task)}
                        className="text-white text-2xl mt-2 mr-2"
                      >
                        <GrDocumentUpdate />
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task?._id)}
                        className="text-red-500 text-3xl mt-2"
                      >
                        <MdDeleteForever />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-5">
          <ul className="flex list-none rounded-md">
            {userTasks.length > tasksPerPage &&
              Array.from({
                length: Math.ceil(userTasks.length / tasksPerPage),
              }).map((_, index) => (
                <li
                  key={index}
                  className="px-3 py-1 mr-2 bg-gray-600 text-white rounded-md cursor-pointer"
                >
                  <button onClick={() => paginate(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </section>

      {modalVisible && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-200 p-8 rounded-md">
            <h2 className="text-lg font-bold mb-4 flex justify-center items-center">
              Create New Task
            </h2>
            <input
              type="text"
              placeholder="Title"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="w-full mb-4 p-2 rounded border"
            />
            <textarea
              placeholder="Description"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              className="w-full mb-4 p-2 rounded border"
            ></textarea>
            <select
              value={newTaskStatus}
              onChange={(e) => setNewTaskStatus(e.target.value)}
              className="w-full mb-4 p-2 rounded border"
            >
              <option value="incomplete">Incomplete</option>
              <option value="complete">Complete</option>
            </select>
            <div className="flex justify-end">
              <button
                onClick={() => setModalVisible(false)}
                className="mr-2 px-4 py-2 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateTask}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {updateModalVisible && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <UpdateTaskForm
            key={updateModalVisible}
            taskToUpdate={selectedTaskToUpdate}
            userId={{ _id: user._id }}
            onSubmit={handleSubmitUpdate}
            onCancel={() => setUpdateModalVisible(false)}
          />
        </div>
      )}
    </>
  );
};

export default Dashboard;
