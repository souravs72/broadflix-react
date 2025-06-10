import React, { useState, useEffect } from 'react';

import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';

import WatchlistCard from './components/WatchlistCard';
import WatchlistFilters from './components/WatchlistFilters';
import WatchlistSort from './components/WatchlistSort';
import EmptyWatchlist from './components/EmptyWatchlist';
import BulkActions from './components/BulkActions';

const WatchlistManagement = () => {
  const [watchlistItems, setWatchlistItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('dateAdded');
  const [filterBy, setFilterBy] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [showBulkActions, setShowBulkActions] = useState(false);

  // Mock watchlist data
  const mockWatchlistData = [
    {
      id: 1,
      title: "The Dark Knight",
      type: "movie",
      genre: "Action, Crime, Drama",
      runtime: 152,
      year: 2008,
      rating: "PG-13",
      imdbRating: 9.0,
      poster: "https://images.unsplash.com/photo-1489599735734-79b4169c2a78?w=400&h=600&fit=crop",
      dateAdded: new Date('2024-01-15'),
      watchProgress: 0,
      isAvailable: true,
      description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests."
    },
    {
      id: 2,
      title: "Breaking Bad",
      type: "series",
      genre: "Crime, Drama, Thriller",
      runtime: 47,
      year: 2008,
      rating: "TV-MA",
      imdbRating: 9.5,
      poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
      dateAdded: new Date('2024-01-10'),
      watchProgress: 65,
      isAvailable: true,
      seasons: 5,
      episodes: 62,
      description: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine."
    },
    {
      id: 3,
      title: "Inception",
      type: "movie",
      genre: "Action, Sci-Fi, Thriller",
      runtime: 148,
      year: 2010,
      rating: "PG-13",
      imdbRating: 8.8,
      poster: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
      dateAdded: new Date('2024-01-08'),
      watchProgress: 100,
      isAvailable: true,
      description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea."
    },
    {
      id: 4,
      title: "Stranger Things",
      type: "series",
      genre: "Drama, Fantasy, Horror",
      runtime: 51,
      year: 2016,
      rating: "TV-14",
      imdbRating: 8.7,
      poster: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
      dateAdded: new Date('2024-01-05'),
      watchProgress: 30,
      isAvailable: true,
      seasons: 4,
      episodes: 42,
      description: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces."
    },
    {
      id: 5,
      title: "The Matrix",
      type: "movie",
      genre: "Action, Sci-Fi",
      runtime: 136,
      year: 1999,
      rating: "R",
      imdbRating: 8.7,
      poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop",
      dateAdded: new Date('2024-01-03'),
      watchProgress: 0,
      isAvailable: false,
      description: "A computer programmer is led to fight an underground war against powerful computers who have constructed his reality."
    },
    {
      id: 6,
      title: "The Crown",
      type: "series",
      genre: "Biography, Drama, History",
      runtime: 58,
      year: 2016,
      rating: "TV-MA",
      imdbRating: 8.6,
      poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      dateAdded: new Date('2024-01-01'),
      watchProgress: 45,
      isAvailable: true,
      seasons: 6,
      episodes: 60,
      description: "Follows the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped Britain."
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setWatchlistItems(mockWatchlistData);
      setFilteredItems(mockWatchlistData);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = [...watchlistItems];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.genre.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply type filter
    if (filterBy !== 'all') {
      filtered = filtered.filter(item => item.type === filterBy);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'dateAdded':
          return new Date(b.dateAdded) - new Date(a.dateAdded);
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        case 'releaseDate':
          return b.year - a.year;
        case 'rating':
          return b.imdbRating - a.imdbRating;
        default:
          return 0;
      }
    });

    setFilteredItems(filtered);
  }, [watchlistItems, searchQuery, filterBy, sortBy]);

  const handleRemoveItem = (itemId) => {
    setWatchlistItems(prev => prev.filter(item => item.id !== itemId));
    setSelectedItems(prev => prev.filter(id => id !== itemId));
  };

  const handleBulkRemove = () => {
    setWatchlistItems(prev => prev.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
    setShowBulkActions(false);
  };

  const handleSelectItem = (itemId) => {
    setSelectedItems(prev => {
      const newSelection = prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId];
      
      setShowBulkActions(newSelection.length > 0);
      return newSelection;
    });
  };

  const handleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([]);
      setShowBulkActions(false);
    } else {
      setSelectedItems(filteredItems.map(item => item.id));
      setShowBulkActions(true);
    }
  };

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="animate-pulse">
              <div className="h-8 bg-surface rounded w-64 mb-6"></div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {[...Array(12)].map((_, index) => (
                  <div key={index} className="bg-surface rounded-lg overflow-hidden">
                    <div className="aspect-[2/3] bg-white/10"></div>
                    <div className="p-3">
                      <div className="h-4 bg-white/10 rounded mb-2"></div>
                      <div className="h-3 bg-white/10 rounded w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-3xl font-heading font-bold text-white mb-2">My Watchlist</h1>
              <p className="text-text-secondary">
                {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'} saved for later
              </p>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 bg-surface rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors duration-300 ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-text-secondary hover:text-white'}`}
              >
                <Icon name="Grid3X3" size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors duration-300 ${viewMode === 'list' ? 'bg-primary text-white' : 'text-text-secondary hover:text-white'}`}
              >
                <Icon name="List" size={18} />
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4 mb-6">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search your watchlist..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-text-secondary focus:border-primary focus:outline-none transition-colors duration-300"
              />
              <Icon name="Search" size={20} color="#B3B3B3" className="absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>

            {/* Filters and Sort */}
            <div className="flex items-center space-x-4">
              <WatchlistFilters filterBy={filterBy} onFilterChange={setFilterBy} />
              <WatchlistSort sortBy={sortBy} onSortChange={setSortBy} />
            </div>
          </div>

          {/* Bulk Actions */}
          {showBulkActions && (
            <BulkActions
              selectedCount={selectedItems.length}
              totalCount={filteredItems.length}
              onSelectAll={handleSelectAll}
              onBulkRemove={handleBulkRemove}
              onCancel={() => {
                setSelectedItems([]);
                setShowBulkActions(false);
              }}
            />
          )}

          {/* Content */}
          {filteredItems.length === 0 ? (
            <EmptyWatchlist hasItems={watchlistItems.length > 0} searchQuery={searchQuery} />
          ) : (
            <div className={viewMode === 'grid' ?'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4' :'space-y-4'
            }>
              {filteredItems.map((item) => (
                <WatchlistCard
                  key={item.id}
                  item={item}
                  viewMode={viewMode}
                  isSelected={selectedItems.includes(item.id)}
                  onSelect={() => handleSelectItem(item.id)}
                  onRemove={() => handleRemoveItem(item.id)}
                  formatRuntime={formatRuntime}
                />
              ))}
            </div>
          )}

          {/* Load More Button for large lists */}
          {filteredItems.length >= 20 && (
            <div className="text-center mt-8">
              <button className="bg-surface hover:bg-white/10 text-white px-6 py-3 rounded-lg transition-colors duration-300">
                Load More Content
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WatchlistManagement;