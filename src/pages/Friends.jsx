import React, { useState } from "react";

export const Friends = () => {
  const [totalFriends, setTotalFriends] = useState(7);
  const [copied, setCopied] = useState(false);

  const referralLevels = [
    { level: "Bronze", friends: 3, coins: "100K", gems: 100 },
    { level: "Silver", friends: 10, coins: "5M", gems: 500 },
    { level: "Gold", friends: 50, coins: "50M", gems: 10000 },
    { level: "Platinum", friends: 100, coins: "150M", gems: 50000 },
    { level: "Diamond", friends: 500, coins: "500M", gems: 100000 },
  ];

  const inviteLink = "https://app.example.com/invite?ref=STATIC123";
  const handleCopy = async () => {
    await navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-md mx-auto mt-2 space-y-4 px-2">
      {/* Invite & Total Friends Card */}
      <div className="bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-[0_0_25px_#00ffcc33] flex flex-col items-center gap-3 py-4 px-4">
        <h2 className="text-white text-xl font-bold tracking-widest">
          Invite Friends
        </h2>

        <div className="w-full flex items-center justify-between bg-gray-800/50 rounded-lg px-3 py-2 text-sm font-mono">
          <span className="text-green-400 truncate">{inviteLink}</span>
          <button
            onClick={handleCopy}
            className="px-3 py-1 bg-green-400 text-black text-xs rounded-lg font-bold hover:scale-105 transition"
          >
            {copied ? "COPIED ✓" : "COPY"}
          </button>
        </div>

        <div className="mt-2 text-center">
          <span className="text-white text-4xl font-bold font-mono tracking-widest shadow-[0_0_15px_#00ffcc55] animate-pulse">
            {totalFriends}
          </span>
          <p className="text-gray-400 text-sm mt-1 tracking-wide">
            Total Friends
          </p>
        </div>
      </div>

      {/* Referral Benefits */}
      <div className="grid grid-cols-1 gap-5">
        {referralLevels.map((item, idx) => (
          <div
            key={idx}
            className="relative flex justify-between items-center bg-gray-900/70 backdrop-blur-sm rounded-xl shadow-[0_0_15px_#00ffcc33] hover:shadow-[0_0_25px_#00ffcc55] hover:scale-[1.03] transition transform cursor-pointer px-4 py-3"
          >
            <div className="flex flex-col">
              <p className="text-white font-bold text-sm sm:text-base">
                {item.level}
              </p>
              <p className="text-gray-400 text-xs sm:text-sm">
                {item.friends} friends
              </p>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-yellow-400 font-semibold text-sm sm:text-base">
                {item.coins} Coins
              </p>
              <p className="text-blue-400 font-semibold text-sm sm:text-base">
                {item.gems} Gems
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
