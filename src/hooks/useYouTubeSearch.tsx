import { useState } from 'react';
import type { YouTubeVideo } from '../types';

// You can add as many videos as you want here - 100% free!
const MOCK_VIDEOS: YouTubeVideo[] = [
  {
    id: 'dQw4w9WgXcQ',
    title: 'React Tutorial for Beginners 2024',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
    channelTitle: 'React Mastery',
    description: 'Learn React hooks, components, and state management'
  },
  {
    id: 'jNQXAC9IVRw',
    title: 'TypeScript Crash Course - Learn in 1 Hour',
    thumbnail: 'https://img.youtube.com/vi/jNQXAC9IVRw/mqdefault.jpg',
    channelTitle: 'TypeScript Academy',
    description: 'Complete TypeScript tutorial for beginners'
  },
  {
    id: 'VbRqVKqVqVc',
    title: 'Tailwind CSS Full Course 2024',
    thumbnail: 'https://img.youtube.com/vi/VbRqVKqVqVc/mqdefault.jpg',
    channelTitle: 'Tailwind CSS Pro',
    description: 'Master Tailwind CSS with real projects'
  },
  {
    id: '2SWxLhRkYwA',
    title: 'Next.js 14 Full Tutorial',
    thumbnail: 'https://img.youtube.com/vi/2SWxLhRkYwA/mqdefault.jpg',
    channelTitle: 'Next.js Official',
    description: 'Build full-stack apps with Next.js'
  },
  {
    id: '0pYp0n8lL5w',
    title: 'Node.js API Development',
    thumbnail: 'https://img.youtube.com/vi/0pYp0n8lL5w/mqdefault.jpg',
    channelTitle: 'Node University',
    description: 'Create REST APIs with Node.js and Express'
  },
  {
    id: '7q5FqVqVqVc',
    title: 'Python Django Tutorial',
    thumbnail: 'https://img.youtube.com/vi/7q5FqVqVqVc/mqdefault.jpg',
    channelTitle: 'Python Mastery',
    description: 'Build web apps with Django'
  }
];

export const useYouTubeSearch = () => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchVideos = async (query: string) => {
    if (!query.trim()) {
      setVideos(MOCK_VIDEOS);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    // Simulate network delay for realistic feel
    setTimeout(() => {
      const filtered = MOCK_VIDEOS.filter(video => 
        video.title.toLowerCase().includes(query.toLowerCase()) ||
        video.channelTitle.toLowerCase().includes(query.toLowerCase())
      );
      
      setVideos(filtered);
      setLoading(false);
      
      if (filtered.length === 0) {
        setError('No videos found. Try a different search term.');
      }
    }, 500);
  };
  
  return { videos, loading, error, searchVideos };
};