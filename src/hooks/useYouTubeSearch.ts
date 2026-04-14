import { useState } from 'react';
import axios from 'axios';
import type { YouTubeVideo } from '../types';


const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export const useYouTubeSearch = () => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchYouTube = async (query: string) => {
    if (!query.trim()) {
      setVideos([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Call YouTube API
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search`,
        {
          params: {
            part: 'snippet',
            maxResults: 20,
            q: query,
            type: 'video',
            key: YOUTUBE_API_KEY
          }
        }
      );

      const searchResults: YouTubeVideo[] = response.data.items.map((item: any) => ({
        id: item.id.videoId,           // YouTube video ID
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
        channelTitle: item.snippet.channelTitle,
        description: item.snippet.description,
        category: 'Search Results'
      }));

      setVideos(searchResults);
      
      localStorage.setItem('searchResults', JSON.stringify(searchResults));
      
    } catch (err: any) {
      console.error('YouTube API Error:', err);
      setError('Failed to search videos. Please check your API key.');
    } finally {
      setLoading(false);
    }
  };

  return { videos, loading, error, searchYouTube };
};