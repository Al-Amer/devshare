import { Link } from 'react-router-dom';
import { Home, Share2, Info, PlayCircle, Sun, Moon, BarChart3 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext'

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

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

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;