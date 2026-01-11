import React, { useEffect, useState, useMemo } from "react";
import * as XLSX from "xlsx";
import {
  Download,
  Search,
  Edit,
  Trash,
  Eye,
  Plus,
  User,
  RefreshCcw,
  Ban,
  CheckCircle,
  Award,
  Video,
  ShoppingBag,
  Share2,
  MessageCircle,
  DollarSign,
  Star,
  Gem,
  Coins,
  Filter,
  TrendingUp,
  Shield,
  Globe,
  Activity,
  Crown,
  Users,
  Package,
  Zap,
  Calendar,
  ArrowUpDown,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUsers, deleteUser, updateUser } from "../store/userSlice";
import { Image_URL } from "../config/Config";

export default function ManageUsers() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [expandedUser, setExpandedUser] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");

  const {
    list: usersList = [],
    loading,
    error,
  } = useSelector((state) => state.users);

  /** ---------------- FETCH USERS ---------------- */
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  /** ---------------- NORMALIZE USERS ---------------- */
  const users = useMemo(
    () => usersList.map((item) => item.data || item),
    [usersList]
  );

  /** ---------------- FORMATTING HELPERS ---------------- */
  const formatNumber = (num) => {
    if (!num && num !== 0) return "0";
    if (num >= 1000000000) return (num / 1000000000).toFixed(1) + "B";
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "—";

  const getRoleBadge = (role) => {
    const roles = {
      0: {
        label: "Premium",
        color: "bg-purple-100 text-purple-800",
        icon: Crown,
      },
      1: { label: "Admin", color: "bg-red-100 text-red-800", icon: Shield },
      2: { label: "User", color: "bg-blue-100 text-blue-800", icon: User },
    };
    const roleData = roles[role] || roles[2];
    const Icon = roleData.icon;
    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${roleData.color}`}
      >
        <Icon className="w-3 h-3" />
        {roleData.label}
      </span>
    );
  };

  const getStatusBadge = (user) => {
    if (user.is_banned) {
      return (
        <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
          Banned
        </span>
      );
    }
    if (!user.is_active) {
      return (
        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
          Inactive
        </span>
      );
    }
    return (
      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
        Active
      </span>
    );
  };

  /** ---------------- FILTERING & SORTING ---------------- */
  const filteredUsers = useMemo(() => {
    let filtered = users.filter((user) => {
      const q = search.toLowerCase();
      const matchesSearch =
        user.telegram_id?.toString().toLowerCase().includes(q) ||
        user.username?.toLowerCase().includes(q) ||
        user.first_name?.toLowerCase().includes(q) ||
        user.last_name?.toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && user.is_active && !user.is_banned) ||
        (statusFilter === "inactive" && !user.is_active) ||
        (statusFilter === "banned" && user.is_banned);

      const matchesRole =
        roleFilter === "all" ||
        (roleFilter === "premium" && user.role === 0) ||
        (roleFilter === "admin" && user.role === 1) ||
        (roleFilter === "user" && user.role === 2);

      return matchesSearch && matchesStatus && matchesRole;
    });

    // Sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aVal = a[sortConfig.key];
        let bVal = b[sortConfig.key];

        // Handle nested properties
        if (sortConfig.key === "friends_count") {
          aVal = Array.isArray(a.friends_telegram_ids)
            ? a.friends_telegram_ids.length
            : 0;
          bVal = Array.isArray(b.friends_telegram_ids)
            ? b.friends_telegram_ids.length
            : 0;
        }

        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [users, search, statusFilter, roleFilter, sortConfig]);

  /** ---------------- ACTIONS ---------------- */
  const handleDelete = (id) => {
    if (window.confirm("Delete this user permanently?")) {
      dispatch(deleteUser(id));
    }
  };

  const handleEdit = (id) => navigate(`/${id}/edit`);

  const handleView = (id) => navigate(`/users/${id}`);

  const handleAddUser = () => navigate("/add_user");

  const handleRefresh = () => dispatch(fetchUsers());

  const handleToggleBan = async (user) => {
    const confirmMessage = user.is_banned
      ? `Unban user ${user.first_name} ${user.last_name}?`
      : `Ban user ${user.first_name} ${user.last_name}?`;

    if (window.confirm(confirmMessage)) {
      try {
        await dispatch(
          updateUser({
            id: user.id,
            data: {
              ...user,
              is_banned: !user.is_banned,
              banned_at: !user.is_banned ? new Date().toISOString() : null,
              ban_reason: !user.is_banned ? "Banned by admin" : null,
            },
          })
        ).unwrap();

        dispatch(fetchUsers()); // Refresh the list
      } catch (error) {
        console.error("Failed to update user:", error);
      }
    }
  };

  const handleSort = (key) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleExport = () => {
    if (!users.length) {
      alert("No users to export");
      return;
    }

    // Prepare data for Excel
    const exportData = users.map((user) => ({
      ID: user.id,
      Telegram_ID: user.telegram_id,
      Username: user.username || "N/A",
      First_Name: user.first_name,
      Last_Name: user.last_name || "N/A",
      Email: user.email || "N/A",
      Role: user.role === 0 ? "Premium" : user.role === 1 ? "Admin" : "User",
      Status: user.is_banned
        ? "Banned"
        : user.is_active
        ? "Active"
        : "Inactive",
      Premium: user.is_premium ? "Yes" : "No",
      Language: user.language_code || "N/A",

      // Economy
      Total_Coins: user.total_coins || 0,
      Total_Gems: user.total_gems || 0,
      Total_TONs: user.total_tons || 0,
      Total_Stars: user.total_stars || 0,
      Total_Dollars: user.total_dollars || 0,
      Wallet_Coins: user.wallet_coins || 0,
      Wallet_Gems: user.wallet_gems || 0,
      Wallet_Dollars: user.wallet_dollars || 0,

      // Engagement
      Tasks_Done: user.total_tasks_done || 0,
      Videos_Watched: user.total_videos_watched || 0,
      Ads_Watched: user.total_ads_watched || 0,
      Posts_Shared: user.total_post_shared || 0,
      Comments: user.total_comments || 0,
      Apps_Installed: user.total_apps_installed || 0,

      // Social
      YouTube_Subscribed: user.is_youtube_subscribed ? "Yes" : "No",
      Twitter_Followed: user.is_twitter_followed ? "Yes" : "No",
      TG_Channel_Joined: user.is_tg_channel_joined ? "Yes" : "No",

      // Referrals
      Friends_Count: Array.isArray(user.friends_telegram_ids)
        ? user.friends_telegram_ids.length
        : 0,
      Invited_By: user.invited_by || "N/A",
      Promotions_Completed: user.promotions_completed || 0,
      Daily_Bonus_Claims: user.daily_bonus_claims || 0,

      // Dates
      Joined_At: user.joined_at,
      Last_Login: user.last_login_at,
      Banned_At: user.banned_at,
    }));

    // Create worksheet & workbook
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

    // Auto-size columns
    const wscols = [
      { wch: 5 }, // ID
      { wch: 12 }, // Telegram_ID
      { wch: 15 }, // Username
      { wch: 12 }, // First_Name
      { wch: 12 }, // Last_Name
      { wch: 10 }, // Role
      { wch: 8 }, // Status
      { wch: 8 }, // Premium
      { wch: 10 }, // Total_Coins
      { wch: 10 }, // Total_Gems
      { wch: 10 }, // Tasks_Done
      { wch: 15 }, // Joined_At
    ];
    worksheet["!cols"] = wscols;

    // Download file
    XLSX.writeFile(
      workbook,
      `users_export_${new Date().toISOString().split("T")[0]}.xlsx`
    );
  };

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key)
      return <ArrowUpDown className="w-3 h-3 ml-1 opacity-50" />;
    return sortConfig.direction === "asc" ? (
      <ArrowUpDown className="w-3 h-3 ml-1 rotate-180" />
    ) : (
      <ArrowUpDown className="w-3 h-3 ml-1" />
    );
  };

  /** ---------------- STATS ---------------- */
  const stats = useMemo(() => {
    const totalUsers = users.length;
    const activeUsers = users.filter((u) => u.is_active && !u.is_banned).length;
    const bannedUsers = users.filter((u) => u.is_banned).length;
    const premiumUsers = users.filter((u) => u.role === 0).length;
    const totalCoins = users.reduce((sum, u) => sum + (u.total_coins || 0), 0);
    const totalTasks = users.reduce(
      (sum, u) => sum + (u.total_tasks_done || 0),
      0
    );

    return {
      totalUsers,
      activeUsers,
      bannedUsers,
      premiumUsers,
      totalCoins,
      totalTasks,
    };
  }, [users]);

  /** ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4 md:p-6">
      {/* HEADER */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
              User Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage all users, their status, and analytics
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors shadow"
            >
              <RefreshCcw size={16} /> Refresh
            </button>

            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow"
            >
              <Download size={16} /> Export
            </button>

            <button
              onClick={handleAddUser}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity shadow"
            >
              <Plus size={16} /> Add User
            </button>
          </div>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total Users
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.totalUsers}
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Active
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {stats.activeUsers}
                </p>
              </div>
              <Activity className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Banned
                </p>
                <p className="text-2xl font-bold text-red-600">
                  {stats.bannedUsers}
                </p>
              </div>
              <Ban className="w-8 h-8 text-red-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Premium
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  {stats.premiumUsers}
                </p>
              </div>
              <Crown className="w-8 h-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total Coins
                </p>
                <p className="text-2xl font-bold text-amber-600">
                  {formatNumber(stats.totalCoins)}
                </p>
              </div>
              <Coins className="w-8 h-8 text-amber-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Tasks Done
                </p>
                <p className="text-2xl font-bold text-indigo-600">
                  {formatNumber(stats.totalTasks)}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-indigo-500" />
            </div>
          </div>
        </div>

        {/* FILTERS & SEARCH */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-900 dark:text-white placeholder-gray-500"
                placeholder="Search by Telegram ID, username, or name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-900 dark:text-white appearance-none"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="banned">Banned</option>
              </select>
            </div>

            <div className="relative">
              <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-900 dark:text-white appearance-none"
              >
                <option value="all">All Roles</option>
                <option value="premium">Premium</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Loading users...
          </p>
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 text-center">
          <div className="text-red-600 dark:text-red-400 text-lg font-semibold mb-2">
            Error Loading Users
          </div>
          <p className="text-red-500 dark:text-red-300">
            {typeof error === "string"
              ? error
              : error?.message || "Something went wrong"}
          </p>
          <button
            onClick={handleRefresh}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* USER TABLE */}
      {!loading && !error && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-slate-700">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
              <thead className="bg-gray-50 dark:bg-slate-900">
                <tr>
                  <th
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("id")}
                  >
                    <div className="flex items-center">
                      ID {renderSortIcon("id")}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("level")}
                  >
                    <div className="flex items-center">
                      <Award className="w-4 h-4 mr-1" /> Level{" "}
                      {renderSortIcon("level")}
                    </div>
                  </th>

                  <th
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("total_coins")}
                  >
                    <div className="flex items-center">
                      <Coins className="w-4 h-4 mr-1" /> Coins{" "}
                      {renderSortIcon("total_coins")}
                    </div>
                  </th>
                  <th
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("total_gems")}
                  >
                    <div className="flex items-center">
                      <Gem className="w-4 h-4 mr-1" /> Gems{" "}
                      {renderSortIcon("total_gems")}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Engagement
                  </th>
                  <th
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("friends_count")}
                  >
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" /> Friends{" "}
                      {renderSortIcon("friends_count")}
                    </div>
                  </th>
                  <th
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("joined_at")}
                  >
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" /> Joined{" "}
                      {renderSortIcon("joined_at")}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-12 text-center">
                      <User className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-500 dark:text-gray-400">
                        No users found
                      </p>
                      <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                        Try adjusting your search or filters
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map(
                    (user) => (
                      ( 
                        <tr
                          key={user.id}
                          className="hover:bg-gray-50 dark:hover:bg-slate-900/50 transition-colors"
                        >
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm font-mono text-gray-900 dark:text-white">
                              {user.id}
                            </div>
                          </td>

                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                {user.photo_url ? (
                                  <img
                                    src={
                                      user.photo_url.startsWith("http")
                                        ? user.photo_url
                                        : `${Image_URL}${user.photo_url}`
                                    }
                                    className="h-10 w-10 rounded-full border-2 border-white dark:border-slate-800 shadow"
                                    alt={user.username}
                                    onError={(e) => {
                                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                        user.first_name + " " + user.last_name
                                      )}&background=3B82F6&color=fff&size=128`;
                                    }}
                                  />
                                ) : (
                                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white text-sm">
                                    {user.first_name?.[0] ||
                                      user.username?.[0] ||
                                      "U"}
                                  </div>
                                )}
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                  {user.first_name} {user.last_name}
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                  <div className="text-xs text-gray-500 dark:text-gray-400">
                                    @{user.username || "No username"}
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">
                                    {getRoleBadge(user.role)}
                                  </div>
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  <Globe className="w-3 h-3 inline mr-1" />
                                  {user.language_code?.toUpperCase() || "EN"}
                                  <span className="mx-2">•</span>
                                  {user.telegram_id}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="space-y-1">
                              {getStatusBadge(user)}
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {user.is_premium && (
                                  <span className="inline-flex items-center">
                                    <Crown className="w-3 h-3 mr-1 text-amber-500" />
                                    Premium
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm font-semibold text-gray-900 dark:text-white">
                              {user.level ?? 0}{" "}
                              
                            </div>
                          </td>

                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="space-y-1">
                              <div className="flex items-center text-sm">
                                <Coins className="w-4 h-4 text-amber-500 mr-1" />
                                <span className="font-semibold text-gray-900 dark:text-white">
                                  {formatNumber(user.total_coins || 0)}
                                </span>
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                Wallet: {formatNumber(user.wallet_coins || 0)}
                              </div>
                            </div>
                          </td>

                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="space-y-1">
                              <div className="flex items-center text-sm">
                                <Gem className="w-4 h-4 text-purple-500 mr-1" />
                                <span className="font-semibold text-gray-900 dark:text-white">
                                  {formatNumber(user.total_gems || 0)}
                                </span>
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                Wallet: {formatNumber(user.wallet_gems || 0)}
                              </div>
                            </div>
                          </td>

                          <td className="px-4 py-3">
                            <div className="space-y-1">
                              <div className="flex items-center text-xs">
                                <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                                <span className="text-gray-600 dark:text-gray-400">
                                  Tasks:{" "}
                                  {formatNumber(user.total_tasks_done || 0)}
                                </span>
                              </div>
                              <div className="flex items-center text-xs">
                                <Video className="w-3 h-3 text-blue-500 mr-1" />
                                <span className="text-gray-600 dark:text-gray-400">
                                  Videos:{" "}
                                  {formatNumber(user.total_videos_watched || 0)}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="space-y-1">
                              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                {Array.isArray(user.friends_telegram_ids)
                                  ? user.friends_telegram_ids.length
                                  : 0}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                Invited by: {user.invited_by || "N/A"}
                              </div>
                            </div>
                          </td>

                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-white">
                              {formatDate(user.joined_at)}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {user.last_login_at
                                ? `Last login: ${formatDate(
                                    user.last_login_at
                                  )}`
                                : "Never logged in"}
                            </div>
                          </td>

                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleView(user.id)}
                                className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>

                              <button
                                onClick={() => handleEdit(user.id)}
                                className="p-2 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-colors"
                                title="Edit User"
                              >
                                <Edit className="w-4 h-4" />
                              </button>

                              <button
                                onClick={() => handleToggleBan(user)}
                                className={`p-2 rounded-lg transition-colors ${
                                  user.is_banned
                                    ? "text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
                                    : "text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                }`}
                                title={
                                  user.is_banned ? "Unban User" : "Ban User"
                                }
                              >
                                {user.is_banned ? (
                                  <CheckCircle className="w-4 h-4" />
                                ) : (
                                  <Ban className="w-4 h-4" />
                                )}
                              </button>

                              <button
                                onClick={() => handleDelete(user.id)}
                                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                title="Delete User"
                              >
                                <Trash className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    )
                  )
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION FOOTER */}
          {filteredUsers.length > 0 && (
            <div className="px-4 py-3 border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700 dark:text-gray-400">
                  Showing{" "}
                  <span className="font-semibold">{filteredUsers.length}</span>{" "}
                  of <span className="font-semibold">{users.length}</span> users
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-400">
                  Sorted by:{" "}
                  <span className="font-semibold capitalize">
                    {sortConfig.key}
                  </span>{" "}
                  ({sortConfig.direction})
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
