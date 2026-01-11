import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DailyReward = () => {
  const navigate = useNavigate();

  // Example rewards for 15 days
  const dailyRewards = Array.from({ length: 15 }, (_, i) => ({
    day: i + 1,
    coins: (i + 1) * 10000, // Example coins
    gems: Math.floor(Math.random() * 50) + 10, // Random gems
    claimed: i < 3, // First 3 days claimed for example
  }));

  return (
    <div className="flex flex-col min-h-screen px-4 py-6 bg-slate-950">
      {/* Back Button */}
      <div className="mb-4">
        <button
          onClick={() => navigate("/tasks")}
          className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white font-semibold shadow-[0_0_15px_#00ffcc33] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-white tracking-widest mb-6 text-center">
        Daily Rewards
      </h1>

      {/* Rewards Grid */}
      <div className="grid grid-cols-3 gap-4">
        {dailyRewards.map((reward) => (
          <div
            key={reward.day}
            className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl shadow-[0_0_25px_#00ffcc33] transition transform hover:scale-105 ${
              reward.claimed
                ? "bg-gray-800 text-gray-400"
                : "bg-gradient-to-br from-gray-900 to-black text-white"
            }`}
          >
            <span className="font-bold tracking-widest text-sm">Day {reward.day}</span>
            <div className="text-yellow-400 font-mono text-lg">{reward.coins} Coins</div>
            <div className="text-blue-400 font-mono text-lg">{reward.gems} Gems</div>
            {reward.claimed && (
              <span className="text-green-400 text-xs font-semibold">CLAIMED</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyReward;
