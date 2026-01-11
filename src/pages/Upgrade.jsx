import React from "react";
import { ArrowUpCircle, Coins, Gem } from "lucide-react";

const upgrades = [
  {
    id: 1,
    name: "Quantum Drill",
    profit: "+5,000 / hour",
    increase: 5000,
    level: 1,
    cost: 20000,
    currency: "coins",
    image: "🛠️",
  },
  {
    id: 2,
    name: "AI Mining Core",
    profit: "+12,000 / hour",
    increase: 12000,
    level: 2,
    cost: 3,
    currency: "gems",
    image: "🧠",
  },
  {
    id: 3,
    name: "Plasma Extractor",
    profit: "+30,000 / hour",
    increase: 30000,
    level: 1,
    cost: 80000,
    currency: "coins",
    image: "⚡",
  },
  {
    id: 4,
    name: "Dark Matter Engine",
    profit: "+100,000 / hour",
    increase: 100000,
    level: 0,
    cost: 15,
    currency: "gems",
    image: "🌌",
  },
];

const Upgrade = () => {
  const handleUpgradeClick = (item) => {
    console.log("Upgrade clicked:", item);
    alert(`Upgrade ${item.name} for ${item.cost} ${item.currency}`);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto mb-14">
      {/* Heading */}
      <h2 className="text-white text-xl font-bold tracking-widest mb-4">
        POWER UP YOUR MINER
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
        {upgrades.map((item) => (
          <button
            key={item.id}
            onClick={() => handleUpgradeClick(item)}
            className="w-full text-left relative rounded-xl bg-gradient-to-br from-gray-900 to-black
              p-4 shadow-[0_0_25px_#00ffcc33] hover:shadow-[0_0_35px_#00ffcc66] transition
              flex flex-col justify-between"
          >
            {/* Top */}
            <div className="flex gap-3">
              <div className="text-4xl flex items-center justify-center">
                {item.image}
              </div>

              <div className="flex-1">
                <p className="text-white font-semibold tracking-wide">
                  {item.name}
                </p>
                <p className="text-gray-400 text-xs mt-1">Profit per hour</p>
                <p className="text-green-400 text-sm font-mono">{item.profit}</p>
                <div className="flex items-center gap-1 mt-1 text-yellow-400 text-sm">
                  <Coins className="w-4 h-4" />
                  +{item.increase}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="my-3 h-px bg-gray-700" />

            {/* Bottom */}
            <div className="flex justify-between items-center">
              <div className="text-gray-400 text-xs">
                Level <span className="text-white font-bold ml-1">{item.level}</span>
              </div>

              <div className="flex items-center gap-1 text-xs font-bold text-white">
                <ArrowUpCircle className="w-4 h-4" />
                {item.cost}
                {item.currency === "coins" ? (
                  <Coins className="w-4 h-4 ml-1" />
                ) : (
                  <Gem className="w-4 h-4 ml-1" />
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Upgrade;
