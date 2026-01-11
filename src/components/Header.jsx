import React, { useEffect } from "react";
import { Coins, Gem, Diamond } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Image_URL } from "../config/Config";

const AppHeader = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({
    user: state.users.selectedUser,
  }));

  // Listen for mining collection events
  useEffect(() => {
    const handleMiningCollected = (event) => {
      if (event.detail?.user) {
        console.log("🔔 Header received mining update:", event.detail.user);
        
        // Update Redux with new values
        dispatch({
          type: 'users/updateUserCoins',
          payload: {
            total_coins: event.detail.user.total_coins,
            total_gems: event.detail.user.total_gems,
            total_diamonds: event.detail.user.total_diamonds || 0
          }
        });
      }
    };

    window.addEventListener('mining:collected', handleMiningCollected);

    return () => {
      window.removeEventListener('mining:collected', handleMiningCollected);
    };
  }, [dispatch]);

  const formatCoins = (value) => {
    if (!value) return "0";

    const BILLION = 100_000_000_000; // 100B

    if (value >= BILLION) {
      return (
        (value / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B"
      );
    }

    return Number(value).toLocaleString();
  };

  // SAFE fallback user data
  const userData = {
    telegramUsername:
      user?.telegram_username || user?.username || "User",
    coins: user?.total_coins || 0,
    gems: user?.total_gems || 0,
    diamonds: user?.total_diamonds || 0,
    profileImage:
      user?.photo_url ||
      user?.avatar ||
      "dumy_user.jpg",
    name: user?.first_name || user?.telegram_username || "User",
  };

  // Compute final profile image path
  const profileSrc = userData.profileImage?.startsWith("http")
    ? userData.profileImage
    : `${Image_URL}${userData.profileImage}`;

  return (
    <header className="w-full bg-slate-900 sticky top-0 z-50 h-14 px-3 flex items-center justify-between text-white border-b border-slate-800">
      
      {/* Username */}
      <div className="text-sm font-semibold truncate max-w-[110px]">
        {user
          ? user.first_name || userData.telegramUsername
          : userData.telegramUsername.startsWith("@")
          ? userData.telegramUsername
          : `${userData.telegramUsername}`}
      </div>

      {/* Coins, Gems, and Diamonds */}
      <div className="flex items-center gap-2 text-xs font-medium">
        {/* Coins */}
        <div className="flex items-center gap-1 bg-slate-800 px-2 py-1 rounded-lg transition-all hover:bg-slate-700">
          <Coins className="w-4 h-4 text-yellow-400" />
          <span className="text-yellow-300 font-bold">
            {formatCoins(userData.coins)}
          </span>
        </div>

        {/* Gems */}
        <div className="flex items-center gap-1 bg-slate-800 px-2 py-1 rounded-lg transition-all hover:bg-slate-700">
          <Gem className="w-4 h-4 text-cyan-400" />
          <span className="text-cyan-300 font-bold">
            {Number(userData.gems).toLocaleString()}
          </span>
        </div>

        {/* Diamonds (if user has any) */}
        {userData.diamonds > 0 && (
          <div className="flex items-center gap-1 bg-slate-800 px-2 py-1 rounded-lg transition-all hover:bg-slate-700">
            <Diamond className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 font-bold">
              {Number(userData.diamonds).toLocaleString()}
            </span>
          </div>
        )}
      </div>

      {/* Profile Image */}
      <Link to="/profile" className="group relative">
        <img
          src={profileSrc}
          alt={userData.name}
          className="size-9 object-cover rounded-full border-2 border-slate-700 group-hover:border-blue-500 transition-all"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/dumy_user.jpg";
          }}
        />
        {/* Online Indicator */}
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900"></div>
      </Link>
    </header>
  );
};

export default AppHeader;