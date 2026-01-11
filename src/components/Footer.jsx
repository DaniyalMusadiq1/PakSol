import React from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Users,
  Pickaxe,
  ClipboardList,
  Wallet,
  Cpu  
} from "lucide-react";

const AppFooter = ({ active = "Mine" }) => {
  const tabs = [
    { name: "Mine", icon: Pickaxe, path: "/" },
    { name: "Tasks", icon: ClipboardList, path: "/tasks" },
    { name: "Upgrades", icon: Cpu  , path: "/upgrades" },
    { name: "Friends", icon: Users, path: "/friends" },
    { name: "Shop", icon: ShoppingBag, path: "/shop" },
    { name: "Wallet", icon: Wallet, path: "/wallet" },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-slate-950 border-t border-slate-800">
      <nav className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = active === tab.name;

          return (
            <Link
              key={tab.name}
              to={tab.path}
              className={`group flex flex-col items-center justify-center gap-1  py-2 rounded-xl transition-all duration-200
                ${
                  isActive
                    ? "text-cyan-400"
                    : "text-slate-400 hover:text-white"
                }
              `}
            >
              {/* Icon container */}
              <div
                className={`relative flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200
                  ${
                    isActive
                      ? "bg-slate-800 shadow-inner"
                      : "group-hover:bg-slate-800/60"
                  }
                `}
              >
                {/* Active top indicator */}
                {isActive && (
                  <span className="absolute -top-2 w-6 h-1 rounded-full bg-cyan-400" />
                )}

                <Icon className="w-5 h-5" />
              </div>

              {/* Label */}
              <span className="text-[11px] font-medium tracking-wide">
                {tab.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </footer>
  );
};

export default AppFooter;
