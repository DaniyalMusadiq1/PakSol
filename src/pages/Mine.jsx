import { Flag, Star, Trophy, HardDrive, Award, Zap } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Games from "../components/Games";
import {
  fetchMiningStatus,
  startMining,
  collectMining,
} from "../store/miningSlice";
import { fetchUserById } from "../store/userSlice";

export const Mine = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const user = useSelector((state) => state.users.selectedUser);
  const mining = useSelector((state) => state.mining);
  const { isMining, startedAt, endsAt, loading } = mining;
  
  const PPH = user?.PPH || 0;
  const [pendingCoins, setPendingCoins] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  
  const MAX_MINING_SECONDS = 60; // 1 minute
  
  const menuItems = [
    { name: "Challenges", icon: Flag, color: "text-yellow-400", path: "/challenges" },
    { name: "Achievements", icon: Star, color: "text-blue-400", path: "/achievements" },
    { name: "Leaderboard", icon: Trophy, color: "text-green-400", path: "/leaderboard" },
  ];

  const handleClick = (item) => navigate(item.path);

  /* ---------- Load mining status from backend ---------- */
  useEffect(() => {
    dispatch(fetchMiningStatus());
  }, [dispatch]);

  /* ---------- Calculate pending coins and time remaining in real-time ---------- */
  useEffect(() => {
    if (!isMining || !startedAt || !endsAt) return;

    const coinsPerSecond = PPH / 3600; // Convert PPH to coins per second

    const interval = setInterval(() => {
      const nowInSeconds = Math.floor(Date.now() / 1000);
      const startInSeconds = Number(startedAt);
      const endInSeconds = Math.floor(new Date(endsAt).getTime() / 1000);
      
      const elapsed = nowInSeconds - startInSeconds;
      const remaining = Math.max(0, endInSeconds - nowInSeconds);
      
      setTimeRemaining(remaining);

      // Calculate pending coins based on elapsed time (max 60 seconds)
      const effectiveElapsed = Math.min(elapsed, MAX_MINING_SECONDS);
      const calculatedCoins = Math.floor(coinsPerSecond * effectiveElapsed);
      
      setPendingCoins(calculatedCoins);
    }, 1000);

    return () => clearInterval(interval);
  }, [isMining, startedAt, endsAt, PPH]);

  const now = Date.now();
  const canCollect = isMining && endsAt && now >= new Date(endsAt).getTime();

  /* ---------- Actions ---------- */
  const handleStart = () => {
    dispatch(startMining());
    setPendingCoins(0);
    setTimeRemaining(MAX_MINING_SECONDS);
  };

  const handleCollect = async () => {
    if (!canCollect) return;
    const result = await dispatch(collectMining());
    
    setPendingCoins(0);
    setTimeRemaining(0);
    
    // Show diamond reward message if earned
    if (result.payload?.diamonds_earned > 0) {
      alert(result.payload.message || '🎉 You earned a Diamond!');
    }
    
    // Refetch user to get latest data
    if (result.meta.requestStatus === 'fulfilled' && user?.id) {
      dispatch(fetchUserById(user.id));
    }
  };

  /* ---------- Format time remaining ---------- */
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white px-4 pb-20">
      {/* Menu */}
      <div className="flex space-x-2 mb-8">
        {menuItems.map((item, index) => (
          <div
            key={index}
            onClick={() => handleClick(item)}
            className="flex flex-col items-center justify-center cursor-pointer px-4 py-2 rounded-full transition hover:bg-gray-500"
          >
            <item.icon className={`w-6 h-6 ${item.color}`} />
            {item.name}
          </div>
        ))}
      </div>

      {/* Mining Core */}
      <div className="relative w-80 h-80 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-2xl mb-8">
        <div className="absolute inset-4 bg-gray-900 rounded-full flex flex-col items-center justify-center">
          <HardDrive className="w-16 h-16 text-purple-400 mb-2" />
          <p className="text-xs text-gray-400 tracking-widest">DIGITAL MINER</p>
          
          {isMining ? (
            <div className="text-center mt-2">
              <p className="text-green-400 text-sm font-semibold">Mining in progress</p>
              <p className="text-gray-400 text-xs mt-1">
                {canCollect ? 'Ready to collect!' : `Time remaining: ${formatTime(timeRemaining)}`}
              </p>
            </div>
          ) : (
            <p className="text-gray-500 text-lg font-bold mt-2">IDLE</p>
          )}

          {/* Display pending coins */}
          <div className="flex flex-col items-center mt-4">
            <div className="text-green-400 text-3xl font-mono font-bold">
              +{pendingCoins}
            </div>
            <span className={`text-5xl mt-2 ${isMining ? "animate-bounce" : ""}`}>
              ⛏️
            </span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      {!isMining ? (
        <button
          onClick={handleStart}
          disabled={loading}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-12 rounded-full shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "STARTING..." : "START"}
        </button>
      ) : (
        <button
          onClick={handleCollect}
          disabled={!canCollect || loading}
          className={`font-bold py-3 px-12 rounded-full shadow-lg transition ${
            canCollect
              ? "bg-yellow-500 hover:bg-yellow-600 text-white animate-pulse"
              : "bg-gray-600 text-gray-400 cursor-not-allowed"
          }`}
        >
          {loading ? "COLLECTING..." : canCollect ? "COLLECT" : "MINING..."}
        </button>
      )}

      {/* Stats */}
      <div className="flex space-x-6 mt-8 text-center">
        <div className="flex flex-col items-center">
          <Award className="w-8 h-8 text-yellow-400 mb-1" />
          <p className="text-2xl font-bold">{user?.total_gems ?? 0}</p>
          <p className="text-xs text-gray-400">Gems</p>
        </div>
        <div className="flex flex-col items-center">
          <Star className="w-8 h-8 text-blue-400 mb-1" />
          <p className="text-2xl font-bold">Lv {user?.level ?? 1}</p>
          <p className="text-xs text-gray-400">Level</p>
        </div>
        <div className="flex flex-col items-center">
          <Zap className="w-8 h-8 text-green-400 mb-1" />
          <p className="text-2xl font-bold">{PPH}</p>
          <p className="text-xs text-gray-400">PPH</p>
        </div>
      </div>

      <Games />
    </div>
  );
};