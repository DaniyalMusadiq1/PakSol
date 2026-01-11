import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../Layout/AdminLayout";
import { AdminDashboard } from "../Dashboard/AdminDashboard";
import ManageUsers from "../Dashboard/ManageUsers";
import AddUser from "../components/Admin/AddUser";
import EditUser from "../components/Admin/EditUser";
import UserDetails from "../components/Admin/UserDetails";
import ActivityLog from "../Dashboard/ActivityLog";
import TaskCategories from "../Dashboard/AddCategories";
import ManageTasks from "../Dashboard/ManageTasks";
import AddTask from "../components/Admin/AddTask";




export const AdminStack = () => {
  return (
    <Routes>
         <Route path="/" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
         <Route path="/manage-users" element={<ManageUsers />}></Route>
         <Route path="/add_user" element={<AddUser />}></Route>
         <Route path="/:id/edit" element={<EditUser />}></Route>
         <Route path="/users/:id" element={<UserDetails />} />
         <Route path="/activity-logs" element={<ActivityLog />} />
         <Route path="/task-categories" element={<TaskCategories/>} />
         <Route path="/tasks" element={<ManageTasks/>} />
         <Route path="/add-task" element={<AddTask/>} />
      </Route>
    </Routes>
  );
};
