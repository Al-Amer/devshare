import { useState } from 'react';
import { Search, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import CategoryButtons from '../components/CategoryButtons';
import { CATEGORIES, VIDEOS_BY_CATEGORY, ALL_VIDEOS } from '../data/videosData';
import type { YouTubeVideo } from '../types';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Get videos based on category or search
  const getDisplayedVideos = (): YouTubeVideo[] => {
    let videos = selectedCategory 
      ? VIDEOS_BY_CATEGORY[selectedCategory] || []
      : ALL_VIDEOS;
    
    if (searchTerm.trim()) {
      videos = videos.filter(video =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.channelTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return videos;
  };
  
  const displayedVideos = getDisplayedVideos();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by getDisplayedVideos
  };
  
  const handleCategorySelect = (categoryName: string | null) => {
    setSelectedCategory(categoryName);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Discover Dev Tutorials & More
        </h1>
        
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search videos..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
            >
              <Search size={20} />
              Search
            </button>
          </div>
        </form>
        
        {/* Category Buttons */}
        <CategoryButtons
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />
        
        {/* Category Title */}
        {selectedCategory && (
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {CATEGORIES.find(c => c.name === selectedCategory)?.icon} {selectedCategory}
            </h2>
            <p className="text-gray-600">Showing {VIDEOS_BY_CATEGORY[selectedCategory]?.length || 0} videos in this category</p>
          </div>
        )}
        
        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedVideos.map((video) => (
            <Link
              key={video.id}
              to={`/video/${video.id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-transform transform hover:-translate-y-1"
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  // Fallback image if thumbnail fails to load
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/320x180?text=Video';
                }}
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                  {video.title}
                </h3>
                <p className="text-gray-600 text-sm">{video.channelTitle}</p>
                {video.category && (
                  <div className="mt-2">
                    <span className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      <span>{CATEGORIES.find(c => c.name === video.category)?.icon}</span>
                      <span>{video.category}</span>
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-1 mt-3 text-purple-600">
                  <PlayCircle size={16} />
                  <span className="text-sm">Watch now</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Empty State */}
        {displayedVideos.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <PlayCircle size={48} className="mx-auto mb-4 opacity-50" />
            <p>No videos found. Try a different search or category!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;