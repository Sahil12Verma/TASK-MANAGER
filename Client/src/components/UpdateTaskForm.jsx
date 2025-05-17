import React, { useState } from "react";
import PropTypes from "prop-types";

const UpdateTaskForm = ({ taskToUpdate, onSubmit, onCancel }) => {
  const [updateTaskDetails, setUpdateTaskDetails] = useState({
    title: taskToUpdate.title,
    des: taskToUpdate.des,
    status: taskToUpdate.status,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateTaskDetails({
      ...updateTaskDetails,
      [name]: value,
    });
  };

  return (
    <div className="bg-gray-200 p-8 rounded-md">
      <h2 className="text-lg font-bold mb-4 flex justify-center items-center">
        Update Task
      </h2>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={updateTaskDetails.title}
        onChange={handleChange}
        className="w-full mb-4 p-2 rounded border"
      />
      <textarea
        name="des"
        placeholder="Description"
        value={updateTaskDetails.des}
        onChange={handleChange}
        className="w-full mb-4 p-2 rounded border"
      ></textarea>
      <select
        name="status"
        value={updateTaskDetails.status}
        onChange={handleChange}
        className="w-full mb-4 p-2 rounded border"
      >
        <option value="incomplete">Incomplete</option>
        <option value="complete">Complete</option>
      </select>
      <div className="flex justify-end">
        <button
          onClick={onCancel}
          className="mr-2 px-4 py-2 bg-gray-300 rounded-md"
        >
          Cancel
        </button>
        <button
          onClick={() => onSubmit(updateTaskDetails)}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md"
        >
          Update
        </button>
      </div>
    </div>
  );
};

// Prop types validation
UpdateTaskForm.propTypes = {
  taskToUpdate: PropTypes.object.isRequired,
  userId: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default UpdateTaskForm;
