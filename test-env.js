import dotenv from 'dotenv';
dotenv.config();
console.log('API Key exists?', !!process.env.VITE_YOUTUBE_API_KEY);
console.log('First 10 chars:', process.env.VITE_YOUTUBE_API_KEY?.substring(0, 10));
