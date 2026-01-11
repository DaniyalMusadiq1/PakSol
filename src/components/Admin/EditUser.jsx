import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserById,
  updateUser,
  clearSelectedUser,
} from "../../store/userSlice";
import {
  Save,
  ArrowLeft,
  User,
  DollarSign,
  Wallet,
  Users,
  Award,
  Shield,
  Globe,
  Calendar,
  Activity,
  Ban,
  Star,
  Gem,
  Coins,
  PlayCircle,
  ShoppingBag,
  Share2,
  MessageCircle,
  CheckCircle,
  TrendingUp,
  Package,
  Zap,
  AlertCircle,
} from "lucide-react";
import { Image_URL } from "../../config/Config";

const tabs = [
  { id: "basic", label: "Basic Info", icon: User },
  { id: "economy", label: "Economy", icon: DollarSign },
  { id: "wallets", label: "Wallets", icon: Wallet },
  { id: "friends", label: "Friends", icon: Users },
  { id: "promotions", label: "Promotions", icon: Award },
  { id: "statistics", label: "Statistics", icon: TrendingUp },
];

const EditUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    selectedUser: user,
    loading,
    success,
    error,
  } = useSelector((s) => s.users);
  const [form, setForm] = useState(null);
  const [activeTab, setActiveTab] = useState("basic");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    dispatch(fetchUserById(id));
    return () => dispatch(clearSelectedUser());
  }, [id]);

  useEffect(() => {
    if (user) {
      setForm({
        ...user,
        // Ensure all numeric fields default to 0 if null/undefined
        total_coins: user.total_coins || 0,
        total_gems: user.total_gems || 0,
        total_tons: user.total_tons || 0,
        total_stars: user.total_stars || 0,
        total_dollars: user.total_dollars || 0,
        wallet_coins: user.wallet_coins || 0,
        wallet_gems: user.wallet_gems || 0,
        wallet_dollars: user.wallet_dollars || 0,
        total_tasks_done: user.total_tasks_done || 0,
        total_videos_watched: user.total_videos_watched || 0,
        total_ads_watched: user.total_ads_watched || 0,
        total_post_shared: user.total_post_shared || 0,
        total_comments: user.total_comments || 0,
        total_apps_installed: user.total_apps_installed || 0,
        promotions_completed: user.promotions_completed || 0,
        daily_bonus_claims: user.daily_bonus_claims || 0,
        friends_count: user.friends_count || 0,
        level: user.level || 0,
      });
    }
  }, [user]);

  useEffect(() => {
    if (success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  }, [success]);

  const validateInputs = () => {
    setValidationError("");

    const maxSafeInteger = Number.MAX_SAFE_INTEGER || 9007199254740991;
    const maxStandardInteger = 2147483647; // Standard INT max

    // Check all numeric fields for overflow
    const numericFields = [
      {
        key: "total_coins",
        value: form.total_coins,
        label: "Total Coins",
        max: maxSafeInteger,
      },
      {
        key: "total_gems",
        value: form.total_gems,
        label: "Total Gems",
        max: maxSafeInteger,
      },
      {
        key: "total_tons",
        value: form.total_tons,
        label: "Total TONs",
        max: maxSafeInteger,
      },
      {
        key: "total_stars",
        value: form.total_stars,
        label: "Total Stars",
        max: maxSafeInteger,
      },
      {
        key: "total_dollars",
        value: form.total_dollars,
        label: "Total Dollars",
        max: 10000000000000,
      }, // 10 trillion max
      {
        key: "wallet_coins",
        value: form.wallet_coins,
        label: "Wallet Coins",
        max: maxSafeInteger,
      },
      {
        key: "wallet_gems",
        value: form.wallet_gems,
        label: "Wallet Gems",
        max: maxSafeInteger,
      },
      {
        key: "wallet_dollars",
        value: form.wallet_dollars,
        label: "Wallet Dollars",
        max: 10000000000000,
      },
      {
        key: "total_tasks_done",
        value: form.total_tasks_done,
        label: "Tasks Done",
        max: maxStandardInteger,
      },
      {
        key: "total_videos_watched",
        value: form.total_videos_watched,
        label: "Videos Watched",
        max: maxStandardInteger,
      },
      {
        key: "total_ads_watched",
        value: form.total_ads_watched,
        label: "Ads Watched",
        max: maxStandardInteger,
      },
      {
        key: "total_post_shared",
        value: form.total_post_shared,
        label: "Posts Shared",
        max: maxStandardInteger,
      },
      {
        key: "total_comments",
        value: form.total_comments,
        label: "Comments",
        max: maxStandardInteger,
      },
      {
        key: "total_apps_installed",
        value: form.total_apps_installed,
        label: "Apps Installed",
        max: maxStandardInteger,
      },
      {
        key: "promotions_completed",
        value: form.promotions_completed,
        label: "Promotions Completed",
        max: maxStandardInteger,
      },
      {
        key: "daily_bonus_claims",
        value: form.daily_bonus_claims,
        label: "Daily Bonus Claims",
        max: maxStandardInteger,
      },
      {
        key: "friends_count",
        value: form.friends_count,
        label: "Friends Count",
        max: maxStandardInteger,
      },
      {
        key: "level",
        value: form.level,
        label: "Level",
        max: 1000, 
      },
    ];

    for (const field of numericFields) {
      const value = Number(field.value);

      if (isNaN(value)) {
        setValidationError(`❌ ${field.label} must be a valid number`);
        return false;
      }

      if (value < 0) {
        setValidationError(`❌ ${field.label} cannot be negative`);
        return false;
      }

      if (value > field.max) {
        setValidationError(
          `❌ ${
            field.label
          } value is too large! Maximum: ${field.max.toLocaleString()}`
        );
        return false;
      }
    }

    return true;
  };

  const handleUpdate = (path, value) => {
    setForm((prev) => {
      const newForm = { ...prev };
      const lastKey = path[path.length - 1];

      if (path.length === 1) {
        newForm[lastKey] = value;
      } else {
        let current = newForm;
        for (let i = 0; i < path.length - 1; i++) {
          if (!current[path[i]]) current[path[i]] = {};
          if (typeof current[path[i]] === "object") {
            current[path[i]] = Array.isArray(current[path[i]])
              ? [...current[path[i]]]
              : { ...current[path[i]] };
          }
          current = current[path[i]];
        }
        current[lastKey] = value;
      }

      return newForm;
    });
    setValidationError(""); // Clear validation error when user edits
  };

  const handleArrayUpdate = (arrayPath, index, field, value) => {
    const newArray = [...form[arrayPath]];
    newArray[index] = { ...newArray[index], [field]: value };
    handleUpdate([arrayPath], newArray);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await dispatch(updateUser({ id, data: form }));
      if (!result.error) {
        setSaveSuccess(true);
        setTimeout(() => {
          navigate(`/users/${id}`);
        }, 1500);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate("/manage-users");
  };

  if (loading || !form) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading user data...</p>
        </div>
      </div>
    );
  }

  const renderStatusBadge = () => {
    if (form.is_banned) {
      return (
        <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
          Banned
        </span>
      );
    }
    if (!form.is_active) {
      return (
        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
          Inactive
        </span>
      );
    }
    return (
      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
        Active
      </span>
    );
  };

  const renderRoleBadge = () => {
    const roleMap = {
      0: {
        label: "Premium User",
        color: "bg-purple-100 text-purple-800",
        icon: Star,
      },
      1: { label: "Admin", color: "bg-red-100 text-red-800", icon: Shield },
      2: { label: "User", color: "bg-blue-100 text-blue-800", icon: User },
    };
    const role = roleMap[form.role] || roleMap[2];
    const Icon = role.icon;
    return (
      <span
        className={`flex items-center gap-1.5 px-3 py-1 ${role.color} rounded-full text-sm font-medium`}
      >
        <Icon className="w-4 h-4" />
        {role.label}
      </span>
    );
  };

  // Custom Checkbox Input Component (simplified without icon prop)
  const CustomCheckbox = ({
    label,
    checked,
    onChange,
    activeColor = "blue",
  }) => {
    const colorClasses = {
      blue: "text-blue-600 focus:ring-blue-500",
      green: "text-green-600 focus:ring-green-500",
      red: "text-red-600 focus:ring-red-500",
      purple: "text-purple-600 focus:ring-purple-500",
      yellow: "text-yellow-600 focus:ring-yellow-500",
    };

    const bgColorClasses = {
      blue: checked ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-400",
      green: checked
        ? "bg-green-100 text-green-600"
        : "bg-gray-100 text-gray-400",
      red: checked ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-400",
      purple: checked
        ? "bg-purple-100 text-purple-600"
        : "bg-gray-100 text-gray-400",
      yellow: checked
        ? "bg-yellow-100 text-yellow-600"
        : "bg-gray-100 text-gray-400",
    };

    return (
      <label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition">
        <div className="flex items-center gap-3">
          <div
            className={`p-1.5 md:p-2 rounded-lg ${bgColorClasses[activeColor]}`}
          >
            {/* Simple circle indicator instead of icon */}
            <div className="w-4 h-4 md:w-5 md:h-5"></div>
          </div>
          <span className="font-medium text-gray-700 text-sm md:text-base">
            {label}
          </span>
        </div>
        <input
          type="checkbox"
          checked={checked || false}
          onChange={(e) => onChange(e.target.checked)}
          className={`w-4 h-4 md:w-5 md:h-5 rounded focus:ring-2 ${colorClasses[activeColor]}`}
        />
      </label>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={handleBack}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4 group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Users</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Edit User
              </h1>
              <p className="text-gray-600">
                Manage user information and settings
              </p>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              {saveSuccess && (
                <div className="px-4 py-2 bg-green-100 text-green-800 rounded-lg animate-pulse flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Changes saved successfully!</span>
                </div>
              )}

              {validationError && (
                <div className="px-4 py-2 bg-red-100 text-red-800 rounded-lg flex items-center gap-2 animate-shake">
                  <AlertCircle className="w-5 h-5" />
                  <span>{validationError}</span>
                </div>
              )}

              {error && (
                <div className="px-4 py-2 bg-red-100 text-red-800 rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  <span>
                    Error: {error.message || "Failed to save changes"}
                  </span>
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-5 md:px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl active:scale-95 active:shadow-md"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* User Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
            <div className="relative">
              <img
                src={
                  `${Image_URL}${user.photo_url}` ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    form.first_name + " " + form.last_name
                  )}&background=3B82F6&color=fff&size=128`
                }
                className="w-20 h-20 md:w-28 md:h-28 rounded-full border-4 border-white shadow-lg"
                alt="Profile"
              />
              <div className="absolute -bottom-2 -right-2 bg-white p-1.5 md:p-2 rounded-full shadow-lg">
                <Shield className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
              </div>
            </div>

            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 md:gap-3 mb-3">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
                  {form.first_name} {form.last_name}
                </h2>
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  {renderStatusBadge()}
                  {renderRoleBadge()}
                </div>
              </div>

              <p className="text-gray-600 mb-1 text-sm md:text-base">
                <span className="font-semibold">
                  @{form.username || "no_username"}
                </span>
                <span className="mx-2 hidden sm:inline">•</span>
                <span className="block sm:inline mt-1 sm:mt-0">
                  Telegram ID: {form.telegram_id}
                </span>
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 md:gap-4 mt-3 md:mt-4 text-xs md:text-sm text-gray-500">
                <div className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span>{form.language_code?.toUpperCase() || "EN"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span>
                    Joined {new Date(form.joined_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span>{form.is_premium ? "Premium" : "Regular"}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-1 gap-2 md:gap-3 w-full sm:w-auto">
              <div className="text-center p-3 md:p-4 bg-blue-50 rounded-xl">
                <div className="text-lg md:text-xl lg:text-2xl font-bold text-blue-700">
                  {form.total_coins}
                </div>
                <div className="text-xs md:text-sm text-gray-600">Coins</div>
              </div>
              <div className="text-center p-3 md:p-4 bg-purple-50 rounded-xl">
                <div className="text-lg md:text-xl lg:text-2xl font-bold text-purple-700">
                  {form.total_gems}
                </div>
                <div className="text-xs md:text-sm text-gray-600">Gems</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex overflow-x-auto gap-1 mb-4 md:mb-6 pb-2 scrollbar-hide">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-3 md:px-5 md:py-3 rounded-lg font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                activeTab === id
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 shadow"
              }`}
            >
              <Icon className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-sm md:text-base">{label}</span>
            </button>
          ))}
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit}>
          {/* BASIC INFORMATION TAB */}
          {activeTab === "basic" && (
            <div className="space-y-4 md:space-y-6">
              <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6 pb-3 md:pb-4 border-b">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={form.first_name || ""}
                      onChange={(e) =>
                        handleUpdate(["first_name"], e.target.value)
                      }
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm md:text-base"
                      placeholder="Enter first name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={form.last_name || ""}
                      onChange={(e) =>
                        handleUpdate(["last_name"], e.target.value)
                      }
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm md:text-base"
                      placeholder="Enter last name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      value={form.username || ""}
                      onChange={(e) =>
                        handleUpdate(["username"], e.target.value)
                      }
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm md:text-base"
                      placeholder="@username"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telegram ID
                    </label>
                    <input
                      type="text"
                      value={form.telegram_id || ""}
                      onChange={(e) =>
                        handleUpdate(["telegram_id"], e.target.value)
                      }
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg bg-gray-50 text-sm md:text-base"
                      disabled
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Level
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={form.level || 0}
                      onChange={(e) =>
                        handleUpdate(
                          ["level"],
                          parseInt(e.target.value, 10) || 0
                        )
                      }
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm md:text-base"
                      placeholder="Level"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Language
                    </label>
                    <select
                      value={form.language_code || "en"}
                      onChange={(e) =>
                        handleUpdate(["language_code"], e.target.value)
                      }
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm md:text-base"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                      <option value="ru">Russian</option>
                      <option value="ur">Urdu</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role
                    </label>
                    <select
                      value={form.role || 2}
                      onChange={(e) =>
                        handleUpdate(["role"], parseInt(e.target.value))
                      }
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm md:text-base"
                    >
                      <option value={0}>Premium User</option>
                      <option value={1}>Admin</option>
                      <option value={2}>User</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
                  <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">
                    Account Status
                  </h4>
                  <div className="space-y-3 md:space-y-4">
                    <CustomCheckbox
                      label="Active Account"
                      checked={form.is_active || false}
                      onChange={(v) => handleUpdate(["is_active"], v)}
                      activeColor="green"
                    />

                    <CustomCheckbox
                      label="Premium User"
                      checked={form.is_premium || false}
                      onChange={(v) => handleUpdate(["is_premium"], v)}
                      activeColor="purple"
                    />

                    <CustomCheckbox
                      label="Banned"
                      checked={form.is_banned || false}
                      onChange={(v) => handleUpdate(["is_banned"], v)}
                      activeColor="red"
                    />

                    {form.is_banned && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ban Reason
                        </label>
                        <textarea
                          value={form.ban_reason || ""}
                          onChange={(e) =>
                            handleUpdate(["ban_reason"], e.target.value)
                          }
                          className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm md:text-base"
                          rows="2"
                          placeholder="Enter ban reason..."
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
                  <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">
                    Additional Status
                  </h4>
                  <div className="space-y-3 md:space-y-4">
                    <CustomCheckbox
                      label="Regular User"
                      checked={form.is_regular || false}
                      onChange={(v) => handleUpdate(["is_regular"], v)}
                      activeColor="green"
                    />

                    <CustomCheckbox
                      label="YouTube Subscribed"
                      checked={form.is_youtube_subscribed || false}
                      onChange={(v) =>
                        handleUpdate(["is_youtube_subscribed"], v)
                      }
                      activeColor="red"
                    />

                    <CustomCheckbox
                      label="Twitter Followed"
                      checked={form.is_twitter_followed || false}
                      onChange={(v) => handleUpdate(["is_twitter_followed"], v)}
                      activeColor="blue"
                    />

                    <CustomCheckbox
                      label="TG Channel Joined"
                      checked={form.is_tg_channel_joined || false}
                      onChange={(v) =>
                        handleUpdate(["is_tg_channel_joined"], v)
                      }
                      activeColor="blue"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ECONOMY TAB */}
          {activeTab === "economy" && (
            <div className="space-y-4 md:space-y-6">
              <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6 pb-3 md:pb-4 border-b">
                  Economy & Resources
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`p-2 bg-yellow-50 text-yellow-600 rounded-lg`}
                      >
                        <Coins className="w-5 h-5 md:w-6 md:h-6" />
                      </div>
                      <label className="text-sm font-medium text-gray-700">
                        Total Coins
                      </label>
                    </div>
                    <input
                      type="number"
                      value={form.total_coins === 0 ? "" : form.total_coins}
                      onChange={(e) =>
                        handleUpdate(
                          ["total_coins"],
                          e.target.value === ""
                            ? 0
                            : parseInt(e.target.value) || 0
                        )
                      }
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm md:text-base pl-10 md:pl-12"
                      min="0"
                      placeholder="0"
                    />
                    <div
                      className={`absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-yellow-600 opacity-70`}
                    >
                      <Coins className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="relative">
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`p-2 bg-purple-50 text-purple-600 rounded-lg`}
                      >
                        <Gem className="w-5 h-5 md:w-6 md:h-6" />
                      </div>
                      <label className="text-sm font-medium text-gray-700">
                        Total Gems
                      </label>
                    </div>
                    <input
                      type="number"
                      value={form.total_gems === 0 ? "" : form.total_gems}
                      onChange={(e) =>
                        handleUpdate(
                          ["total_gems"],
                          e.target.value === ""
                            ? 0
                            : parseInt(e.target.value) || 0
                        )
                      }
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm md:text-base pl-10 md:pl-12"
                      min="0"
                      placeholder="0"
                    />
                    <div
                      className={`absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-purple-600 opacity-70`}
                    >
                      <Gem className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="relative">
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`p-2 bg-blue-50 text-blue-600 rounded-lg`}
                      >
                        <DollarSign className="w-5 h-5 md:w-6 md:h-6" />
                      </div>
                      <label className="text-sm font-medium text-gray-700">
                        Total TONs
                      </label>
                    </div>
                    <input
                      type="number"
                      value={form.total_tons === 0 ? "" : form.total_tons}
                      onChange={(e) =>
                        handleUpdate(
                          ["total_tons"],
                          e.target.value === ""
                            ? 0
                            : parseInt(e.target.value) || 0
                        )
                      }
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm md:text-base pl-10 md:pl-12"
                      min="0"
                      placeholder="0"
                    />
                    <div
                      className={`absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-blue-600 opacity-70`}
                    >
                      <DollarSign className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="relative">
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`p-2 bg-indigo-50 text-indigo-600 rounded-lg`}
                      >
                        <Star className="w-5 h-5 md:w-6 md:h-6" />
                      </div>
                      <label className="text-sm font-medium text-gray-700">
                        Total Stars
                      </label>
                    </div>
                    <input
                      type="number"
                      value={form.total_stars === 0 ? "" : form.total_stars}
                      onChange={(e) =>
                        handleUpdate(
                          ["total_stars"],
                          e.target.value === ""
                            ? 0
                            : parseInt(e.target.value) || 0
                        )
                      }
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm md:text-base pl-10 md:pl-12"
                      min="0"
                      placeholder="0"
                    />
                    <div
                      className={`absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-indigo-600 opacity-70`}
                    >
                      <Star className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="relative">
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`p-2 bg-green-50 text-green-600 rounded-lg`}
                      >
                        <DollarSign className="w-5 h-5 md:w-6 md:h-6" />
                      </div>
                      <label className="text-sm font-medium text-gray-700">
                        Total Dollars
                      </label>
                    </div>
                    <input
                      type="number"
                      value={form.total_dollars === 0 ? "" : form.total_dollars}
                      onChange={(e) =>
                        handleUpdate(
                          ["total_dollars"],
                          e.target.value === ""
                            ? 0
                            : parseFloat(e.target.value) || 0
                        )
                      }
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm md:text-base pl-10 md:pl-12"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                    />
                    <div
                      className={`absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-green-600 opacity-70`}
                    >
                      <DollarSign className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="relative">
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`p-2 bg-yellow-50 text-yellow-600 rounded-lg`}
                      >
                        <Coins className="w-5 h-5 md:w-6 md:h-6" />
                      </div>
                      <label className="text-sm font-medium text-gray-700">
                        Wallet Coins
                      </label>
                    </div>
                    <input
                      type="number"
                      value={form.wallet_coins === 0 ? "" : form.wallet_coins}
                      onChange={(e) =>
                        handleUpdate(
                          ["wallet_coins"],
                          e.target.value === ""
                            ? 0
                            : parseInt(e.target.value) || 0
                        )
                      }
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm md:text-base pl-10 md:pl-12"
                      min="0"
                      placeholder="0"
                    />
                    <div
                      className={`absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-yellow-600 opacity-70`}
                    >
                      <Coins className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="relative">
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`p-2 bg-purple-50 text-purple-600 rounded-lg`}
                      >
                        <Gem className="w-5 h-5 md:w-6 md:h-6" />
                      </div>
                      <label className="text-sm font-medium text-gray-700">
                        Wallet Gems
                      </label>
                    </div>
                    <input
                      type="number"
                      value={form.wallet_gems === 0 ? "" : form.wallet_gems}
                      onChange={(e) =>
                        handleUpdate(
                          ["wallet_gems"],
                          e.target.value === ""
                            ? 0
                            : parseInt(e.target.value) || 0
                        )
                      }
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm md:text-base pl-10 md:pl-12"
                      min="0"
                      placeholder="0"
                    />
                    <div
                      className={`absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-purple-600 opacity-70`}
                    >
                      <Gem className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="relative">
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`p-2 bg-green-50 text-green-600 rounded-lg`}
                      >
                        <DollarSign className="w-5 h-5 md:w-6 md:h-6" />
                      </div>
                      <label className="text-sm font-medium text-gray-700">
                        Wallet Dollars
                      </label>
                    </div>
                    <input
                      type="number"
                      value={
                        form.wallet_dollars === 0 ? "" : form.wallet_dollars
                      }
                      onChange={(e) =>
                        handleUpdate(
                          ["wallet_dollars"],
                          e.target.value === ""
                            ? 0
                            : parseFloat(e.target.value) || 0
                        )
                      }
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm md:text-base pl-10 md:pl-12"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                    />
                    <div
                      className={`absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-green-600 opacity-70`}
                    >
                      <DollarSign className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* WALLETS TAB */}
          {activeTab === "wallets" && (
            <div className="space-y-4 md:space-y-6">
              <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 md:mb-6">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900">
                    Wallets
                  </h3>
                  <span className="text-sm text-gray-500">
                    {form.wallets?.length || 0} wallet(s)
                  </span>
                </div>

                {form.wallets && form.wallets.length > 0 ? (
                  <div className="space-y-3 md:space-y-4">
                    {form.wallets.map((wallet, index) => (
                      <div
                        key={wallet.id || index}
                        className="border border-gray-200 rounded-xl p-4 md:p-5 hover:border-blue-300 transition"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3 md:mb-4">
                          <h4 className="font-bold text-base md:text-lg text-gray-900">
                            {wallet.type || `Wallet ${index + 1}`}
                          </h4>
                          <span className="text-xs md:text-sm text-gray-500">
                            ID: {wallet.id || "N/A"}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                              Coins
                            </label>
                            <input
                              type="number"
                              value={wallet.coins === 0 ? "" : wallet.coins}
                              onChange={(e) =>
                                handleArrayUpdate(
                                  "wallets",
                                  index,
                                  "coins",
                                  e.target.value === ""
                                    ? 0
                                    : parseInt(e.target.value) || 0
                                )
                              }
                              className="w-full px-3 md:px-4 py-2 md:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm md:text-base"
                              min="0"
                              placeholder="0"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                              Gems
                            </label>
                            <input
                              type="number"
                              value={wallet.gems === 0 ? "" : wallet.gems}
                              onChange={(e) =>
                                handleArrayUpdate(
                                  "wallets",
                                  index,
                                  "gems",
                                  e.target.value === ""
                                    ? 0
                                    : parseInt(e.target.value) || 0
                                )
                              }
                              className="w-full px-3 md:px-4 py-2 md:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm md:text-base"
                              min="0"
                              placeholder="0"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                              Dollars
                            </label>
                            <input
                              type="number"
                              value={wallet.dollars === 0 ? "" : wallet.dollars}
                              onChange={(e) =>
                                handleArrayUpdate(
                                  "wallets",
                                  index,
                                  "dollars",
                                  e.target.value === ""
                                    ? 0
                                    : parseFloat(e.target.value) || 0
                                )
                              }
                              className="w-full px-3 md:px-4 py-2 md:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm md:text-base"
                              min="0"
                              step="0.01"
                              placeholder="0.00"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 md:py-12">
                    <Wallet className="w-12 h-12 md:w-16 md:h-16 text-gray-300 mx-auto mb-3 md:mb-4" />
                    <h4 className="text-base md:text-lg font-medium text-gray-700 mb-1.5 md:mb-2">
                      No Wallets Found
                    </h4>
                    <p className="text-gray-500 text-sm md:text-base">
                      This user doesn't have any wallets yet.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* FRIENDS TAB */}
          {activeTab === "friends" && (
            <div className="space-y-4 md:space-y-6">
              <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 md:mb-6">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900">
                    Friends & Referrals
                  </h3>
                  <div className="text-right">
                    <div className="text-xl md:text-2xl font-bold text-gray-900">
                      {form.friends_count || 0}
                    </div>
                    <div className="text-xs md:text-sm text-gray-500">
                      Total Friends
                    </div>
                  </div>
                </div>

                {form.friends && form.friends.length > 0 ? (
                  <div className="space-y-3 md:space-y-4">
                    {form.friends.map((friend, index) => (
                      <div
                        key={friend.id}
                        className="border border-gray-200 rounded-xl p-4 md:p-5 hover:border-blue-300 transition"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3 md:mb-4">
                          <div>
                            <h4 className="font-bold text-base md:text-lg text-gray-900">
                              @{friend.username}
                            </h4>
                            <p className="text-xs md:text-sm text-gray-500">
                              Telegram ID: {friend.telegram_id}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              Joined{" "}
                              {new Date(friend.joined_at).toLocaleDateString()}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-2 items-center">
                            <span
                              className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium ${
                                friend.status === "accepted"
                                  ? "bg-green-100 text-green-800"
                                  : friend.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {friend.status}
                            </span>

                            <label className="flex items-center gap-1.5 md:gap-2">
                              <input
                                type="checkbox"
                                checked={friend.reward_claimed || false}
                                onChange={(e) =>
                                  handleArrayUpdate(
                                    "friends",
                                    index,
                                    "reward_claimed",
                                    e.target.checked
                                  )
                                }
                                className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-600 rounded focus:ring-blue-500"
                              />
                              <span className="text-xs md:text-sm font-medium">
                                Reward Claimed
                              </span>
                            </label>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                              Status
                            </label>
                            <select
                              value={friend.status}
                              onChange={(e) =>
                                handleArrayUpdate(
                                  "friends",
                                  index,
                                  "status",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 md:px-4 py-2 md:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm md:text-base"
                            >
                              <option value="pending">Pending</option>
                              <option value="accepted">Accepted</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                              Friend ID
                            </label>
                            <input
                              type="text"
                              value={friend.friend_id || ""}
                              onChange={(e) =>
                                handleArrayUpdate(
                                  "friends",
                                  index,
                                  "friend_id",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 md:px-4 py-2 md:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm md:text-base"
                              placeholder="Friend ID"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 md:py-12">
                    <Users className="w-12 h-12 md:w-16 md:h-16 text-gray-300 mx-auto mb-3 md:mb-4" />
                    <h4 className="text-base md:text-lg font-medium text-gray-700 mb-1.5 md:mb-2">
                      No Friends Found
                    </h4>
                    <p className="text-gray-500 text-sm md:text-base">
                      This user hasn't added any friends yet.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* PROMOTIONS TAB */}
          {activeTab === "promotions" && (
            <div className="space-y-4 md:space-y-6">
              <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 md:mb-6">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900">
                    Promotions
                  </h3>
                  <div className="text-right">
                    <div className="text-xl md:text-2xl font-bold text-gray-900">
                      {form.promotions_completed || 0}
                    </div>
                    <div className="text-xs md:text-sm text-gray-500">
                      Completed
                    </div>
                  </div>
                </div>

                {form.promotions && form.promotions.length > 0 ? (
                  <div className="space-y-3 md:space-y-4">
                    {form.promotions.map((promo, index) => (
                      <div
                        key={promo.id || index}
                        className="border border-gray-200 rounded-xl p-4 md:p-5 hover:border-blue-300 transition"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3 md:mb-4">
                          <div>
                            <h4 className="font-bold text-base md:text-lg text-gray-900">
                              {promo.title || `Promotion ${index + 1}`}
                            </h4>
                            {promo.description && (
                              <p className="text-xs md:text-sm text-gray-600 mt-1 line-clamp-2">
                                {promo.description}
                              </p>
                            )}
                          </div>

                          <span
                            className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium ${
                              promo.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : promo.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {promo.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                              Status
                            </label>
                            <select
                              value={promo.status || "pending"}
                              onChange={(e) =>
                                handleArrayUpdate(
                                  "promotions",
                                  index,
                                  "status",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 md:px-4 py-2 md:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm md:text-base"
                            >
                              <option value="pending">Pending</option>
                              <option value="completed">Completed</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5 md:mb-2">
                              Reward
                            </label>
                            <input
                              type="text"
                              value={promo.reward || ""}
                              onChange={(e) =>
                                handleArrayUpdate(
                                  "promotions",
                                  index,
                                  "reward",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 md:px-4 py-2 md:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm md:text-base"
                              placeholder="Enter reward..."
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 md:py-12">
                    <Award className="w-12 h-12 md:w-16 md:h-16 text-gray-300 mx-auto mb-3 md:mb-4" />
                    <h4 className="text-base md:text-lg font-medium text-gray-700 mb-1.5 md:mb-2">
                      No Promotions Found
                    </h4>
                    <p className="text-gray-500 text-sm md:text-base">
                      This user hasn't participated in any promotions yet.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STATISTICS TAB */}
          {activeTab === "statistics" && (
            <div className="space-y-4 md:space-y-6">
              <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 md:mb-6">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900">
                      User Statistics
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Edit user activity statistics
                    </p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      Performance Metrics
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {/* Tasks Done */}
                  <div className="border border-blue-200 rounded-xl p-4 md:p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`p-2 bg-blue-50 text-blue-600 rounded-lg`}
                      >
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <label className="font-medium text-gray-700 text-sm md:text-base">
                        Tasks Done
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type="number"
                        value={
                          form.total_tasks_done === 0
                            ? ""
                            : form.total_tasks_done
                        }
                        onChange={(e) =>
                          handleUpdate(
                            ["total_tasks_done"],
                            e.target.value === ""
                              ? 0
                              : parseInt(e.target.value) || 0
                          )
                        }
                        className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm md:text-base pl-10"
                        min="0"
                        placeholder="0"
                      />
                      <div
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600`}
                      >
                        <CheckCircle className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  {/* Videos Watched */}
                  <div className="border border-green-200 rounded-xl p-4 md:p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`p-2 bg-green-50 text-green-600 rounded-lg`}
                      >
                        <PlayCircle className="w-5 h-5" />
                      </div>
                      <label className="font-medium text-gray-700 text-sm md:text-base">
                        Videos Watched
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type="number"
                        value={
                          form.total_videos_watched === 0
                            ? ""
                            : form.total_videos_watched
                        }
                        onChange={(e) =>
                          handleUpdate(
                            ["total_videos_watched"],
                            e.target.value === ""
                              ? 0
                              : parseInt(e.target.value) || 0
                          )
                        }
                        className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm md:text-base pl-10"
                        min="0"
                        placeholder="0"
                      />
                      <div
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600`}
                      >
                        <PlayCircle className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  {/* Ads Watched */}
                  <div className="border border-purple-200 rounded-xl p-4 md:p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`p-2 bg-purple-50 text-purple-600 rounded-lg`}
                      >
                        <Zap className="w-5 h-5" />
                      </div>
                      <label className="font-medium text-gray-700 text-sm md:text-base">
                        Ads Watched
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type="number"
                        value={
                          form.total_ads_watched === 0
                            ? ""
                            : form.total_ads_watched
                        }
                        onChange={(e) =>
                          handleUpdate(
                            ["total_ads_watched"],
                            e.target.value === ""
                              ? 0
                              : parseInt(e.target.value) || 0
                          )
                        }
                        className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm md:text-base pl-10"
                        min="0"
                        placeholder="0"
                      />
                      <div
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-600`}
                      >
                        <Zap className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  {/* Apps Installed */}
                  <div className="border border-orange-200 rounded-xl p-4 md:p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`p-2 bg-orange-50 text-orange-600 rounded-lg`}
                      >
                        <ShoppingBag className="w-5 h-5" />
                      </div>
                      <label className="font-medium text-gray-700 text-sm md:text-base">
                        Apps Installed
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type="number"
                        value={
                          form.total_apps_installed === 0
                            ? ""
                            : form.total_apps_installed
                        }
                        onChange={(e) =>
                          handleUpdate(
                            ["total_apps_installed"],
                            e.target.value === ""
                              ? 0
                              : parseInt(e.target.value) || 0
                          )
                        }
                        className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm md:text-base pl-10"
                        min="0"
                        placeholder="0"
                      />
                      <div
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-600`}
                      >
                        <ShoppingBag className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  {/* Posts Shared */}
                  <div className="border border-red-200 rounded-xl p-4 md:p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 bg-red-50 text-red-600 rounded-lg`}>
                        <Share2 className="w-5 h-5" />
                      </div>
                      <label className="font-medium text-gray-700 text-sm md:text-base">
                        Posts Shared
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type="number"
                        value={
                          form.total_post_shared === 0
                            ? ""
                            : form.total_post_shared
                        }
                        onChange={(e) =>
                          handleUpdate(
                            ["total_post_shared"],
                            e.target.value === ""
                              ? 0
                              : parseInt(e.target.value) || 0
                          )
                        }
                        className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm md:text-base pl-10"
                        min="0"
                        placeholder="0"
                      />
                      <div
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-red-600`}
                      >
                        <Share2 className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  {/* Comments */}
                  <div className="border border-indigo-200 rounded-xl p-4 md:p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`p-2 bg-indigo-50 text-indigo-600 rounded-lg`}
                      >
                        <MessageCircle className="w-5 h-5" />
                      </div>
                      <label className="font-medium text-gray-700 text-sm md:text-base">
                        Comments
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type="number"
                        value={
                          form.total_comments === 0 ? "" : form.total_comments
                        }
                        onChange={(e) =>
                          handleUpdate(
                            ["total_comments"],
                            e.target.value === ""
                              ? 0
                              : parseInt(e.target.value) || 0
                          )
                        }
                        className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm md:text-base pl-10"
                        min="0"
                        placeholder="0"
                      />
                      <div
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-600`}
                      >
                        <MessageCircle className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  {/* Daily Bonus Claims */}
                  <div className="border border-yellow-200 rounded-xl p-4 md:p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`p-2 bg-yellow-50 text-yellow-600 rounded-lg`}
                      >
                        <Package className="w-5 h-5" />
                      </div>
                      <label className="font-medium text-gray-700 text-sm md:text-base">
                        Daily Bonus Claims
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type="number"
                        value={
                          form.daily_bonus_claims === 0
                            ? ""
                            : form.daily_bonus_claims
                        }
                        onChange={(e) =>
                          handleUpdate(
                            ["daily_bonus_claims"],
                            e.target.value === ""
                              ? 0
                              : parseInt(e.target.value) || 0
                          )
                        }
                        className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm md:text-base pl-10"
                        min="0"
                        placeholder="0"
                      />
                      <div
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-600`}
                      >
                        <Package className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  {/* Promotions Completed */}
                  <div className="border border-teal-200 rounded-xl p-4 md:p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`p-2 bg-teal-50 text-teal-600 rounded-lg`}
                      >
                        <Award className="w-5 h-5" />
                      </div>
                      <label className="font-medium text-gray-700 text-sm md:text-base">
                        Promotions Completed
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type="number"
                        value={
                          form.promotions_completed === 0
                            ? ""
                            : form.promotions_completed
                        }
                        onChange={(e) =>
                          handleUpdate(
                            ["promotions_completed"],
                            e.target.value === ""
                              ? 0
                              : parseInt(e.target.value) || 0
                          )
                        }
                        className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm md:text-base pl-10"
                        min="0"
                        placeholder="0"
                      />
                      <div
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-600`}
                      >
                        <Award className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Daily Bonus History Section */}
                <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-200">
                  <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">
                    Daily Bonus History
                  </h4>
                  {form.daily_bonus_history &&
                  form.daily_bonus_history.length > 0 ? (
                    <div className="space-y-2">
                      {form.daily_bonus_history.map((bonus, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                              <Package className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="font-medium text-sm text-gray-900">
                                {bonus.date
                                  ? new Date(bonus.date).toLocaleDateString()
                                  : "Unknown Date"}
                              </p>
                              <p className="text-xs text-gray-500">
                                Bonus: {bonus.amount || 0} coins
                              </p>
                            </div>
                          </div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              bonus.claimed
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {bonus.claimed ? "Claimed" : "Pending"}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 md:py-8 bg-gray-50 rounded-lg">
                      <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-600">
                        No daily bonus history available
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditUser;
