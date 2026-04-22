import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import VideoPage from './pages/VideoPage';
import SharePage from './pages/SharePage';
import AboutPage from './pages/AboutPage';
import AnalyticsPage from './pages/AnalyticsPage';
import { useEffect } from 'react';
import { auth } from './lib/firebase';


function App() {
  useEffect(() => {
  console.log('Firebase Auth State:', auth.currentUser);
  
  const unsubscribe = auth.onAuthStateChanged((user) => {
    console.log('Auth state changed:', user?.email || 'No user');
  });
  
  return () => unsubscribe();
}, []);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/video/:id" element={<VideoPage />} />
        <Route path="/share" element={<SharePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
      </Routes>
    </Router>
  );
}

export default App;