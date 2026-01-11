import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import AppHeader from "../components/Header";
import AppFooter from "../components/Footer";

const Layout = () => {
  const location = useLocation();

  // Detect active tab for footer
  const activeTab = () => {
    if (location.pathname === "/") return "Mine";
    if (location.pathname.includes("shop")) return "Shop";
    if (location.pathname.includes("friends")) return "Friends";
    if (location.pathname.includes("tasks")) return "Tasks";
    if (location.pathname.includes("wallet")) return "Wallet";
    return "";
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white w-full" >
      {/* Header */}
      <AppHeader />

      {/* Page Content */}
      <main className=" w-full ">
        <Outlet />
      </main>

      {/* Footer */}
      <AppFooter active={activeTab()} />
    </div>
  );
};

export default Layout;
