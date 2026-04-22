import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Share2, Info, PlayCircle, Sun, Moon, BarChart3, User, LogOut } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      console.log('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
            <PlayCircle size={28} />
            <span>DevShare</span>
          </Link>
          
          <div className="flex space-x-6 items-center">
            <Link to="/" className="flex items-center space-x-1 hover:text-purple-200 transition">
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link to="/analytics" className="flex items-center space-x-1 hover:text-purple-200 transition">
              <BarChart3 size={18} />
              <span>Analytics</span>
            </Link>
            <Link to="/share" className="flex items-center space-x-1 hover:text-purple-200 transition">
              <Share2 size={18} />
              <span>Share</span>
            </Link>
            <Link to="/about" className="flex items-center space-x-1 hover:text-purple-200 transition">
              <Info size={18} />
              <span>About</span>
            </Link>
            <div className="px-4 py-2 text-xs text-gray-500 border-b">
              User ID: {user?.uid?.substring(0, 8)}...
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            
            {/* Auth Section */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg hover:bg-white/20 transition">
                  <User size={16} />
                  <span className="text-sm">{user.email?.split('@')[0]}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg hidden group-hover:block z-50">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg flex items-center gap-2"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="bg-white/10 px-4 py-1.5 rounded-lg hover:bg-white/20 transition"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
      
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </nav>
  );
};

export default Navbar;