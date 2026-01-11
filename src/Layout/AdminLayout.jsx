import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "../components/Admin/AdminHeader";
import AdminSidebar from "../components/Admin/AdminSidebar";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Auto close sidebar on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 overflow-hidden">
      {/* Header */}
      <AdminHeader onToggleSidebar={() => setIsSidebarOpen((p) => !p)} />

      {/* Sidebar */}
      <AdminSidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Main Content */}
      <main
        className={`
          pt-14 transition-all duration-300
          overflow-y-auto overflow-x-hidden
          min-h-screen
          ${isSidebarOpen ? "md:ml-64" : "md:ml-16"}
        `}
      >
        <div className="p-4 max-w-full">
          <Outlet />
        </div>
      </main>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
