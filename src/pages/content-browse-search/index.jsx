import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import SearchHeader from '../../components/ui/SearchHeader';
import Icon from '../../components/AppIcon';

import ContentCard from './components/ContentCard';
import FilterPanel from './components/FilterPanel';
import SortDropdown from './components/SortDropdown';

const ContentBrowseSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredContent, setFilteredContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState({
    genres: [],
    years: [],
    ratings: [],
    types: [],
    languages: [],
    qualities: []
  });
  const [sortBy, setSortBy] = useState('relevance');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [isVoiceSearchActive, setIsVoiceSearchActive] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const observer = useRef();
  const location = useLocation();

  const mockContent = [
    {
      id: 1,
      title: "The Dark Knight",
      type: "movie",
      poster: "https://images.unsplash.com/photo-1489599735734-79b4169c2a78?w=400&h=600&fit=crop",
      rating: 9.0,
      year: 2008,
      genre: ["Action", "Crime", "Drama"],
      duration: 152,
      quality: "4K",
      language: "English",
      description: `When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.`,
      cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
      director: "Christopher Nolan",
      isInWatchlist: false,
      watchProgress: 0
    },
    {
      id: 2,
      title: "Breaking Bad",
      type: "series",
      poster: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=600&fit=crop",
      rating: 9.5,
      year: 2008,
      genre: ["Crime", "Drama", "Thriller"],
      duration: 47,
      quality: "HD",
      language: "English",
      description: `A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future.`,
      cast: ["Bryan Cranston", "Aaron Paul", "Anna Gunn"],
      director: "Vince Gilligan",
      isInWatchlist: true,
      watchProgress: 65
    },
    {
      id: 3,
      title: "Inception",
      type: "movie",
      poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
      rating: 8.8,
      year: 2010,
      genre: ["Action", "Sci-Fi", "Thriller"],
      duration: 148,
      quality: "4K",
      language: "English",
      description: `A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.`,
      cast: ["Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy"],
      director: "Christopher Nolan",
      isInWatchlist: false,
      watchProgress: 0
    },
    {
      id: 4,
      title: "Stranger Things",
      type: "series",
      poster: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
      rating: 8.7,
      year: 2016,
      genre: ["Drama", "Fantasy", "Horror"],
      duration: 51,
      quality: "4K",
      language: "English",
      description: `When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.`,
      cast: ["Millie Bobby Brown", "Finn Wolfhard", "Winona Ryder"],
      director: "The Duffer Brothers",
      isInWatchlist: true,
      watchProgress: 23
    },
    {
      id: 5,
      title: "Parasite",
      type: "movie",
      poster: "https://images.unsplash.com/photo-1489599735734-79b4169c2a78?w=400&h=600&fit=crop",
      rating: 8.6,
      year: 2019,
      genre: ["Comedy", "Drama", "Thriller"],
      duration: 132,
      quality: "HD",
      language: "Korean",
      description: `A poor family schemes to become employed by a wealthy family by infiltrating their household and posing as unrelated, highly qualified individuals.`,
      cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"],
      director: "Bong Joon-ho",
      isInWatchlist: false,
      watchProgress: 0
    },
    {
      id: 6,
      title: "The Crown",
      type: "series",
      poster: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=600&fit=crop",
      rating: 8.7,
      year: 2016,
      genre: ["Biography", "Drama", "History"],
      duration: 58,
      quality: "4K",
      language: "English",
      description: `Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the twentieth century.`,
      cast: ["Claire Foy", "Olivia Colman", "Imelda Staunton"],
      director: "Peter Morgan",
      isInWatchlist: true,
      watchProgress: 89
    }
  ];

  const filterOptions = {
    genres: ["Action", "Comedy", "Drama", "Thriller", "Sci-Fi", "Horror", "Romance", "Crime", "Fantasy", "Biography", "History"],
    years: ["2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015", "2010s", "2000s"],
    ratings: ["9.0+", "8.0+", "7.0+", "6.0+"],
    types: ["Movie", "Series", "Documentary"],
    languages: ["English", "Spanish", "French", "German", "Korean", "Japanese", "Hindi"],
    qualities: ["4K", "HD", "SD"]
  };

  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'popularity', label: 'Popularity' },
    { value: 'rating', label: 'Rating' },
    { value: 'year', label: 'Release Date' },
    { value: 'title', label: 'Title A-Z' }
  ];

  useEffect(() => {
    if (location.state?.searchQuery) {
      setSearchQuery(location.state.searchQuery);
    }
  }, [location.state]);

  useEffect(() => {
    applyFiltersAndSort();
  }, [searchQuery, activeFilters, sortBy]);

  const applyFiltersAndSort = useCallback(() => {
    setIsLoading(true);
    
    setTimeout(() => {
      let filtered = [...mockContent];

      // Apply search filter
      if (searchQuery) {
        filtered = filtered.filter(item =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase())) ||
          item.cast.some(c => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
          item.director.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Apply genre filter
      if (activeFilters.genres.length > 0) {
        filtered = filtered.filter(item =>
          activeFilters.genres.some(genre => item.genre.includes(genre))
        );
      }

      // Apply year filter
      if (activeFilters.years.length > 0) {
        filtered = filtered.filter(item => {
          return activeFilters.years.some(year => {
            if (year.includes('s')) {
              const decade = parseInt(year.replace('s', ''));
              return item.year >= decade && item.year < decade + 10;
            }
            return item.year.toString() === year;
          });
        });
      }

      // Apply rating filter
      if (activeFilters.ratings.length > 0) {
        filtered = filtered.filter(item => {
          return activeFilters.ratings.some(rating => {
            const minRating = parseFloat(rating.replace('+', ''));
            return item.rating >= minRating;
          });
        });
      }

      // Apply type filter
      if (activeFilters.types.length > 0) {
        filtered = filtered.filter(item =>
          activeFilters.types.some(type => item.type === type.toLowerCase())
        );
      }

      // Apply language filter
      if (activeFilters.languages.length > 0) {
        filtered = filtered.filter(item =>
          activeFilters.languages.includes(item.language)
        );
      }

      // Apply quality filter
      if (activeFilters.qualities.length > 0) {
        filtered = filtered.filter(item =>
          activeFilters.qualities.includes(item.quality)
        );
      }

      // Apply sorting
      switch (sortBy) {
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'year':
          filtered.sort((a, b) => b.year - a.year);
          break;
        case 'title':
          filtered.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'popularity':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        default:
          break;
      }

      setFilteredContent(filtered);
      setIsLoading(false);
    }, 300);
  }, [searchQuery, activeFilters, sortBy]);

  const handleFilterChange = (filterType, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value]
    }));
  };

  const clearFilter = (filterType, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].filter(item => item !== value)
    }));
  };

  const clearAllFilters = () => {
    setActiveFilters({
      genres: [],
      years: [],
      ratings: [],
      types: [],
      languages: [],
      qualities: []
    });
    setSearchQuery('');
  };

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      setIsVoiceSearchActive(true);

      recognition.onstart = () => {
        console.log('Voice search started');
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        setIsVoiceSearchActive(false);
      };

      recognition.onerror = () => {
        setIsVoiceSearchActive(false);
      };

      recognition.onend = () => {
        setIsVoiceSearchActive(false);
      };

      recognition.start();
    }
  };

  const lastContentElementRef = useCallback(node => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [isLoading, hasMore]);

  const getActiveFiltersCount = () => {
    return Object.values(activeFilters).reduce((count, filters) => count + filters.length, 0);
  };

  const renderQuickFilters = () => {
    const quickFilters = [
      { type: 'genres', values: ['Action', 'Comedy', 'Drama', 'Thriller'] },
      { type: 'types', values: ['Movie', 'Series'] },
      { type: 'qualities', values: ['4K', 'HD'] }
    ];

    return (
      <div className="flex flex-wrap gap-2 mb-6">
        {quickFilters.map(filter =>
          filter.values.map(value => (
            <button
              key={`${filter.type}-${value}`}
              onClick={() => handleFilterChange(filter.type, value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilters[filter.type].includes(value)
                  ? 'bg-primary text-white' :'bg-surface border border-white/20 text-text-secondary hover:text-white hover:border-white/40'
              }`}
            >
              {value}
            </button>
          ))
        )}
      </div>
    );
  };

  const renderActiveFilters = () => {
    const allActiveFilters = [];
    
    Object.entries(activeFilters).forEach(([type, values]) => {
      values.forEach(value => {
        allActiveFilters.push({ type, value });
      });
    });

    if (allActiveFilters.length === 0) return null;

    return (
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-sm text-text-secondary">Active filters:</span>
        {allActiveFilters.map(({ type, value }, index) => (
          <span
            key={index}
            className="inline-flex items-center space-x-1 bg-primary/20 text-primary px-3 py-1 rounded-full text-sm"
          >
            <span>{value}</span>
            <button
              onClick={() => clearFilter(type, value)}
              className="hover:bg-primary/30 rounded-full p-0.5 transition-colors duration-300"
            >
              <Icon name="X" size={12} color="currentColor" />
            </button>
          </span>
        ))}
        <button
          onClick={clearAllFilters}
          className="text-sm text-text-secondary hover:text-white transition-colors duration-300 underline"
        >
          Clear all
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <div className="flex-1 max-w-2xl">
                <SearchHeader
                  onSearchResults={setSearchQuery}
                  placeholder="Search movies, shows, actors, directors..."
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleVoiceSearch}
                  disabled={isVoiceSearchActive}
                  className={`p-3 rounded-lg transition-all duration-300 ${
                    isVoiceSearchActive
                      ? 'bg-primary text-white animate-pulse' :'bg-surface border border-white/20 text-text-secondary hover:text-white hover:border-white/40'
                  }`}
                  title="Voice Search"
                >
                  <Icon name="Mic" size={20} color="currentColor" />
                </button>
                
                <div className="flex items-center bg-surface border border-white/20 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 transition-colors duration-300 ${
                      viewMode === 'grid' ? 'bg-primary text-white' : 'text-text-secondary hover:text-white'
                    }`}
                  >
                    <Icon name="Grid3X3" size={20} color="currentColor" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-3 transition-colors duration-300 ${
                      viewMode === 'list' ? 'bg-primary text-white' : 'text-text-secondary hover:text-white'
                    }`}
                  >
                    <Icon name="List" size={20} color="currentColor" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Filters */}
            {renderQuickFilters()}

            {/* Controls Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className="flex items-center space-x-2 bg-surface border border-white/20 text-text-secondary hover:text-white hover:border-white/40 px-4 py-2 rounded-lg transition-all duration-300"
                >
                  <Icon name="Filter" size={18} color="currentColor" />
                  <span>Filters</span>
                  {getActiveFiltersCount() > 0 && (
                    <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                      {getActiveFiltersCount()}
                    </span>
                  )}
                </button>
                
                <SortDropdown
                  options={sortOptions}
                  value={sortBy}
                  onChange={setSortBy}
                />
              </div>

              <div className="flex items-center space-x-4 text-sm text-text-secondary">
                <span>
                  {isLoading ? 'Searching...' : `${filteredContent.length} results`}
                  {searchQuery && ` for "${searchQuery}"`}
                </span>
              </div>
            </div>

            {/* Active Filters */}
            {renderActiveFilters()}
          </div>

          <div className="flex gap-8">
            {/* Advanced Filter Panel */}
            <FilterPanel
              isOpen={showAdvancedFilters}
              filters={activeFilters}
              filterOptions={filterOptions}
              onFilterChange={handleFilterChange}
              onClose={() => setShowAdvancedFilters(false)}
            />

            {/* Content Grid */}
            <div className="flex-1">
              {isLoading && filteredContent.length === 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {[...Array(12)].map((_, index) => (
                    <div key={index} className="animate-pulse">
                      <div className="aspect-[2/3] bg-surface rounded-lg mb-2"></div>
                      <div className="h-4 bg-surface rounded mb-1"></div>
                      <div className="h-3 bg-surface rounded w-2/3"></div>
                    </div>
                  ))}
                </div>
              ) : filteredContent.length > 0 ? (
                <div className={`${
                  viewMode === 'grid' ?'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4' :'space-y-4'
                }`}>
                  {filteredContent.map((content, index) => (
                    <div
                      key={content.id}
                      ref={index === filteredContent.length - 1 ? lastContentElementRef : null}
                    >
                      <ContentCard
                        content={content}
                        viewMode={viewMode}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon name="Search" size={48} color="#B3B3B3" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-white mb-2">
                    No results found
                  </h3>
                  <p className="text-text-secondary mb-6">
                    {searchQuery
                      ? `No content matches "${searchQuery}" with the current filters.`
                      : 'No content matches the current filters.'
                    }
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="btn-primary"
                  >
                    Clear all filters
                  </button>
                </div>
              )}

              {/* Loading More */}
              {isLoading && filteredContent.length > 0 && (
                <div className="text-center py-8">
                  <div className="inline-flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-text-secondary">Loading more content...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContentBrowseSearch;