import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import { Share2, Copy, Check, ThumbsUp, Eye } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ALL_VIDEOS } from '../data/videosData';

const VideoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [copied, setCopied] = useState(false);
  const [sharedLocally, setSharedLocally] = useState(false);
  const [liked, setLiked] = useState(false);
  
  const video = ALL_VIDEOS.find(v => v.id === id);
  
  useEffect(() => {
    if (video) {
      // Track view
      const views = JSON.parse(localStorage.getItem('videoViews') || '{}');
      views[video.id] = (views[video.id] || 0) + 1;
      localStorage.setItem('videoViews', JSON.stringify(views));
      const watchHistory = JSON.parse(localStorage.getItem('watchHistory') || '[]');
      watchHistory.push({
        videoId: video.id,
        title: video.title,
        date: new Date().toISOString().split('T')[0]
      });
      localStorage.setItem('watchHistory', JSON.stringify(watchHistory));
      const likes = JSON.parse(localStorage.getItem('videoLikes') || '{}');
      setLiked(!!likes[video.id]);
    }
  }, [video]);
  
  const handleLike = () => {
    if (!video) return;
    const likes = JSON.parse(localStorage.getItem('videoLikes') || '{}');
    if (liked) {
      delete likes[video.id];
    } else {
      likes[video.id] = true;
    }
    localStorage.setItem('videoLikes', JSON.stringify(likes));
    setLiked(!liked);
  };
  
  const shareVideo = async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: video?.title || 'Check out this video',
          url: url,
        });
        return;
      } catch (err) {
        console.log('Share cancelled');
      }
    }
    
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const addToSharedList = () => {
    const sharedResources = JSON.parse(localStorage.getItem('sharedResources') || '[]');
    const newResource = {
      id: Date.now(),
      videoId: id,
      title: video?.title || 'Shared video',
      sharedAt: new Date(),
    };
    sharedResources.push(newResource);
    localStorage.setItem('sharedResources', JSON.stringify(sharedResources));
    setSharedLocally(true);
    setTimeout(() => setSharedLocally(false), 2000);
  };

  const opts = {
    height: '500',
    width: '100%',
    playerVars: {
      autoplay: 0,
      rel: 0,
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="aspect-video">
            <YouTube videoId={id} opts={opts} className="w-full" />
          </div>
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              {video?.title || 'Video Title'}
            </h1>
            <div className="flex flex-wrap gap-4 mb-6">
              <button
                onClick={shareVideo}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                <Share2 size={18} />
                Share Video
              </button>
              <button
                onClick={addToSharedList}
                className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
              >
                {sharedLocally ? <Check size={18} /> : <Copy size={18} />}
                {sharedLocally ? 'Shared!' : 'Add to Shared List'}
              </button>
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  liked 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                <ThumbsUp size={18} />
                {liked ? 'Liked' : 'Like'}
              </button>
              {copied && (
                <span className="text-green-600 dark:text-green-400 flex items-center gap-1">
                  <Check size={16} /> Link copied!
                </span>
              )}
            </div>
            <div className="border-t dark:border-gray-700 pt-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                  <Eye size={16} />
                  <span className="text-sm">
                    {JSON.parse(localStorage.getItem('videoViews') || '{}')[video?.id || ''] || 0} views
                  </span>
                </div>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">About this video</h2>
              <p className="text-gray-600 dark:text-gray-400">{video?.description || 'No description available'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;