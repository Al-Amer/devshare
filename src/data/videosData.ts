import type { YouTubeVideo } from '../types';

// Each category has exactly 3 videos
export const CATEGORIES = [
  { name: 'IT', icon: '💻', color: 'bg-blue-500' },
  { name: 'AI', icon: '🤖', color: 'bg-purple-500' },
  { name: 'React', icon: '⚛️', color: 'bg-cyan-500' },
  { name: 'Python', icon: '🐍', color: 'bg-green-500' },
  { name: 'JavaScript', icon: '🟡', color: 'bg-yellow-500' },
  { name: 'Java', icon: '☕', color: 'bg-red-500' },
  { name: 'Jazz Music', icon: '🎷', color: 'bg-indigo-500' },
  { name: 'Game', icon: '🎮', color: 'bg-pink-500' },
  { name: 'Football', icon: '⚽', color: 'bg-emerald-500' },
  { name: 'Basketball', icon: '🏀', color: 'bg-orange-500' },
];

// Videos organized by category - each category has 3 videos
export const VIDEOS_BY_CATEGORY: Record<string, YouTubeVideo[]> = {
  'IT': [
    {
      id: 'IT1',
      title: 'IT Support Fundamentals',
      thumbnail: 'https://img.youtube.com/vi/IT1/mqdefault.jpg',
      channelTitle: 'IT Career Hub',
      description: 'Learn IT basics for beginners',
      category: 'IT'
    },
    {
      id: 'IT2',
      title: 'Cloud Computing Explained',
      thumbnail: 'https://img.youtube.com/vi/IT2/mqdefault.jpg',
      channelTitle: 'Cloud Masters',
      description: 'AWS, Azure, GCP introduction',
      category: 'IT'
    },
    {
      id: 'IT3',
      title: 'Cybersecurity 101',
      thumbnail: 'https://img.youtube.com/vi/IT3/mqdefault.jpg',
      channelTitle: 'Cyber Security',
      description: 'Protect your systems',
      category: 'IT'
    }
  ],
  'AI': [
    {
      id: 'AI1',
      title: 'AI for Beginners',
      thumbnail: 'https://img.youtube.com/vi/AI1/mqdefault.jpg',
      channelTitle: 'AI Academy',
      description: 'Introduction to Artificial Intelligence',
      category: 'AI'
    },
    {
      id: 'AI2',
      title: 'Machine Learning Crash Course',
      thumbnail: 'https://img.youtube.com/vi/AI2/mqdefault.jpg',
      channelTitle: 'ML Explained',
      description: 'Learn ML in 1 hour',
      category: 'AI'
    },
    {
      id: 'AI3',
      title: 'ChatGPT Tutorial',
      thumbnail: 'https://img.youtube.com/vi/AI3/mqdefault.jpg',
      channelTitle: 'AI Tools',
      description: 'Master prompt engineering',
      category: 'AI'
    }
  ],
  'React': [
    {
      id: 'e1',
      title: 'React Tutorial for Beginners',
      thumbnail: 'https://img.youtube.com/vi/e1/mqdefault.jpg',
      channelTitle: 'React Mastery',
      description: 'Learn React hooks and components',
      category: 'React'
    },
    {
      id: 'e2',
      title: 'React Hooks Deep Dive',
      thumbnail: 'https://img.youtube.com/vi/e2/mqdefault.jpg',
      channelTitle: 'React Explained',
      description: 'useState, useEffect, useContext',
      category: 'React'
    },
    {
      id: 'e3',
      title: 'React Router Complete Guide',
      thumbnail: 'https://img.youtube.com/vi/e3/mqdefault.jpg',
      channelTitle: 'React Pro',
      description: 'Navigation in React apps',
      category: 'React'
    }
  ],
  'Python': [
    {
      id: 'p1',
      title: 'Python for Beginners',
      thumbnail: 'https://img.youtube.com/vi/p1/mqdefault.jpg',
      channelTitle: 'Python Mastery',
      description: 'Learn Python in 1 hour',
      category: 'Python'
    },
    {
      id: 'p2',
      title: 'Python Data Science',
      thumbnail: 'https://img.youtube.com/vi/p2/mqdefault.jpg',
      channelTitle: 'Data Science Hub',
      description: 'Pandas, NumPy tutorial',
      category: 'Python'
    },
    {
      id: 'p3',
      title: 'Django Web Framework',
      thumbnail: 'https://img.youtube.com/vi/p3/mqdefault.jpg',
      channelTitle: 'Django Pro',
      description: 'Build web apps with Python',
      category: 'Python'
    }
  ],
  'JavaScript': [
    {
      id: 'js1',
      title: 'JavaScript ES6+ Tutorial',
      thumbnail: 'https://img.youtube.com/vi/js1/mqdefault.jpg',
      channelTitle: 'JS Mastery',
      description: 'Modern JavaScript features',
      category: 'JavaScript'
    },
    {
      id: 'js2',
      title: 'Async JavaScript',
      thumbnail: 'https://img.youtube.com/vi/js2/mqdefault.jpg',
      channelTitle: 'JS Explained',
      description: 'Promises, async/await',
      category: 'JavaScript'
    },
    {
      id: 'js3',
      title: 'JavaScript DOM Manipulation',
      thumbnail: 'https://img.youtube.com/vi/js3/mqdefault.jpg',
      channelTitle: 'Web Dev Pro',
      description: 'Interactive web pages',
      category: 'JavaScript'
    }
  ],
  'Java': [
    {
      id: 'j1',
      title: 'Java for Beginners',
      thumbnail: 'https://img.youtube.com/vi/j1/mqdefault.jpg',
      channelTitle: 'Java Mastery',
      description: 'Object-oriented programming',
      category: 'Java'
    },
    {
      id: 'j2',
      title: 'Spring Boot Tutorial',
      thumbnail: 'https://img.youtube.com/vi/j2/mqdefault.jpg',
      channelTitle: 'Spring Framework',
      description: 'Build REST APIs with Java',
      category: 'Java'
    },
    {
      id: 'j3',
      title: 'Java Multithreading',
      thumbnail: 'https://img.youtube.com/vi/j3/mqdefault.jpg',
      channelTitle: 'Java Concurrency',
      description: 'Parallel programming in Java',
      category: 'Java'
    }
  ],
  'Jazz Music': [
    {
      id: 'jazz1',
      title: 'Smooth Jazz for Coding',
      thumbnail: 'https://img.youtube.com/vi/jazz1/mqdefault.jpg',
      channelTitle: 'Jazz Vibes',
      description: 'Relaxing jazz playlist',
      category: 'Jazz Music'
    },
    {
      id: 'jazz2',
      title: 'Jazz Piano Tutorial',
      thumbnail: 'https://img.youtube.com/vi/jazz2/mqdefault.jpg',
      channelTitle: 'Jazz Lessons',
      description: 'Learn jazz piano basics',
      category: 'Jazz Music'
    },
    {
      id: 'jazz3',
      title: 'Bossa Nova Jazz',
      thumbnail: 'https://img.youtube.com/vi/jazz3/mqdefault.jpg',
      channelTitle: 'Bossa Nova',
      description: 'Brazilian jazz music',
      category: 'Jazz Music'
    }
  ],
  'Game': [
    {
      id: 'game1',
      title: 'Game Development for Beginners',
      thumbnail: 'https://img.youtube.com/vi/game1/mqdefault.jpg',
      channelTitle: 'Game Dev Hub',
      description: 'Unity tutorial',
      category: 'Game'
    },
    {
      id: 'game2',
      title: 'Top Indie Games 2024',
      thumbnail: 'https://img.youtube.com/vi/game2/mqdefault.jpg',
      channelTitle: 'Game Reviews',
      description: 'Best indie games',
      category: 'Game'
    },
    {
      id: 'game3',
      title: 'Game Design Principles',
      thumbnail: 'https://img.youtube.com/vi/game3/mqdefault.jpg',
      channelTitle: 'Game Design',
      description: 'Create engaging games',
      category: 'Game'
    }
  ],
  'Football': [
    {
      id: 'foot1',
      title: 'Best Goals of the Season',
      thumbnail: 'https://img.youtube.com/vi/foot1/mqdefault.jpg',
      channelTitle: 'Football Highlights',
      description: 'Amazing goals',
      category: 'Football'
    },
    {
      id: 'foot2',
      title: 'Football Skills Tutorial',
      thumbnail: 'https://img.youtube.com/vi/foot2/mqdefault.jpg',
      channelTitle: 'Skills School',
      description: 'Learn football tricks',
      category: 'Football'
    },
    {
      id: 'foot3',
      title: 'Champions League Final 2024',
      thumbnail: 'https://img.youtube.com/vi/foot3/mqdefault.jpg',
      channelTitle: 'UEFA',
      description: 'Match highlights',
      category: 'Football'
    }
  ],
  'Basketball': [
    {
      id: 'bball1',
      title: 'NBA Top 10 Plays',
      thumbnail: 'https://img.youtube.com/vi/bball1/mqdefault.jpg',
      channelTitle: 'NBA Highlights',
      description: 'Best basketball moments',
      category: 'Basketball'
    },
    {
      id: 'bball2',
      title: 'Basketball Drills for Beginners',
      thumbnail: 'https://img.youtube.com/vi/bball2/mqdefault.jpg',
      channelTitle: 'Basketball Training',
      description: 'Improve your game',
      category: 'Basketball'
    },
    {
      id: 'bball3',
      title: 'Stephen Curry Shooting Tips',
      thumbnail: 'https://img.youtube.com/vi/bball3/mqdefault.jpg',
      channelTitle: 'Shooting School',
      description: 'Perfect your shot',
      category: 'Basketball'
    }
  ]
};


export const ALL_VIDEOS = Object.values(VIDEOS_BY_CATEGORY).flat();