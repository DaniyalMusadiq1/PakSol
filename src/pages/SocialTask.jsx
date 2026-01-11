import React from "react";
import { ArrowRight, ArrowLeft, Gem, Coins } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock task data
const taskData = [
  {
    id: 1,
    platformImg:
      "https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png",
    taskName: "Watch YouTube Video",
    coins: 5000,
    gems: 10,
  },
  {
    id: 2,
    platformImg:
      "https://upload.wikimedia.org/wikipedia/en/6/60/Twitter_Logo_as_of_2021.svg",
    taskName: "Like Twitter Post",
    coins: 3000,
    gems: 5,
  },
  {
    id: 3,
    platformImg:
      "https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg",
    taskName: "Share Telegram Post",
    coins: 7000,
    gems: 15,
  },
];

const SocialTask = () => {
  const navigate = useNavigate();

  const handleTaskClick = (task) => {
    alert(
      `Task: ${task.taskName}\nReward: ${task.coins.toLocaleString()} Coins + ${task.gems} Gems`
    );
  };

  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      {/* Back Button */}
      <div className="flex items-center gap-2 mb-2">
        <button
          onClick={() => navigate("/tasks")}
          className="flex items-center gap-1 text-gray-400 hover:text-white transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </button>
      </div>

      {/* Header */}
      <h2 className="text-white text-xl font-bold tracking-widest text-center mb-1">
        Complete Social Tasks & Earn
      </h2>
      <p className="text-gray-400 text-center text-xs mb-2">
        Complete the tasks below to earn coins & gems!
      </p>

      {/* Task Cards */}
      {taskData.map((task) => (
        <button
          key={task.id}
          onClick={() => handleTaskClick(task)}
          className="w-full flex items-center gap-4 p-3 rounded-xl bg-gradient-to-br from-gray-900 to-black shadow-[0_0_25px_#00ffcc33] hover:shadow-[0_0_35px_#00ffcc66] transition"
        >
          {/* Left: Platform Image */}
          <img
            src={task.platformImg}
            alt={task.taskName}
            className="w-12 h-12 rounded-lg object-cover"
          />

          {/* Middle: Task Name & Rewards */}
          <div className="flex-1 flex flex-col">
            <p className="text-white font-semibold">{task.taskName}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="flex items-center gap-1 text-yellow-400 font-bold">
                <Coins className="w-4 h-4" /> {task.coins.toLocaleString()}
              </span>
              <span className="flex items-center gap-1 text-blue-400 font-bold">
                <Gem className="w-4 h-4" /> {task.gems}
              </span>
            </div>
          </div>

          {/* Right: Arrow */}
          <ArrowRight className="w-5 h-5 text-gray-400" />
        </button>
      ))}
    </div>
  );
};

export default SocialTask;
