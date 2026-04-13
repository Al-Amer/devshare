import { useState } from 'react';
import axios from 'axios';

interface DailymotionVideo {
  id: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
  description: string;
}

export const useDailymotionSearch = () => {
  const [videos, setVideos] = useState<DailymotionVideo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchVideos = async (query: string) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Dailymotion API - completely free, no API key needed!
      const response = await axios.get(
        `https://api.dailymotion.com/videos?fields=id,title,thumbnail_medium_url,owner.username,description&search=${encodeURIComponent(query)}&limit=20`
      );
      
      const videoList = response.data.list.map((item: any) => ({
        id: item.id,
        title: item.title,
        thumbnail: item.thumbnail_medium_url,
        channelTitle: item.owner.username,
        description: item.description,
      }));
      
      setVideos(videoList);
    } catch (err) {
      setError('Failed to fetch videos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  return { videos, loading, error, searchVideos };
};