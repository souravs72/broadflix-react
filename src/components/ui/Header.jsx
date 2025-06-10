import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import UserContextMenu from './UserContextMenu'; // Assuming UserContextMenu is in the same directory

const Header = ({ user }) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const defaultUser = {
    name: 'Sourav Singh',
    email: 'sourav@clapgrow.com',
    avatar: 'https://st4.depositphotos.com/19956822/25338/i/450/depositphotos_253387844-stock-photo-silhouette-of-a-man-standing.jpg',
    subscription: 'Premium',
    profiles: [
      { id: 1, name: 'Sourav', avatar: 'https://st4.depositphotos.com/19956822/25338/i/450/depositphotos_253387844-stock-photo-silhouette-of-a-man-standing.jpg', isKid: false },
      { id: 2, name: 'Nasrin', avatar: 'https://st4.depositphotos.com/19956822/25338/i/450/depositphotos_253387844-stock-photo-silhouette-of-a-man-standing.jpg', isKid: false },
      { id: 3, name: 'Kids', avatar: null, isKid: true },
    ],
  };

  const currentUser = user || defaultUser;

  // Recent searches (could be moved to a context or API call in a real app)
  const [recentSearches] = useState(['Action Movies', 'Comedy Series', 'Documentaries']);

  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchExpanded]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      navigate(`/content-browse-search?query=${encodeURIComponent(searchQuery)}`);
      setIsSearchExpanded(false);
      setSearchQuery('');
    }
  };

  const handleRecentSearchClick = (query) => {
    setSearchQuery(query);
    console.log('Searching for:', query);
    navigate(`/content-browse-search?query=${encodeURIComponent(query)}`);
    setIsSearchExpanded(false);
  };

  const handleLogout = () => {
    console.log('Logging out...');
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/10">
      <div className="flex items-center justify-between px-4 lg:px-6 h-16 max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/home-dashboard" className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-300">
          <div className="w-8 h-8 bg-violet-800 rounded flex items-center justify-center">
            <Icon name="Play" size={20} color="white" />
          </div>
          <span className="font-heading font-bold text-xl text-white hidden sm:block">BroadFlix</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link
            to="/home-dashboard"
            className={`text-sm font-medium text-white hover:text-primary transition-colors duration-300 ${location.pathname === '/home-dashboard' ? 'border-b-2 border-primary' : ''}`}
          >
            Home
          </Link>
          <Link
            to="/content-browse-search"
            className={`text-sm font-medium text-white hover:text-primary transition-colors duration-300 ${location.pathname === '/content-browse-search' ? 'border-b-2 border-primary' : ''}`}
          >
            Browse
          </Link>
          <Link
            to="/watchlist-management"
            className={`text-sm font-medium text-white hover:text-primary transition-colors duration-300 ${location.pathname === '/watchlist-management' ? 'border-b-2 border-primary' : ''}`}
          >
            My List
          </Link>
        </nav>

        {/* Search and User Actions */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            {!isSearchExpanded ? (
              <button
                onClick={() => setIsSearchExpanded(true)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-300"
                aria-label="Open search"
              >
                <Icon name="Search" size={20} color="white" />
              </button>
            ) : (
              <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 lg:static lg:inset-auto lg:bg-transparent lg:backdrop-blur-none">
                <div className="flex items-center justify-center h-full lg:h-auto px-4">
                  <div className="w-full max-w-2xl lg:w-80">
                    <form onSubmit={handleSearchSubmit} className="relative">
                      <input
                        ref={searchInputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search movies, shows..."
                        className="w-full bg-surface border border-white/20 rounded-lg pl-12 pr-12 py-3 text-white placeholder-text-secondary focus:border-primary focus:outline-none transition-colors duration-300"
                        aria-label="Search input"
                      />
                      <Icon
                        name="Search"
                        size={20}
                        color="#B3B3B3"
                        className="absolute left-4 top-1/2 transform -translate-y-1/2"
                      />
                      <button
                        type="button"
                        onClick={() => setIsSearchExpanded(false)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-white/10 rounded"
                        aria-label="Close search"
                      >
                        <Icon name="X" size={16} color="#B3B3B3" />
                      </button>
                    </form>

                    {/* Recent Searches */}
                    {recentSearches.length > 0 && (
                      <div className="mt-4 bg-surface rounded-lg p-4 border border-white/10 lg:absolute lg:w-full lg:top-full lg:mt-2">
                        <h3 className="text-sm font-medium text-text-secondary mb-3">Recent Searches</h3>
                        <div className="space-y-2">
                          {recentSearches.map((search, index) => (
                            <button
                              key={index}
                              onClick={() => handleRecentSearchClick(search)}
                              className="flex items-center space-x-3 w-full text-left p-2 hover:bg-white/5 rounded transition-colors duration-300 text-white"
                            >
                              <Icon name="Clock" size={16} color="#B3B3B3" />
                              <span>{search}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Notifications */}
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-300 relative" aria-label="Notifications">
            <Icon name="Bell" size={20} color="white" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"></span>
          </button>

          {/* User Menu */}
          <UserContextMenu user={currentUser} onLogout={handleLogout} />
        </div>
      </div>
    </header>
  );
};

export default Header;