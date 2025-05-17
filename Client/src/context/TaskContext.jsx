import React, { createContext, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getRequest, postRequest, baseUrl } from "../utils/service";

export const TaskContext = createContext();

export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [taskError, setTaskError] = useState(null);
  const [isTaskLoading, setIsTaskLoading] = useState(false);
  const [taskInfo, setTaskInfo] = useState({
    title: "",
    description: "",
    status: "incomplete",
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setIsTaskLoading(true);
    setTaskError(null);

    try {
      const response = await getRequest(`${baseUrl}/tasks`);
      setTasks(response);
    } catch (error) {
      setTaskError(error);
    }

    setIsTaskLoading(false);
  };

  const updateTaskInfo = useCallback((info) => {
    setTaskInfo(info);
  }, []);

  const createTask = useCallback(async () => {
    setIsTaskLoading(true);
    setTaskError(null);

    try {
      const response = await postRequest(`${baseUrl}/tasks`, taskInfo);
      setTasks([...tasks, response]);
    } catch (error) {
      setTaskError(error);
    }

    setIsTaskLoading(false);
  }, [taskInfo, tasks]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        taskInfo,
        updateTaskInfo,
        taskError,
        isTaskLoading,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// Add prop types validation for children
TaskContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
