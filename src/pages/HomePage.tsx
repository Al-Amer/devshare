import { useState } from 'react';
import { Search, PlayCircle, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useYouTubeSearch } from '../hooks/useYouTubeSearch';
import CategoryButtons from '../components/CategoryButtons';
import { CATEGORIES, VIDEOS_BY_CATEGORY, ALL_VIDEOS } from '../data/videosData';
import type { YouTubeVideo } from '../types';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<YouTubeVideo[]>([]);
  
  const { searchYouTube, loading, error } = useYouTubeSearch();
  
  // Check if API key exists
  const hasApiKey = !!import.meta.env.VITE_YOUTUBE_API_KEY;

  // Handle search form submission
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    setIsSearching(true);
    await searchYouTube(searchTerm);
    setIsSearching(false);
  };

  // Get videos to display
  const getDisplayedVideos = (): YouTubeVideo[] => {
    // If searching, show search results
    if (isSearching || searchResults.length > 0) {
      return searchResults;
    }
    
    // If category selected, show category videos
    if (selectedCategory) {
      return VIDEOS_BY_CATEGORY[selectedCategory] || [];
    }
    
    // Otherwise show all videos
    return ALL_VIDEOS;
  };
  
  const displayedVideos = getDisplayedVideos();
  const isSearchMode = isSearching || searchResults.length > 0;

  // Clear search results
  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setIsSearching(false);
    setSelectedCategory(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-8">
          Discover Videos on YouTube
        </h1>
        
        {/* Search Bar - This sends query to YouTube */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search YouTube videos... (e.g., React tutorial, JavaScript, Python)"
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : <Search size={20} />}
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>
        
        {/* Show category buttons only when not searching */}
        {!isSearchMode && (
          <>
            <CategoryButtons
              categories={CATEGORIES}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
            
            {selectedCategory && (
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {CATEGORIES.find(c => c.name === selectedCategory)?.icon} {selectedCategory}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">Showing curated videos</p>
              </div>
            )}
          </>
        )}
        
        {/* Search Mode Header */}
        {isSearchMode && (
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              🔍 Search Results for "{searchTerm}"
            </h2>
            <button
              onClick={clearSearch}
              className="mt-2 text-purple-600 hover:text-purple-700 underline"
            >
              ← Back to Categories
            </button>
          </div>
        )}
        
        {/* Error Message */}
        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 text-red-700 dark:text-red-400 px-4 py-3 rounded text-center max-w-2xl mx-auto mb-8">
            {error}
            <p className="text-sm mt-2">
              Don't have an API key? Use the category buttons above to see curated videos!
            </p>
          </div>
        )}
        
        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <Loader2 size={48} className="animate-spin mx-auto text-purple-600 mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Searching YouTube...</p>
          </div>
        )}
        
        {/* Videos Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedVideos.map((video) => (
              <Link
                key={video.id}
                to={`/video/${video.id}`}
                state={{ fromSearch: true, videoData: video }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-transform transform hover:-translate-y-1"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/320x180?text=Video';
                  }}
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-gray-800 dark:text-white">
                    {video.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{video.channelTitle}</p>
                  {video.category && video.category !== 'Search Results' && (
                    <div className="mt-2">
                      <span className="inline-flex items-center gap-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
                        <span>{CATEGORIES.find(c => c.name === video.category)?.icon}</span>
                        <span>{video.category}</span>
                      </span>
                    </div>
                  )}
                  {isSearchMode && (
                    <div className="mt-2">
                      <span className="inline-flex items-center gap-1 text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-2 py-1 rounded-full">
                        📺 YouTube Search
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
        )}
        
        {/* Empty State */}
        {!loading && displayedVideos.length === 0 && !error && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <PlayCircle size={48} className="mx-auto mb-4 opacity-50" />
            <p>No videos found. Try searching for something or select a category!</p>
          </div>
        )}
        
        {/* API Key Info */}
        {!hasApiKey && (
          <div className="mt-8 p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
            <p className="text-yellow-800 dark:text-yellow-200 text-sm text-center">
              💡 Tip: To enable YouTube search, add your API key to .env file as VITE_YOUTUBE_API_KEY=your_key_here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;