import type { YouTubeVideo } from '../types';

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

export const VIDEOS_BY_CATEGORY: Record<string, YouTubeVideo[]> = {
  'React': [
    {
      id: 'LlvBjsyLJnQ',
      title: 'React Tutorial for Beginners',
      thumbnail: 'https://img.youtube.com/vi/LlvBjsyLJnQ/mqdefault.jpg',
      channelTitle: 'Programming with Mosh',
      description: 'Learn React.js in this full course for beginners',
      category: 'React'
    },
    {
      id: 'w7ejDZ8SWv8',
      title: 'React Hooks Full Course',
      thumbnail: 'https://img.youtube.com/vi/w7ejDZ8SWv8/mqdefault.jpg',
      channelTitle: 'freeCodeCamp',
      description: 'Master React Hooks with this comprehensive tutorial',
      category: 'React'
    },
    {
      id: 'bMknfKXIFA8',
      title: 'React Router 6 Tutorial',
      thumbnail: 'https://img.youtube.com/vi/bMknfKXIFA8/mqdefault.jpg',
      channelTitle: 'Codevolution',
      description: 'Complete React Router tutorial for beginners',
      category: 'React'
    }
  ],
  'JavaScript': [
    {
      id: 'W6NZfCO5SIk',
      title: 'JavaScript Tutorial for Beginners',
      thumbnail: 'https://img.youtube.com/vi/W6NZfCO5SIk/mqdefault.jpg',
      channelTitle: 'Programming with Mosh',
      description: 'Learn JavaScript fundamentals in 1 hour',
      category: 'JavaScript'
    },
    {
      id: 'PkZNo7MFNFg',
      title: 'Async JavaScript Tutorial',
      thumbnail: 'https://img.youtube.com/vi/PkZNo7MFNFg/mqdefault.jpg',
      channelTitle: 'Web Dev Simplified',
      description: 'Promises, async/await explained simply',
      category: 'JavaScript'
    },
    {
      id: 'DHjqpvDnNGE',
      title: 'ES6 JavaScript Tutorial',
      thumbnail: 'https://img.youtube.com/vi/DHjqpvDnNGE/mqdefault.jpg',
      channelTitle: 'Traversy Media',
      description: 'Modern JavaScript features',
      category: 'JavaScript'
    }
  ],
  'Python': [
    {
      id: '_uQrJ0TkZlc',
      title: 'Python Tutorial for Beginners',
      thumbnail: 'https://img.youtube.com/vi/_uQrJ0TkZlc/mqdefault.jpg',
      channelTitle: 'Programming with Mosh',
      description: 'Learn Python in 1 hour',
      category: 'Python'
    },
    {
      id: 'rfscVS0vtbw',
      title: 'Python Full Course',
      thumbnail: 'https://img.youtube.com/vi/rfscVS0vtbw/mqdefault.jpg',
      channelTitle: 'freeCodeCamp',
      description: 'Complete Python course',
      category: 'Python'
    },
    {
      id: '8ext9G7xOug',
      title: 'Django Web Framework',
      thumbnail: 'https://img.youtube.com/vi/8ext9G7xOug/mqdefault.jpg',
      channelTitle: 'Tech With Tim',
      description: 'Build web apps with Django',
      category: 'Python'
    }
  ],
  'AI': [
    {
      id: '2FPCoo6tvUY',
      title: 'AI for Beginners',
      thumbnail: 'https://img.youtube.com/vi/2FPCoo6tvUY/mqdefault.jpg',
      channelTitle: 'Andrej Karpathy',
      description: 'Introduction to Artificial Intelligence',
      category: 'AI'
    },
    {
      id: 'aircAruvnKk',
      title: 'Machine Learning Crash Course',
      thumbnail: 'https://img.youtube.com/vi/aircAruvnKk/mqdefault.jpg',
      channelTitle: 'StatQuest',
      description: 'Machine learning fundamentals',
      category: 'AI'
    },
    {
      id: 'wjZofJX0v4M',
      title: 'ChatGPT Explained',
      thumbnail: 'https://img.youtube.com/vi/wjZofJX0v4M/mqdefault.jpg',
      channelTitle: 'Two Minute Papers',
      description: 'How ChatGPT works',
      category: 'AI'
    }
  ],
  'Web Dev': [
    {
      id: 'pQN-pnXPaVg',
      title: 'HTML & CSS Tutorial',
      thumbnail: 'https://img.youtube.com/vi/pQN-pnXPaVg/mqdefault.jpg',
      channelTitle: 'Fireship',
      description: 'Quick guide to HTML/CSS',
      category: 'Web Dev'
    },
    {
      id: 'Oe421EPjeBE',
      title: 'Tailwind CSS Tutorial',
      thumbnail: 'https://img.youtube.com/vi/Oe421EPjeBE/mqdefault.jpg',
      channelTitle: 'Traversy Media',
      description: 'Learn Tailwind CSS',
      category: 'Web Dev'
    },
    {
      id: 'SqcY0GlETPk',
      title: 'Next.js Tutorial',
      thumbnail: 'https://img.youtube.com/vi/SqcY0GlETPk/mqdefault.jpg',
      channelTitle: 'Net Ninja',
      description: 'Full Next.js course',
      category: 'Web Dev'
    }
  ],
  'Game Dev': [
    {
      id: 'j48LtUkZRjU',
      title: 'Unity Game Development',
      thumbnail: 'https://img.youtube.com/vi/j48LtUkZRjU/mqdefault.jpg',
      channelTitle: 'Brackeys',
      description: 'Make your first game',
      category: 'Game Dev'
    },
    {
      id: 'WO41S6U6PvI',
      title: 'Game Design Principles',
      thumbnail: 'https://img.youtube.com/vi/WO41S6U6PvI/mqdefault.jpg',
      channelTitle: 'Dani',
      description: 'Learn game design',
      category: 'Game Dev'
    },
    {
      id: 'AmGSEH7QcDg',
      title: 'Unreal Engine 5 Tutorial',
      thumbnail: 'https://img.youtube.com/vi/AmGSEH7QcDg/mqdefault.jpg',
      channelTitle: 'Unreal Engine',
      description: 'Getting started with UE5',
      category: 'Game Dev'
    }
  ],
  'Music': [
    {
      id: '7NOSDKb0HlU',
      title: 'Relaxing Jazz Music',
      thumbnail: 'https://img.youtube.com/vi/7NOSDKb0HlU/mqdefault.jpg',
      channelTitle: 'Jazz Cafe',
      description: 'Smooth jazz for coding',
      category: 'Music'
    },
    {
      id: '5qap5aO4i9A',
      title: 'Lofi Hip Hop Mix',
      thumbnail: 'https://img.youtube.com/vi/5qap5aO4i9A/mqdefault.jpg',
      channelTitle: 'Lofi Girl',
      description: 'Study and relax',
      category: 'Music'
    },
    {
      id: 'jfKfPfyJRdk',
      title: 'Classical Piano',
      thumbnail: 'https://img.youtube.com/vi/jfKfPfyJRdk/mqdefault.jpg',
      channelTitle: 'Classical Music',
      description: 'Beethoven, Mozart, Chopin',
      category: 'Music'
    }
  ],
  'Sports': [
    {
      id: 'X_7iH-bYiX4',
      title: 'NBA Best Plays',
      thumbnail: 'https://img.youtube.com/vi/X_7iH-bYiX4/mqdefault.jpg',
      channelTitle: 'NBA',
      description: 'Top 10 plays of the week',
      category: 'Sports'
    },
    {
      id: 'qDYcEO_jh0I',
      title: 'Football Skills Tutorial',
      thumbnail: 'https://img.youtube.com/vi/qDYcEO_jh0I/mqdefault.jpg',
      channelTitle: 'Football Skills',
      description: 'Learn football tricks',
      category: 'Sports'
    },
    {
      id: 'tIWpr3tHzII',
      title: 'Best Olympic Moments',
      thumbnail: 'https://img.youtube.com/vi/tIWpr3tHzII/mqdefault.jpg',
      channelTitle: 'Olympics',
      description: 'Greatest sports moments',
      category: 'Sports'
    }
  ]
};


export const ALL_VIDEOS = Object.values(VIDEOS_BY_CATEGORY).flat();