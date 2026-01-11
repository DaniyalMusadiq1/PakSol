import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Share2,
  Gamepad2,
  Megaphone,
  Gift,
  ArrowRight,
} from "lucide-react";

export const Tasks = () => {
  const navigate = useNavigate();

  const tasks = [
    {
      title: "Social Tasks",
      subtitle: "Follow, Share & Earn",
      icon: Share2,
      path: "/social-task",
      glow: "shadow-[0_0_30px_#3b82f644]",
      iconColor: "text-blue-400",
    },
    {
      title: "Game Tasks",
      subtitle: "Play Games & Win",
      icon: Gamepad2,
      path: "/game-task",
      glow: "shadow-[0_0_30px_#22c55e44]",
      iconColor: "text-green-400",
    },
    {
      title: "Ads & Promotions",
      subtitle: "Watch & Earn Rewards",
      icon: Megaphone,
      path: "/Ads-task",
      glow: "shadow-[0_0_30px_#facc1544]",
      iconColor: "text-yellow-400",
    },
    {
      title: "Daily Reward",
      subtitle: "Claim Every 24 Hours",
      icon: Gift,
      path: "/DailyReward-task",
      glow: "shadow-[0_0_30px_#a855f744]",
      iconColor: "text-purple-400",
    },
  ];

  return (
    <div className="w-full px-3 py-4 max-w-md mx-auto">
      {/* Heading */}
      <div className="mb-4 text-center">
        <h1 className="text-xl font-bold tracking-widest text-white">
          Complete Tasks
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Complete daily tasks & win exciting rewards
        </p>
      </div>

      {/* Task Cards */}
      <div className="space-y-3 ">
        {tasks.map((task, index) => (
          <div
            key={index}
            onClick={() => navigate(task.path)}
            className={`relative overflow-hidden cursor-pointer rounded-xl bg-gradient-to-br from-gray-900 to-black 
            ${task.glow} hover:scale-[1.02] transition-all  p-6 duration-200`}
          >
            {/* Background Icon */}
            <task.icon
              className={`absolute -right-4 -top-4 w-24 h-24 opacity-10 ${task.iconColor}`}
            />

            {/* Content */}
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg bg-gray-800 ${task.iconColor}`}
                >
                  <task.icon className="w-5 h-5" />
                </div>

                <div>
                  <p className="text-white font-semibold text-sm">
                    {task.title}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {task.subtitle}
                  </p>
                </div>
              </div>

              {/* Arrow */}
              <ArrowRight className="text-gray-400 w-5 h-5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
