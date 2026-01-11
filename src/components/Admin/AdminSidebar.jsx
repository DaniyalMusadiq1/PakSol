import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  ListTodo,
  Gift,
  Megaphone,
  Wallet,
  UserPlus,
  FileCheck,
  Activity,
  Settings,
  ChevronLeft,
} from "lucide-react";

const AdminSidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const menuSections = [
    {
      title: "Main",
      items: [
        { name: "Dashboard", icon: Home, path: "/" },
      ],
    },
    {
      title: "Users",
      items: [
        { name: "Users", icon: Users, path: "/manage-users" },
        { name: "Activity Logs", icon: Activity, path: "/activity-logs" },
      ],
    },
    {
      title: "Tasks",
      items: [
        { name: "Task Categories", icon: ListTodo, path: "/task-categories" },
        { name: "Tasks", icon: ListTodo, path: "/tasks" },
        { name: "Task Proofs", icon: FileCheck, path: "/task-proofs" },
      ],
    },
    {
      title: "Rewards",
      items: [
        { name: "Rewards", icon: Gift, path: "/rewards" },
        { name: "Daily Bonuses", icon: Gift, path: "/daily-bonuses" },
      ],
    },
    {
      title: "Promotions",
      items: [
        { name: "Promotions", icon: Megaphone, path: "/promotions" },
      ],
    },
    {
      title: "Wallet & Economy",
      items: [
        { name: "Wallets", icon: Wallet, path: "/wallets" },
        { name: "Economies", icon: Wallet, path: "/economies" },
      ],
    },
    {
      title: "Referrals",
      items: [
        { name: "Friends", icon: UserPlus, path: "/friends" },
      ],
    },
    {
      title: "System",
      items: [
        { name: "Proofs", icon: FileCheck, path: "/proofs" },
        { name: "Settings", icon: Settings, path: "/settings" },
      ],
    },
  ];

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`
          fixed top-14 left-0 z-30
          h-[calc(100vh-56px)]
          bg-slate-950 border-r border-slate-800
          transition-all duration-300
          overflow-y-auto
          ${
            isOpen
              ? "translate-x-0 w-64"
              : "-translate-x-full md:translate-x-0 md:w-16"
          }
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 mb-3">
          {isOpen && (
            <p className="text-white text-sm font-semibold tracking-wide">
              Admin Menu
            </p>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700"
          >
            <ChevronLeft
              className={`w-4 h-4 transition-transform ${
                !isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-4 px-2 pb-6">
          {menuSections.map((section) => (
            <div key={section.title}>
              {isOpen && (
                <p className="px-3 mb-1 text-xs text-slate-500 uppercase">
                  {section.title}
                </p>
              )}

              <div className="flex flex-col gap-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;

                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`
                        group flex items-center gap-3
                        px-3 py-2.5 rounded-xl
                        text-sm font-medium transition-all
                        ${
                          isActive
                            ? "bg-cyan-600 text-white shadow-md"
                            : "text-slate-400 hover:bg-slate-800 hover:text-white"
                        }
                      `}
                    >
                      <Icon className="w-5 h-5 shrink-0" />
                      <span
                        className={`transition-opacity ${
                          isOpen
                            ? "opacity-100"
                            : "opacity-0 w-0 overflow-hidden"
                        }`}
                      >
                        {item.name}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default AdminSidebar;
