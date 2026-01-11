import React from "react";
import { Gem, Coins, ArrowRight } from "lucide-react";

export const Shop = () => {
  const gemPacks = [
    { gems: 100, price: "$0.99", highlight: false },
    { gems: 500, price: "$3.99", highlight: true },
    { gems: 1200, price: "$7.99", highlight: false },
  ];

  const deals = [
    { gems: 100, coins: "1M", price: "$1.99", highlight: false },
    { gems: 500, coins: "50M", price: "$5.99", highlight: true },
    { gems: 1200, coins: "150M", price: "$9.99", highlight: false },
  ];

  return (
    <div className="w-full max-w-md mx-auto px-3 py-4 space-y-6 mb-14">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-xl font-bold tracking-widest text-white">Shop</h1>
        <p className="text-xs text-gray-400 mt-1">Buy Gems & power up your mining</p>
      </div>

      {/* Gem Packs */}
      <div className="space-y-3">
        {gemPacks.map((pack, index) => (
          <div
            key={index}
            className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-black
            ${pack.highlight
              ? "shadow-[0_0_35px_#22c55e55] border border-green-500/30"
              : "shadow-[0_0_20px_#00ffcc22]"} transition`}
          >
            <Gem className="absolute -right-6 -top-6 w-28 h-28 text-green-400 opacity-10" />
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gray-800 text-green-400">
                  <Gem className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{pack.gems} Gems</p>
                  <p className="text-gray-400 text-xs">Best for upgrades</p>
                </div>
              </div>
              <button
                className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold
                  ${pack.highlight ? "bg-green-500 text-black" : "bg-gray-800 text-white"} hover:scale-105 transition`}
              >
                {pack.price}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Deals Section */}
      <div className="mt-6">
        <h2 className="text-white font-bold tracking-widest mb-3 text-sm">Deals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {deals.map((deal, idx) => (
            <div
              key={idx}
              className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-black
                ${deal.highlight
                  ? "shadow-[0_0_35px_#ffd70055] border border-yellow-500/30"
                  : "shadow-[0_0_20px_#00ffcc22]"} transition p-3 flex flex-col justify-between`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gray-800 text-yellow-400 flex flex-col items-center justify-center">
                  <Gem className="w-5 h-5" />
                  <Coins className="w-5 h-5 mt-1" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">
                    {deal.gems} Gems + {deal.coins.toLocaleString()} Coins
                  </p>
                  <p className="text-gray-400 text-xs mt-1">Powerful combo deal</p>
                </div>
              </div>
              <div className="flex justify-end mt-2">
                <button
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold
                    ${deal.highlight ? "bg-yellow-500 text-black" : "bg-gray-800 text-white"} hover:scale-105 transition`}
                >
                  {deal.price} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
