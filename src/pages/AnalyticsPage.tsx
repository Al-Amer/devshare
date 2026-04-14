import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Eye, ThumbsUp, Clock, TrendingUp, Calendar } from 'lucide-react';
import { ALL_VIDEOS, CATEGORIES } from '../data/videosData';

const AnalyticsPage = () => {
  const [analyticsData, setAnalyticsData] = useState({
    totalViews: 0,
    totalLikes: 0,
    watchTime: 0,
    mostViewedCategory: '',
    dailyViews: [] as any[],
    categoryDistribution: [] as any[],
    popularVideos: [] as any[]
  });

  useEffect(() => {
    // Load analytics from localStorage or generate demo data
    const views = JSON.parse(localStorage.getItem('videoViews') || '{}');
    const likes = JSON.parse(localStorage.getItem('videoLikes') || '{}');
    const watchHistory = JSON.parse(localStorage.getItem('watchHistory') || '[]');

    // Calculate category views
    const categoryViews: Record<string, number> = {};
    ALL_VIDEOS.forEach(video => {
      const category = video.category || 'Other';
      categoryViews[category] = (categoryViews[category] || 0) + (views[video.id] || 0);
    });

    // Find most viewed category
    let maxViews = 0;
    let mostViewedCategory = '';
    Object.entries(categoryViews).forEach(([cat, count]) => {
      if (count > maxViews) {
        maxViews = count;
        mostViewedCategory = cat;
      }
    });

    // Prepare category distribution for pie chart
    const categoryDistribution = Object.entries(categoryViews).map(([name, value]) => ({
      name,
      value,
      icon: CATEGORIES.find(c => c.name === name)?.icon || '📹'
    }));

    // Prepare daily views (last 7 days)
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    const dailyViews = last7Days.map(date => ({
      date,
      views: watchHistory.filter((h: any) => h.date === date).length
    }));

    // Get popular videos
    const popularVideos = ALL_VIDEOS
      .map(video => ({
        ...video,
        views: views[video.id] || 0,
        likes: likes[video.id] || 0
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);

    // Calculate totals with proper typing
    const viewsValues = Object.values(views) as number[];
    const likesValues = Object.values(likes) as number[];
    
    setAnalyticsData({
      totalViews: viewsValues.reduce((a, b) => a + b, 0),
      totalLikes: likesValues.reduce((a, b) => a + b, 0),
      watchTime: watchHistory.length * 5,
      mostViewedCategory,
      dailyViews,
      categoryDistribution,
      popularVideos
    });
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FF6B6B', '#4ECDC4'];

  // Custom label renderer to avoid TypeScript errors
  const renderLabel = (entry: any) => {
    const percent = entry.percent || 0;
    return `${entry.name}: ${(percent * 100).toFixed(0)}%`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 flex items-center gap-2">
          <TrendingUp size={28} /> Analytics Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Total Views</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{analyticsData.totalViews.toLocaleString()}</p>
              </div>
              <Eye size={40} className="text-blue-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Total Likes</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{analyticsData.totalLikes.toLocaleString()}</p>
              </div>
              <ThumbsUp size={40} className="text-green-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Watch Time (min)</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{analyticsData.watchTime.toLocaleString()}</p>
              </div>
              <Clock size={40} className="text-purple-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Top Category</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">
                  {analyticsData.mostViewedCategory || 'None'}
                </p>
              </div>
              <TrendingUp size={40} className="text-orange-500" />
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Daily Views Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <Calendar size={20} /> Daily Views (Last 7 Days)
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData.dailyViews}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="views" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Category Distribution */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Category Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analyticsData.categoryDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {analyticsData.categoryDistribution.map((_entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Popular Videos */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Most Popular Videos</h2>
          <div className="space-y-4">
            {analyticsData.popularVideos.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">No data yet. Watch some videos!</p>
            ) : (
              analyticsData.popularVideos.map((video: any, index: number) => (
                <div key={video.id} className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="text-2xl font-bold text-gray-400 w-10">#{index + 1}</div>
                  <img src={video.thumbnail} alt={video.title} className="w-24 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 dark:text-white">{video.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{video.channelTitle}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Views</p>
                    <p className="font-semibold text-gray-800 dark:text-white">{video.views.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Likes</p>
                    <p className="font-semibold text-gray-800 dark:text-white">{video.likes.toLocaleString()}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;