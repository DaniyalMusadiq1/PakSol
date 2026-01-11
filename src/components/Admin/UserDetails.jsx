import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById } from "../../store/userSlice";
import {
  ArrowLeft,
  User,
  Coins,
  Gem,
  DollarSign,
  Star,
  Shield,
  Globe,
  Calendar,
  Activity,
  Ban,
  Crown,
  Users,
  Award,
  Package,
  TrendingUp,
  Video,
  ShoppingBag,
  Share2,
  MessageCircle,
  Zap,
  CheckCircle,
  ExternalLink,
  Edit,
  Download,
  Mail,
  Phone,
  MapPin,
  Clock,
  AlertCircle,
  ChevronRight
} from "lucide-react";
import { Image_URL } from "../../config/Config";

const UserDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedUser: user, loading, error } = useSelector((state) => state.users);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    dispatch(fetchUserById(id));
  }, [dispatch, id]);

  const formatNumber = (num) => {
    if (!num && num !== 0) return "0";
    if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const formatDate = (date) => {
    if (!date) return "Never";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getTimeAgo = (date) => {
    if (!date) return "Never";
    const now = new Date();
    const then = new Date(date);
    const diffMs = now - then;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffDays > 30) {
      return formatDate(date);
    } else if (diffDays > 0) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else if (diffMins > 0) {
      return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    } else {
      return "Just now";
    }
  };

  const getRoleInfo = (role) => {
    const roles = {
      0: { label: "Premium User", color: "from-purple-600 to-pink-600", icon: Crown },
      1: { label: "Admin", color: "from-red-600 to-rose-600", icon: Shield },
      2: { label: "User", color: "from-blue-600 to-cyan-600", icon: User }
    };
    return roles[role] || roles[2];
  };

  const getStatusInfo = (user) => {
    if (user?.is_banned) {
      return { 
        label: "Banned", 
        color: "bg-red-100 text-red-800 border-red-200",
        icon: Ban
      };
    }
    if (!user?.is_active) {
      return { 
        label: "Inactive", 
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
        icon: AlertCircle
      };
    }
    return { 
      label: "Active", 
      color: "bg-green-100 text-green-800 border-green-200",
      icon: CheckCircle
    };
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "economy", label: "Economy", icon: TrendingUp },
    { id: "activity", label: "Activity", icon: Activity },
    { id: "social", label: "Social", icon: Users },
    { id: "promotions", label: "Promotions", icon: Award },
    { id: "history", label: "History", icon: Clock }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading user details...</p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">User Not Found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The user you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const roleInfo = getRoleInfo(user.role);
  const statusInfo = getStatusInfo(user);
  const StatusIcon = statusInfo.icon;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  User Details
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Complete profile and activity information
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(`/${id}/edit`)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                <Edit className="w-4 h-4" />
                Edit User
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* User Profile Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl">
                {user.photo_url ? (
                  <img
                     src={user.photo_url.startsWith('http') ? user.photo_url : `${Image_URL}${user.photo_url}`}
                    alt={user.first_name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.first_name + ' ' + user.last_name)}&background=3B82F6&color=fff&size=256`;
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-4xl font-bold text-white">
                      {user.first_name?.[0] || user.username?.[0] || 'U'}
                    </span>
                  </div>
                )}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-full shadow-lg">
                <User className="w-5 h-5" />
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  {user.first_name} {user.last_name}
                </h2>
                <div className="flex flex-wrap gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color} border flex items-center gap-1.5`}>
                    <StatusIcon className="w-4 h-4" />
                    {statusInfo.label}
                  </span>
                  <span className={`px-3 py-1 bg-gradient-to-r ${roleInfo.color} text-white rounded-full text-sm font-medium flex items-center gap-1.5`}>
                    <roleInfo.icon className="w-4 h-4" />
                    {roleInfo.label}
                  </span>
                  {user.is_premium && (
                    <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-sm font-medium flex items-center gap-1.5">
                      <Crown className="w-4 h-4" />
                      Premium Member
                    </span>
                  )}
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-1">
                <span className="font-semibold">@{user.username || "No username"}</span>
                <span className="mx-2">•</span>
                <span>Telegram ID: {user.telegram_id}</span>
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Language</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {user.language_code?.toUpperCase() || "EN"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Joined</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {formatDate(user.joined_at)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-lg">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Last Active</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {getTimeAgo(user.last_login_at)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-1 gap-3 w-full md:w-auto">
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl">
                <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                  {formatNumber(user.total_coins || 0)}
                </div>
                <div className="text-sm text-blue-600 dark:text-blue-300 flex items-center justify-center gap-1">
                  <Coins className="w-4 h-4" />
                  Total Coins
                </div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl">
                <div className="text-2xl font-bold text-purple-700 dark:text-purple-400">
                  {formatNumber(user.total_gems || 0)}
                </div>
                <div className="text-sm text-purple-600 dark:text-purple-300 flex items-center justify-center gap-1">
                  <Gem className="w-4 h-4" />
                  Total Gems
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex overflow-x-auto gap-1 mb-6 pb-2">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                activeTab === id
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-300 shadow"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Economy Summary */}
              <div className="lg:col-span-2 space-y-6">
                {/* Economy Cards */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-500" />
                    Economy Summary
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    <StatCard
                      icon={<Coins className="w-5 h-5" />}
                      label="Total Coins"
                      value={formatNumber(user.total_coins || 0)}
                      color="text-amber-600"
                      bgColor="bg-amber-50 dark:bg-amber-900/20"
                    />
                    <StatCard
                      icon={<Gem className="w-5 h-5" />}
                      label="Total Gems"
                      value={formatNumber(user.total_gems || 0)}
                      color="text-purple-600"
                      bgColor="bg-purple-50 dark:bg-purple-900/20"
                    />
                    <StatCard
                      icon={<DollarSign className="w-5 h-5" />}
                      label="Total TONs"
                      value={formatNumber(user.total_tons || 0)}
                      color="text-blue-600"
                      bgColor="bg-blue-50 dark:bg-blue-900/20"
                    />
                    <StatCard
                      icon={<Star className="w-5 h-5" />}
                      label="Total Stars"
                      value={formatNumber(user.total_stars || 0)}
                      color="text-indigo-600"
                      bgColor="bg-indigo-50 dark:bg-indigo-900/20"
                    />
                    <StatCard
                      icon={<DollarSign className="w-5 h-5" />}
                      label="Total Dollars"
                      value={formatNumber(user.total_dollars || 0)}
                      color="text-green-600"
                      bgColor="bg-green-50 dark:bg-green-900/20"
                    />
                  </div>
                </div>

                {/* Wallet Balances */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Package className="w-5 h-5 text-green-500" />
                    Wallet Balances
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-amber-600 dark:text-amber-400">Wallet Coins</p>
                          <p className="text-2xl font-bold text-amber-700 dark:text-amber-300">
                            {formatNumber(user.wallet_coins || 0)}
                          </p>
                        </div>
                        <Coins className="w-8 h-8 text-amber-500" />
                      </div>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-purple-600 dark:text-purple-400">Wallet Gems</p>
                          <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                            {formatNumber(user.wallet_gems || 0)}
                          </p>
                        </div>
                        <Gem className="w-8 h-8 text-purple-500" />
                      </div>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-green-600 dark:text-green-400">Wallet Dollars</p>
                          <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                            {formatNumber(user.wallet_dollars || 0)}
                          </p>
                        </div>
                        <DollarSign className="w-8 h-8 text-green-500" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Engagement Stats */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-green-500" />
                    Engagement Stats
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <EngagementStat
                      icon={<CheckCircle className="w-4 h-4" />}
                      label="Tasks Done"
                      value={formatNumber(user.total_tasks_done || 0)}
                      color="text-green-600"
                    />
                    <EngagementStat
                      icon={<Video className="w-4 h-4" />}
                      label="Videos Watched"
                      value={formatNumber(user.total_videos_watched || 0)}
                      color="text-blue-600"
                    />
                    <EngagementStat
                      icon={<Zap className="w-4 h-4" />}
                      label="Ads Watched"
                      value={formatNumber(user.total_ads_watched || 0)}
                      color="text-amber-600"
                    />
                    <EngagementStat
                      icon={<Share2 className="w-4 h-4" />}
                      label="Posts Shared"
                      value={formatNumber(user.total_post_shared || 0)}
                      color="text-purple-600"
                    />
                    <EngagementStat
                      icon={<MessageCircle className="w-4 h-4" />}
                      label="Comments"
                      value={formatNumber(user.total_comments || 0)}
                      color="text-indigo-600"
                    />
                    <EngagementStat
                      icon={<ShoppingBag className="w-4 h-4" />}
                      label="Apps Installed"
                      value={formatNumber(user.total_apps_installed || 0)}
                      color="text-red-600"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column - Info & Status */}
              <div className="space-y-6">
                {/* User Info Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-500" />
                    User Information
                  </h3>
                  <div className="space-y-3">
                    <InfoRow label="Telegram ID" value={user.telegram_id} />
                    <InfoRow label="Username" value={`@${user.username || "N/A"}`} />
                    <InfoRow label="Language" value={user.language_code?.toUpperCase() || "EN"} />
                    <InfoRow label="Platform" value={user.platform || "Unknown"} />
                    <InfoRow label="Version" value={user.version || "N/A"} />
                    <InfoRow label="Invited By" value={user.invited_by || "Organic"} />
                  </div>
                </div>

                {/* Status Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-500" />
                    Account Status
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Account Status</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                        {statusInfo.label}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Premium Status</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.is_premium ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>
                        {user.is_premium ? "Premium" : "Regular"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Active Status</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.is_active ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'}`}>
                        {user.is_active ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Deleted Status</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.isdeleted ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'}`}>
                        {user.isdeleted ? "Deleted" : "Active"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Social Subscriptions */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-purple-500" />
                    Social Subscriptions
                  </h3>
                  <div className="space-y-3">
                    <SubscriptionRow
                      label="YouTube"
                      subscribed={user.is_youtube_subscribed}
                    />
                    <SubscriptionRow
                      label="Twitter"
                      subscribed={user.is_twitter_followed}
                    />
                    <SubscriptionRow
                      label="Telegram Channel"
                      subscribed={user.is_tg_channel_joined}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ECONOMY TAB */}
          {activeTab === "economy" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Total Balances */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                    Total Balances
                  </h3>
                  <div className="space-y-4">
                    <BalanceRow
                      icon={<Coins className="w-5 h-5" />}
                      label="Total Coins"
                      value={formatNumber(user.total_coins || 0)}
                      color="text-amber-600"
                      bgColor="bg-amber-100 dark:bg-amber-900/30"
                    />
                    <BalanceRow
                      icon={<Gem className="w-5 h-5" />}
                      label="Total Gems"
                      value={formatNumber(user.total_gems || 0)}
                      color="text-purple-600"
                      bgColor="bg-purple-100 dark:bg-purple-900/30"
                    />
                    <BalanceRow
                      icon={<DollarSign className="w-5 h-5" />}
                      label="Total TONs"
                      value={formatNumber(user.total_tons || 0)}
                      color="text-blue-600"
                      bgColor="bg-blue-100 dark:bg-blue-900/30"
                    />
                    <BalanceRow
                      icon={<Star className="w-5 h-5" />}
                      label="Total Stars"
                      value={formatNumber(user.total_stars || 0)}
                      color="text-indigo-600"
                      bgColor="bg-indigo-100 dark:bg-indigo-900/30"
                    />
                    <BalanceRow
                      icon={<DollarSign className="w-5 h-5" />}
                      label="Total Dollars"
                      value={formatNumber(user.total_dollars || 0)}
                      color="text-green-600"
                      bgColor="bg-green-100 dark:bg-green-900/30"
                    />
                  </div>
                </div>

                {/* Wallet Balances */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                    Wallet Balances
                  </h3>
                  <div className="space-y-4">
                    <BalanceRow
                      icon={<Coins className="w-5 h-5" />}
                      label="Wallet Coins"
                      value={formatNumber(user.wallet_coins || 0)}
                      color="text-amber-600"
                      bgColor="bg-amber-50 dark:bg-amber-900/20"
                    />
                    <BalanceRow
                      icon={<Gem className="w-5 h-5" />}
                      label="Wallet Gems"
                      value={formatNumber(user.wallet_gems || 0)}
                      color="text-purple-600"
                      bgColor="bg-purple-50 dark:bg-purple-900/20"
                    />
                    <BalanceRow
                      icon={<DollarSign className="w-5 h-5" />}
                      label="Wallet Dollars"
                      value={formatNumber(user.wallet_dollars || 0)}
                      color="text-green-600"
                      bgColor="bg-green-50 dark:bg-green-900/20"
                    />
                  </div>
                </div>
              </div>

              {/* Wallets List */}
              {user.wallets && user.wallets.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                    Wallets
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {user.wallets.map((wallet, index) => (
                      <div key={wallet.id || index} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {wallet.type || `Wallet ${index + 1}`}
                          </span>
                          <span className="text-xs text-gray-500">ID: {wallet.id || "N/A"}</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Coins:</span>
                            <span className="font-medium">{wallet.coins || 0}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Gems:</span>
                            <span className="font-medium">{wallet.gems || 0}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Dollars:</span>
                            <span className="font-medium">${wallet.dollars || 0}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SOCIAL TAB */}
          {activeTab === "social" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Friends & Referrals */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Friends & Referrals
                    </h3>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {Array.isArray(user.friends_telegram_ids) ? user.friends_telegram_ids.length : 0}
                      </div>
                      <div className="text-sm text-gray-500">Total Friends</div>
                    </div>
                  </div>

                  {user.friends && user.friends.length > 0 ? (
                    <div className="space-y-3">
                      {user.friends.slice(0, 5).map((friend, index) => (
                        <div key={friend.id || index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {friend.username?.[0] || "F"}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">
                                @{friend.username}
                              </div>
                              <div className="text-xs text-gray-500">
                                {friend.telegram_id}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              friend.status === 'accepted' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                              friend.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                              'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                            }`}>
                              {friend.status}
                            </span>
                            <div className="text-xs text-gray-500 mt-1">
                              {formatDate(friend.joined_at)}
                            </div>
                          </div>
                        </div>
                      ))}
                      {user.friends.length > 5 && (
                        <button className="w-full py-2 text-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
                          View all {user.friends.length} friends
                          <ChevronRight className="w-4 h-4 inline ml-1" />
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-500 dark:text-gray-400">No friends or referrals yet</p>
                    </div>
                  )}
                </div>

                {/* Social Subscriptions */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                    Social Subscriptions
                  </h3>
                  <div className="space-y-4">
                    <SocialPlatform
                      name="YouTube"
                      icon={<Video className="w-5 h-5" />}
                      subscribed={user.is_youtube_subscribed}
                      description="Subscribe to our YouTube channel"
                    />
                    <SocialPlatform
                      name="Twitter / X"
                      icon={<Share2 className="w-5 h-5" />}
                      subscribed={user.is_twitter_followed}
                      description="Follow us on Twitter"
                    />
                    <SocialPlatform
                      name="Telegram Channel"
                      icon={<MessageCircle className="w-5 h-5" />}
                      subscribed={user.is_tg_channel_joined}
                      description="Join our Telegram channel"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Reusable Components
const StatCard = ({ icon, label, value, color, bgColor }) => (
  <div className={`${bgColor} p-4 rounded-xl`}>
    <div className="flex items-center gap-3 mb-2">
      <div className={`p-2 rounded-lg ${color}`}>
        {icon}
      </div>
      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</div>
    </div>
    <div className={`text-xl font-bold ${color}`}>{value}</div>
  </div>
);

const EngagementStat = ({ icon, label, value, color }) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
    <div className="flex items-center gap-3">
      <div className={`p-1.5 rounded-lg ${color}`}>
        {icon}
      </div>
      <span className="text-gray-700 dark:text-gray-300">{label}</span>
    </div>
    <span className="font-semibold text-gray-900 dark:text-white">{value}</span>
  </div>
);

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
    <span className="text-gray-600 dark:text-gray-400">{label}</span>
    <span className="font-medium text-gray-900 dark:text-white">{value}</span>
  </div>
);

const SubscriptionRow = ({ label, subscribed }) => (
  <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
    <span className="text-gray-600 dark:text-gray-400">{label}</span>
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${subscribed ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'}`}>
      {subscribed ? "Subscribed" : "Not Subscribed"}
    </span>
  </div>
);

const BalanceRow = ({ icon, label, value, color, bgColor }) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-lg ${bgColor}`}>
        <div className={color}>{icon}</div>
      </div>
      <div>
        <div className="font-medium text-gray-900 dark:text-white">{label}</div>
        <div className="text-sm text-gray-500">Available Balance</div>
      </div>
    </div>
    <div className={`text-xl font-bold ${color}`}>{value}</div>
  </div>
);

const SocialPlatform = ({ name, icon, subscribed, description }) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg">
        {icon}
      </div>
      <div>
        <div className="font-medium text-gray-900 dark:text-white">{name}</div>
        <div className="text-sm text-gray-500">{description}</div>
      </div>
    </div>
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${subscribed ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'}`}>
      {subscribed ? "Joined" : "Not Joined"}
    </span>
  </div>
);

export default UserDetails;