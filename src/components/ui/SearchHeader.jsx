import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const SearchHeader = ({ onSearchResults, placeholder = "Search movies, shows, actors..." }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches] = useState(['Action Movies', 'Comedy Series', 'Documentaries', 'Marvel']);
  const [isLoading, setIsLoading] = useState(false);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  const mockSuggestions = [
    { type: 'movie', title: 'The Dark Knight', year: 2008 },
    { type: 'series', title: 'Breaking Bad', year: 2008 },
    { type: 'actor', title: 'Leonardo DiCaprio', category: 'Actor' },
    { type: 'genre', title: 'Action Movies', category: 'Genre' },
  ];

  useEffect(() => {
    if (isExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isExpanded]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchQuery.length > 2) {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
          setSuggestions(mockSuggestions.filter(item => 
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
          ));
          setIsLoading(false);
        }, 300);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      performSearch(searchQuery);
    }
  };

  const performSearch = (query) => {
    console.log('Searching for:', query);
    if (onSearchResults) {
      onSearchResults(query);
    }
    navigate('/content-browse-search', { state: { searchQuery: query } });
    setIsExpanded(false);
    setSearchQuery('');
    setSuggestions([]);
  };

  const handleSuggestionClick = (suggestion) => {
    performSearch(suggestion.title);
  };

  const handleRecentSearchClick = (query) => {
    setSearchQuery(query);
    performSearch(query);
  };

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsLoading(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        performSearch(transcript);
        setIsLoading(false);
      };

      recognition.onerror = () => {
        setIsLoading(false);
      };

      recognition.start();
    }
  };

  const getSuggestionIcon = (type) => {
    switch (type) {
      case 'movie': return 'Film';
      case 'series': return 'Tv';
      case 'actor': return 'User';
      case 'genre': return 'Tag';
      default: return 'Search';
    }
  };

  return (
    <div className="relative w-full max-w-2xl">
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="flex items-center space-x-3 w-full bg-surface border border-white/10 rounded-lg px-4 py-3 hover:border-white/20 transition-colors duration-300"
        >
          <Icon name="Search" size={20} color="#B3B3B3" />
          <span className="text-text-secondary text-left flex-1">{placeholder}</span>
          <Icon name="Mic" size={18} color="#B3B3B3" />
        </button>
      ) : (
        <div className="relative">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={placeholder}
              className="w-full bg-surface border border-white/20 rounded-lg pl-12 pr-20 py-3 text-white placeholder-text-secondary focus:border-primary focus:outline-none transition-colors duration-300"
            />
            <Icon 
              name="Search" 
              size={20} 
              color="#B3B3B3" 
              className="absolute left-4 top-1/2 transform -translate-y-1/2" 
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
              <button
                type="button"
                onClick={handleVoiceSearch}
                className="p-1 hover:bg-white/10 rounded transition-colors duration-300"
                disabled={isLoading}
              >
                <Icon name="Mic" size={16} color="#B3B3B3" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsExpanded(false);
                  setSearchQuery('');
                  setSuggestions([]);
                }}
                className="p-1 hover:bg-white/10 rounded transition-colors duration-300"
              >
                <Icon name="X" size={16} color="#B3B3B3" />
              </button>
            </div>
          </form>

          {/* Search Results Dropdown */}
          {(suggestions.length > 0 || searchQuery.length === 0) && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-surface rounded-lg shadow-lg border border-white/10 z-1100 max-h-96 overflow-y-auto">
              {isLoading && (
                <div className="p-4 text-center">
                  <div className="inline-flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-text-secondary">Searching...</span>
                  </div>
                </div>
              )}

              {!isLoading && searchQuery.length === 0 && recentSearches.length > 0 && (
                <div className="p-4">
                  <h3 className="text-sm font-medium text-text-secondary mb-3">Recent Searches</h3>
                  <div className="space-y-1">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleRecentSearchClick(search)}
                        className="flex items-center space-x-3 w-full text-left p-2 hover:bg-white/5 rounded transition-colors duration-300"
                      >
                        <Icon name="Clock" size={16} color="#B3B3B3" />
                        <span className="text-white">{search}</span>
                        <Icon name="ArrowUpLeft" size={14} color="#B3B3B3" className="ml-auto" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {!isLoading && suggestions.length > 0 && (
                <div className="p-2">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="flex items-center space-x-3 w-full text-left p-3 hover:bg-white/5 rounded-lg transition-colors duration-300"
                    >
                      <Icon name={getSuggestionIcon(suggestion.type)} size={18} color="#B3B3B3" />
                      <div className="flex-1">
                        <div className="text-white">{suggestion.title}</div>
                        {suggestion.year && (
                          <div className="text-sm text-text-secondary">{suggestion.year}</div>
                        )}
                        {suggestion.category && (
                          <div className="text-sm text-text-secondary">{suggestion.category}</div>
                        )}
                      </div>
                      <Icon name="ArrowUpRight" size={14} color="#B3B3B3" />
                    </button>
                  ))}
                </div>
              )}

              {!isLoading && searchQuery.length > 2 && suggestions.length === 0 && (
                <div className="p-4 text-center">
                  <Icon name="Search" size={24} color="#B3B3B3" className="mx-auto mb-2" />
                  <p className="text-text-secondary">No results found for "{searchQuery}"</p>
                  <p className="text-sm text-text-secondary mt-1">Try different keywords</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchHeader;