import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import type { YouTubeVideo } from '../types';

interface FavoritesContextType {
  favorites: YouTubeVideo[];
  addToFavorites: (video: YouTubeVideo) => void;
  removeFromFavorites: (videoId: string) => void;
  isFavorite: (videoId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used within FavoritesProvider');
  return context;
};

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<YouTubeVideo[]>([]);

  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`favorites_${user.uid}`);
      if (saved) setFavorites(JSON.parse(saved));
    } else {
      setFavorites([]);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`favorites_${user.uid}`, JSON.stringify(favorites));
    }
  }, [favorites, user]);

  const addToFavorites = (video: YouTubeVideo) => {
    if (!favorites.find(v => v.id === video.id)) {
      setFavorites([...favorites, video]);
    }
  };

  const removeFromFavorites = (videoId: string) => {
    setFavorites(favorites.filter(v => v.id !== videoId));
  };

  const isFavorite = (videoId: string) => favorites.some(v => v.id === videoId);

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};