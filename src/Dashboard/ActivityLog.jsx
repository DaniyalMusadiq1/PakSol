import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  Filter, 
  Search, 
  ChevronDown, 
  ChevronUp,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  Download,
  RefreshCw,
  Eye,
  User,
  Gift,
  Target,
  Users,
  TrendingUp,
  Wallet
} from 'lucide-react';

const ActivityLog = () => {
  // State management
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [filters, setFilters] = useState({
    activityType: [],
    dateRange: { start: null, end: null },
    searchQuery: ''
  });
  const [users, setUsers] = useState([]);
  const [expandedLog, setExpandedLog] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userFilter, setUserFilter] = useState('');

  // Activity types based on your model
  const activityTypes = [
    { id: 'task_completed', label: 'Task Completed', icon: Target, color: 'bg-blue-100 text-blue-800', badgeColor: 'bg-blue-500' },
    { id: 'daily_bonus_claimed', label: 'Daily Bonus', icon: Gift, color: 'bg-green-100 text-green-800', badgeColor: 'bg-green-500' },
    { id: 'promotion_joined', label: 'Promotion Joined', icon: TrendingUp, color: 'bg-purple-100 text-purple-800', badgeColor: 'bg-purple-500' },
    { id: 'referral_invited', label: 'Referral Invited', icon: Users, color: 'bg-yellow-100 text-yellow-800', badgeColor: 'bg-yellow-500' },
    { id: 'wallet_updated', label: 'Wallet Updated', icon: Wallet, color: 'bg-indigo-100 text-indigo-800', badgeColor: 'bg-indigo-500' }
  ];

  // Fetch activity logs
  useEffect(() => {
    fetchActivityLogs();
  }, []);

  const fetchActivityLogs = async () => {
    try {
      setIsLoading(true);
      
      // In a real app, this would be an API call:
      // const response = await fetch('/api/user-activity-logs');
      // const data = await response.json();
      
      // Mock data based on your model
      const mockLogs = [
        {
          id: 1,
          user_id: 1,
          user: {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
          },
          activity_type: 'task_completed',
          activityable_id: 101,
          activityable_type: 'Task',
          description: 'Completed "Watch Video" task',
          meta: { 
            task_name: 'Watch Video Tutorial',
            reward: 50,
            coins: 50,
            gems: 5,
            task_type: 'video'
          },
          ip_address: '192.168.1.100',
          device_info: 'Chrome/120.0.0.0 on Windows 10',
          created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 2,
          user_id: 2,
          user: {
            id: 2,
            name: 'Jane Smith',
            email: 'jane@example.com'
          },
          activity_type: 'daily_bonus_claimed',
          activityable_id: 202,
          activityable_type: 'DailyBonus',
          description: 'Claimed daily bonus - Day 3',
          meta: { 
            day: 3,
            streak: 3,
            reward: { coins: 100, gems: 10 },
            multiplier: 1.5
          },
          ip_address: '192.168.1.101',
          device_info: 'Safari/17.0 on iPhone',
          created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 3,
          user_id: 1,
          user: {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
          },
          activity_type: 'referral_invited',
          activityable_id: 303,
          activityable_type: 'Friend',
          description: 'Invited friend via email',
          meta: { 
            friend_email: 'friend@example.com',
            friend_name: 'Bob Wilson',
            referral_code: 'REF123',
            bonus: 500
          },
          ip_address: '192.168.1.100',
          device_info: 'Chrome/120.0.0.0 on Windows 10',
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 4,
          user_id: 3,
          user: {
            id: 3,
            name: 'Alice Johnson',
            email: 'alice@example.com',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice'
          },
          activity_type: 'promotion_joined',
          activityable_id: 404,
          activityable_type: 'Promotion',
          description: 'Joined "Welcome Bonus" promotion',
          meta: { 
            promotion_name: 'Welcome Bonus',
            requirements: 'Complete 3 tasks',
            total_reward: 1000,
            progress: '1/3'
          },
          ip_address: '192.168.1.102',
          device_info: 'Firefox/121.0 on MacOS',
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 5,
          user_id: 2,
          user: {
            id: 2,
            name: 'Jane Smith',
            email: 'jane@example.com'
          },
          activity_type: 'wallet_updated',
          activityable_id: 505,
          activityable_type: 'Wallet',
          description: 'Wallet balance updated',
          meta: { 
            transaction_type: 'deposit',
            amount: 2500,
            currency: 'coins',
            previous_balance: 1500,
            new_balance: 4000
          },
          ip_address: '192.168.1.101',
          device_info: 'Safari/17.0 on iPhone',
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 6,
          user_id: 1,
          user: {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
          },
          activity_type: 'task_completed',
          activityable_id: 106,
          activityable_type: 'Task',
          description: 'Completed "Daily Login" task',
          meta: { 
            task_name: 'Daily Login',
            reward: 25,
            coins: 25,
            streak_bonus: 10
          },
          ip_address: '192.168.1.100',
          device_info: 'Chrome/120.0.0.0 on Windows 10',
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
          updated_at: new Date().toISOString()
        }
      ];

      // Extract unique users
      const uniqueUsers = [...new Set(mockLogs.map(log => log.user_id))]
        .map(userId => mockLogs.find(log => log.user_id === userId).user);

      setLogs(mockLogs);
      setFilteredLogs(mockLogs);
      setUsers(uniqueUsers);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching activity logs:', error);
      setIsLoading(false);
    }
  };

  // Apply filters
  useEffect(() => {
    let result = [...logs];

    // Search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(log => 
        log.user?.name?.toLowerCase().includes(query) ||
        log.description?.toLowerCase().includes(query) ||
        log.activity_type?.toLowerCase().includes(query) ||
        log.user?.email?.toLowerCase().includes(query)
      );
    }

    // User filter
    if (userFilter) {
      result = result.filter(log => log.user_id === parseInt(userFilter));
    }

    // Activity type filter
    if (filters.activityType.length > 0) {
      result = result.filter(log => filters.activityType.includes(log.activity_type));
    }

    // Date range filter
    if (filters.dateRange.start && filters.dateRange.end) {
      result = result.filter(log => {
        const logDate = new Date(log.created_at);
        return logDate >= new Date(filters.dateRange.start) && logDate <= new Date(filters.dateRange.end);
      });
    }

    setFilteredLogs(result);
    setCurrentPage(1);
  }, [filters, logs, userFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstItem, indexOfLastItem);

  // Handlers
  const handleActivityTypeChange = (typeId) => {
    setFilters(prev => {
      const current = prev.activityType;
      const newArray = current.includes(typeId)
        ? current.filter(item => item !== typeId)
        : [...current, typeId];
      
      return { ...prev, activityType: newArray };
    });
  };

  const handleSearch = (e) => {
    setFilters(prev => ({ ...prev, searchQuery: e.target.value }));
  };

  const handleDateChange = (type, date) => {
    setFilters(prev => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [type]: date
      }
    }));
  };

  const clearFilters = () => {
    setFilters({
      activityType: [],
      dateRange: { start: null, end: null },
      searchQuery: ''
    });
    setUserFilter('');
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const getActivityIcon = (activityType) => {
    const activity = activityTypes.find(t => t.id === activityType);
    const Icon = activity?.icon || Info;
    return <Icon className="w-4 h-4" />;
  };

  const exportLogs = () => {
    const csv = filteredLogs.map(log => 
      `${log.id},${log.user?.name},${log.activity_type},${log.description},${log.created_at},${log.ip_address}`
    ).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `user-activity-logs-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const getRewardInfo = (meta) => {
    if (!meta) return null;
    
    if (meta.reward) {
      return `${meta.reward} coins`;
    }
    
    if (meta.rewards) {
      return `${meta.rewards.coins || 0} coins, ${meta.rewards.gems || 0} gems`;
    }
    
    if (meta.amount) {
      return `${meta.amount} ${meta.currency || 'coins'}`;
    }
    
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-500 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">User Activity Logs</h1>
              <p className="text-gray-600 mt-2">Track user actions, tasks, bonuses, and promotions</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={exportLogs}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export CSV</span>
              </button>
              <button
                onClick={fetchActivityLogs}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="hidden sm:inline">Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col gap-4">
            {/* Search and filter toggle */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search activities, users, or descriptions..."
                  value={filters.searchQuery}
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-5 h-5" />
                <span>Filters</span>
                {isFilterOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>

            {/* Expanded filters */}
            {isFilterOpen && (
              <div className="border-t pt-4 mt-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* User Filter */}
                  <div>
                    <h3 className="font-medium text-gray-700 mb-3">Filter by User</h3>
                    <select
                      value={userFilter}
                      onChange={(e) => setUserFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">All Users</option>
                      {users.map(user => (
                        <option key={user.id} value={user.id}>
                          {user.name} ({user.email})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Activity Types */}
                  <div>
                    <h3 className="font-medium text-gray-700 mb-3">Activity Types</h3>
                    <div className="space-y-2">
                      {activityTypes.map(type => (
                        <label key={type.id} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filters.activityType.includes(type.id)}
                            onChange={() => handleActivityTypeChange(type.id)}
                            className="rounded text-blue-600 focus:ring-blue-500"
                          />
                          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${type.color}`}>
                            {getActivityIcon(type.id)}
                            <span className="text-sm font-medium">{type.label}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Date Range */}
                  <div>
                    <h3 className="font-medium text-gray-700 mb-3">Date Range</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">From</label>
                        <input
                          type="date"
                          onChange={(e) => handleDateChange('start', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">To</label>
                        <input
                          type="date"
                          onChange={(e) => handleDateChange('end', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Clear filters */}
                <div className="mt-6 pt-4 border-t flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    {filteredLogs.length} of {logs.length} logs shown
                  </div>
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Clear all filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Total Activities</div>
            <div className="text-2xl font-bold text-gray-900">{filteredLogs.length}</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Active Users</div>
            <div className="text-2xl font-bold text-blue-600">
              {new Set(filteredLogs.map(log => log.user_id)).size}
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Tasks Completed</div>
            <div className="text-2xl font-bold text-green-600">
              {filteredLogs.filter(log => log.activity_type === 'task_completed').length}
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Total Rewards</div>
            <div className="text-2xl font-bold text-purple-600">
              {filteredLogs.reduce((total, log) => {
                const reward = getRewardInfo(log.meta);
                if (reward) {
                  const match = reward.match(/\d+/);
                  return total + (match ? parseInt(match[0]) : 0);
                }
                return total;
              }, 0)} coins
            </div>
          </div>
        </div>

        {/* Activity Logs Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Activity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Details
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reward
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentLogs.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                          No activity logs found
                        </td>
                      </tr>
                    ) : (
                      currentLogs.map((log) => {
                        const activityType = activityTypes.find(t => t.id === log.activity_type);
                        const reward = getRewardInfo(log.meta);
                        
                        return (
                          <React.Fragment key={log.id}>
                            <tr className="hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-3">
                                  <div className="flex-shrink-0">
                                    {log.user?.avatar ? (
                                      <img
                                        className="h-8 w-8 rounded-full"
                                        src={log.user.avatar}
                                        alt={log.user.name}
                                      />
                                    ) : (
                                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                                        <User className="w-4 h-4 text-gray-500" />
                                      </div>
                                    )}
                                  </div>
                                  <div>
                                    <div className="font-medium text-gray-900">{log.user?.name}</div>
                                    <div className="text-sm text-gray-500">{log.user?.email}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  <div className={`w-2 h-2 rounded-full ${activityType?.badgeColor || 'bg-gray-400'}`}></div>
                                  <div>
                                    <div className="font-medium text-gray-900 capitalize">
                                      {log.activity_type?.replace(/_/g, ' ')}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {log.activityable_type} #{log.activityable_id}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="max-w-xs">
                                  <div className="text-sm text-gray-900">{log.description}</div>
                                  {log.meta?.task_name && (
                                    <div className="text-xs text-gray-500 mt-1">
                                      Task: {log.meta.task_name}
                                    </div>
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {reward ? (
                                  <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full">
                                    <Gift className="w-3 h-3" />
                                    <span className="text-sm font-medium">{reward}</span>
                                  </div>
                                ) : (
                                  <span className="text-gray-400 text-sm">—</span>
                                )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                  <Calendar className="w-4 h-4" />
                                  <span>{new Date(log.created_at).toLocaleDateString()}</span>
                                  <Clock className="w-4 h-4 ml-2" />
                                  <span>{formatTimeAgo(log.created_at)}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                  onClick={() => setExpandedLog(expandedLog === log.id ? null : log.id)}
                                  className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                                >
                                  <Eye className="w-4 h-4" />
                                  {expandedLog === log.id ? 'Hide' : 'View'}
                                </button>
                              </td>
                            </tr>
                            
                            {/* Expanded details */}
                            {expandedLog === log.id && (
                              <tr>
                                <td colSpan={6} className="px-6 py-4 bg-gray-50 border-t">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                      <h4 className="font-medium text-gray-900 mb-3">Activity Information</h4>
                                      <div className="space-y-3">
                                        <div>
                                          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                                            Activity Type
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <div className={`px-2 py-1 rounded text-xs font-medium ${activityType?.color}`}>
                                              {activityType?.label}
                                            </div>
                                          </div>
                                        </div>
                                        <div>
                                          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                                            Related Model
                                          </div>
                                          <code className="block px-3 py-1.5 bg-gray-100 rounded text-gray-800 text-sm">
                                            {log.activityable_type} (ID: {log.activityable_id})
                                          </code>
                                        </div>
                                        <div>
                                          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                                            Description
                                          </div>
                                          <p className="text-gray-700">{log.description}</p>
                                        </div>
                                      </div>
                                    </div>
                                    <div>
                                      <h4 className="font-medium text-gray-900 mb-3">Technical Details</h4>
                                      <div className="space-y-3">
                                        {log.ip_address && (
                                          <div>
                                            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                                              IP Address
                                            </div>
                                            <code className="block px-3 py-1.5 bg-gray-100 rounded text-gray-800 text-sm">
                                              {log.ip_address}
                                            </code>
                                          </div>
                                        )}
                                        {log.device_info && (
                                          <div>
                                            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                                              Device Info
                                            </div>
                                            <code className="block px-3 py-1.5 bg-gray-100 rounded text-gray-800 text-sm">
                                              {log.device_info}
                                            </code>
                                          </div>
                                        )}
                                        {log.meta && Object.keys(log.meta).length > 0 && (
                                          <div>
                                            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                                              Metadata
                                            </div>
                                            <pre className="block px-3 py-1.5 bg-gray-100 rounded text-gray-800 text-sm overflow-x-auto">
                                              {JSON.stringify(log.meta, null, 2)}
                                            </pre>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                    <span className="font-medium">
                      {Math.min(indexOfLastItem, filteredLogs.length)}
                    </span>{' '}
                    of <span className="font-medium">{filteredLogs.length}</span> activities
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1.5 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Previous
                    </button>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }

                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-8 h-8 rounded-lg ${currentPage === pageNum
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-700 hover:bg-gray-100'
                              }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1.5 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Legend */}
        <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <h4 className="font-medium text-gray-900 mb-3">Activity Types Legend</h4>
          <div className="flex flex-wrap gap-3">
            {activityTypes.map(type => (
              <div key={type.id} className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${type.badgeColor}`}></div>
                <span className="text-sm text-gray-700">{type.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityLog;