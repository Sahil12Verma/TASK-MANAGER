// Sidebar.js
import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="text-red-500 grid font-bold p-10 gap-10">
      <NavLink to="/" activeClassName="text-blue-500" exact>
        Home
      </NavLink>
      <NavLink to="/all-tasks" activeClassName="text-blue-500">
        All Tasks
      </NavLink>
      <NavLink to="/completed" activeClassName="text-blue-500">
        Completed
      </NavLink>
      <NavLink to="/incomplete" activeClassName="text-blue-500">
        Incomplete
      </NavLink>
    </div>
  );
};

export default Sidebar;
