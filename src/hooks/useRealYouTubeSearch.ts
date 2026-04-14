import { useState } from 'react';
import axios from 'axios';
import type { YouTubeVideo } from '../types';

const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY;

export const useRealYouTubeSearch = () => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchVideos = async (query: string) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get('https://youtube-search6.p.rapidapi.com/search/', {
        params: {
          query: query,
          max_results: '20'
        },
        headers: {
          'X-RapidAPI-Key': RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'youtube-search6.p.rapidapi.com'
        }
      });
      
      const items = response.data.results;
      const videoList: YouTubeVideo[] = items.map((item: any) => ({
        id: item.id,
        title: item.title,
        thumbnail: item.thumbnail_url,
        channelTitle: item.channel_name,
        description: item.description,
      }));
      
      setVideos(videoList);
    } catch (err) {
      setError('Failed to fetch videos. Check your API key.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  return { videos, loading, error, searchVideos };
};