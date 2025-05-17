import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { AuthContext } from "../context/AuthContext";
import { TaskContext } from "../context/TaskContext";
// import { GrDocumentUpdate } from "react-icons/gr";
// import { MdDeleteForever } from "react-icons/md";

const Incomplete = () => {
  const { user } = useContext(AuthContext);
  const { tasks, isTaskLoading, taskError } = useContext(TaskContext);

  // Filter tasks based on user's _id
  const filteredTasks = tasks.filter(
    (task) => task.userId === user?._id && task.status === "incomplete"
  );
  return (
    <>
      <Navbar />
      <section className="px-10 py-8 bg-[#292928] min-h-screen mt-16">
        <span className="font-bold text-2xl text-white px-10 flex mt-3">
          Incomplete Tasks
        </span>
        {isTaskLoading ? (
          <p>Loading tasks...</p>
        ) : taskError ? (
          <p>Error fetching tasks: {taskError.message}</p>
        ) : filteredTasks.length === 0 ? (
          <p className="text-white text-center mt-8 font-bold text-3xl">
            No incomplete tasks found.
          </p>
        ) : (
          <div className="flex flex-wrap justify-center gap-5 mt-16">
            {filteredTasks.map((task) => (
              <div
                key={task._id}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4"
              >
                <div className="bg-[#4a4a48] shadow-md rounded-md p-4 text-white">
                  <h2 className="text-xl font-semibold mb-2">{task.title}</h2>
                  <p className="text-white mb-2">{task.des}</p>
                  <span
                    className={`text-sm font-semibold ${
                      task.status === "complete"
                        ? "bg-green-600 text-white rounded-full py-1 px-2 cursor-pointer"
                        : " bg-red-500 text-white rounded-full py-1 px-2 cursor-pointer"
                    }`}
                  >
                    {task.status}
                  </span>
                  {/* Uncomment the following lines if you want to add update and delete buttons */}
                  {/* <div className="flex justify-end mt-2">
              <button className="text-blue-600 font-semibold mt-2 mr-2">
                Update
              </button>
              <button className="text-red-600 font-semibold mt-2">
                Delete
              </button>
            </div> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Incomplete;
