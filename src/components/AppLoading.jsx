import React from "react";

const quotes = [
  "Great things take time…",
  "Mining rewards for you ⛏️",
  "Preparing your dashboard 🚀",
  "Almost there…",
  "Success favors the patient 🌟",
];

const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

const AppLoading = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-black text-white">
      <div className="animate-pulse text-4xl font-bold mb-6">⚡</div>
      <div className="text-lg font-semibold mb-2">Loading App</div>
      <div className="text-sm text-gray-400 italic">{randomQuote}</div>
    </div>
  );
};

export default AppLoading;
