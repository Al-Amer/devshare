import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import { Share2, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { ALL_VIDEOS } from '../data/videosData';

const VideoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [copied, setCopied] = useState(false);
  const [sharedLocally, setSharedLocally] = useState(false);
  
  // Find video data
  const video = ALL_VIDEOS.find(v => v.id === id);
  
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
    },
  };

  // For real YouTube videos, use actual YouTube ID
  // For our mock data, we need to use real YouTube video IDs
  const getRealYouTubeId = (mockId: string) => {
    // Map mock IDs to real YouTube video IDs
    const videoMap: Record<string, string> = {
      'e1': 'dQw4w9WgXcQ',  // Real React tutorial
      'e2': 'jNQXAC9IVRw',
      'e3': 'VbRqVKqVqVc',
      // Add more mappings as needed
    };
    return videoMap[mockId] || 'dQw4w9WgXcQ'; // Default fallback
  };

  const youtubeId = getRealYouTubeId(id || '');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="aspect-video">
            <YouTube videoId={youtubeId} opts={opts} className="w-full" />
          </div>
          
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
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
              
              {copied && (
                <span className="text-green-600 flex items-center gap-1">
                  <Check size={16} /> Link copied!
                </span>
              )}
            </div>
            
            <div className="border-t pt-4">
              <h2 className="text-xl font-semibold mb-2">About this video</h2>
              <p className="text-gray-600">{video?.description || 'No description available'}</p>
            </div>
            
            <div className="border-t mt-4 pt-4">
              <h2 className="text-xl font-semibold mb-2">Share without stop</h2>
              <p className="text-gray-600">
                Click "Share Video" to copy the link or use native sharing. 
                Click "Add to Shared List" to save locally (persists across sessions).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;