import { useParams, useLocation } from 'react-router-dom';
import YouTube from 'react-youtube';
import { Share2, Copy, Check, ThumbsUp, Eye, RefreshCw } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { ALL_VIDEOS } from '../data/videosData';
import type { YouTubeVideo } from '../types';

const VideoPage = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [copied, setCopied] = useState(false);
  const [sharedLocally, setSharedLocally] = useState(false);
  const [liked, setLiked] = useState(false);
  const [video, setVideo] = useState<YouTubeVideo | undefined>();
  const [repeatMode, setRepeatMode] = useState(false);
  const [timeLimit, setTimeLimit] = useState<number | null>(null);
  const [timeLimitWarning, setTimeLimitWarning] = useState(false);
  const playerRef = useRef<any>(null);
  const timeLimitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const stateVideo = location.state?.videoData as YouTubeVideo;
    
    if (stateVideo && stateVideo.id === id) {
      setVideo(stateVideo);
    } else {
      const localVideo = ALL_VIDEOS.find(v => v.id === id);
      setVideo(localVideo);
    }
    
    const videoToTrack = video || stateVideo;
    if (videoToTrack && id) {
      const views = JSON.parse(localStorage.getItem('videoViews') || '{}');
      views[id] = (views[id] || 0) + 1;
      localStorage.setItem('videoViews', JSON.stringify(views));
      
      const watchHistory = JSON.parse(localStorage.getItem('watchHistory') || '[]');
      watchHistory.push({
        videoId: id,
        title: videoToTrack.title,
        date: new Date().toISOString().split('T')[0]
      });
      localStorage.setItem('watchHistory', JSON.stringify(watchHistory));      
      
      const likes = JSON.parse(localStorage.getItem('videoLikes') || '{}');
      setLiked(!!likes[id]);
    }
    
    // Cleanup time limit timeout on unmount
    return () => {
      if (timeLimitTimeoutRef.current) {
        clearTimeout(timeLimitTimeoutRef.current);
      }
    };
  }, [id, location.state, video]);

  // Handle time limit when it changes
  useEffect(() => {
    if (timeLimit && playerRef.current) {
      // Clear any existing timeout
      if (timeLimitTimeoutRef.current) {
        clearTimeout(timeLimitTimeoutRef.current);
      }
      
      // Set new timeout
      timeLimitTimeoutRef.current = setTimeout(() => {
        if (playerRef.current) {
          playerRef.current.pauseVideo();
          setTimeLimitWarning(true);
          setTimeout(() => setTimeLimitWarning(false), 3000);
        }
      }, timeLimit * 1000);
    }
    
    return () => {
      if (timeLimitTimeoutRef.current) {
        clearTimeout(timeLimitTimeoutRef.current);
      }
    };
  }, [timeLimit]);

  const handleLike = () => {
    if (!id) return;
    const likes = JSON.parse(localStorage.getItem('videoLikes') || '{}');
    if (liked) {
      delete likes[id];
    } else {
      likes[id] = true;
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

  // YouTube Player Event Handlers
  const onReady = (event: any) => {
    playerRef.current = event.target;
    console.log('YouTube Player Ready');
  };

  const onStateChange = (event: any) => {
    // When video ends (state = 0) and repeat mode is ON
    if (event.data === 0 && repeatMode) {
      event.target.playVideo();
    }
  };

  const onPlay = () => {
    console.log('Video playing');
  };

  const onPause = () => {
    console.log('Video paused');
  };

  const opts = {
    height: '500',
    width: '100%',
    playerVars: {
      autoplay: 0,
      rel: 0,
      modestbranding: 1,
    },
  };

  const getViewCount = () => {
    if (!id) return 0;
    const views = JSON.parse(localStorage.getItem('videoViews') || '{}');
    return views[id] || 0;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="aspect-video relative">
            <YouTube 
              videoId={id} 
              opts={opts} 
              className="w-full"
              onReady={onReady}
              onStateChange={onStateChange}
              onPlay={onPlay}
              onPause={onPause}
            />
            
            {/* Time Limit Warning Overlay */}
            {timeLimitWarning && (
              <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg animate-pulse">
                ⏰ Time limit reached! Video paused.
              </div>
            )}
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
              
              {/* Repeat Mode Button */}
              <button
                onClick={() => setRepeatMode(!repeatMode)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  repeatMode 
                    ? 'bg-orange-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                <RefreshCw size={18} />
                {repeatMode ? 'Repeat ON' : 'Repeat OFF'}
              </button>

              {/* Time Limit Dropdown */}
              <select
                onChange={(e) => setTimeLimit(e.target.value ? parseInt(e.target.value) : null)}
                className="px-4 py-2 rounded-lg border dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                value={timeLimit || ''}
              >
                <option value="">No time limit</option>
                <option value="30">30 seconds</option>
                <option value="60">1 minute</option>
                <option value="120">2 minutes</option>
                <option value="300">5 minutes</option>
                <option value="600">10 minutes</option>
              </select>
              
              {/* Like Button */}
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

            {/* Features Info Box */}
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">🎮 Video Controls</h3>
              <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <p>🔄 <strong>Repeat Mode:</strong> Video will automatically replay when it ends</p>
                <p>⏰ <strong>Time Limit:</strong> Video will automatically pause after selected time</p>
                <p>❤️ <strong>Like:</strong> Save videos to your favorites</p>
                <p>📤 <strong>Share:</strong> Copy video link to clipboard</p>
              </div>
            </div>
            
            <div className="border-t dark:border-gray-700 pt-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                  <Eye size={16} />
                  <span className="text-sm">
                    {getViewCount()} views
                  </span>
                </div>
                {repeatMode && (
                  <div className="flex items-center gap-1 text-orange-600">
                    <RefreshCw size={14} />
                    <span className="text-sm">Repeat mode active</span>
                  </div>
                )}
                {timeLimit && (
                  <div className="flex items-center gap-1 text-blue-600">
                    <span className="text-sm">⏰ {timeLimit} second limit</span>
                  </div>
                )}
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