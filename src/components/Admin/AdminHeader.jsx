import React from "react";
import { Bell, User } from "lucide-react";

const AdminHeader = ({onToggleSidebar}) => {
  return (
    <header className="w-full h-14 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 fixed top-0 z-40">
       <button
    className="md:hidden text-white mr-3"
    onClick={onToggleSidebar}
  >
    ☰
  </button>
      <h1 className="text-lg font-bold text-white">Admin Panel</h1>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="p-2 rounded-lg hover:bg-slate-800 transition">
          <Bell className="w-5 h-5 text-white" />
        </button>

        {/* Profile */}
        <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-800 transition">
          <User className="w-5 h-5 text-white" />
          <span className="text-white text-sm font-medium">Daniyal</span>
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
