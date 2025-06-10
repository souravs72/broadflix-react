import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const EmptyWatchlist = ({ hasItems, searchQuery }) => {
  const trendingContent = [
    {
      id: 1,
      title: "Dune: Part Two",
      poster: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop",
      genre: "Sci-Fi, Adventure"
    },
    {
      id: 2,
      title: "The Bear",
      poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop",
      genre: "Comedy, Drama"
    },
    {
      id: 3,
      title: "Oppenheimer",
      poster: "https://images.unsplash.com/photo-1489599735734-79b4169c2a78?w=300&h=450&fit=crop",
      genre: "Biography, Drama"
    }
  ];

  if (hasItems && searchQuery) {
    // No search results
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="Search" size={32} color="#B3B3B3" />
        </div>
        <h2 className="text-2xl font-heading font-semibold text-white mb-4">
          No results found
        </h2>
        <p className="text-text-secondary mb-8 max-w-md mx-auto">
          We couldn't find any content matching "{searchQuery}" in your watchlist. Try different keywords or browse all your saved content.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <button
            onClick={() => window.location.reload()}
            className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-colors duration-300"
          >
            Clear Search
          </button>
          <Link
            to="/content-browse-search"
            className="bg-surface hover:bg-white/10 text-white px-6 py-3 rounded-lg transition-colors duration-300"
          >
            Browse Content
          </Link>
        </div>
      </div>
    );
  }

  if (hasItems) {
    // Has items but filtered out
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="Filter" size={32} color="#B3B3B3" />
        </div>
        <h2 className="text-2xl font-heading font-semibold text-white mb-4">
          No content matches your filters
        </h2>
        <p className="text-text-secondary mb-8 max-w-md mx-auto">
          Try adjusting your filters or search terms to see more content from your watchlist.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-colors duration-300"
        >
          Clear Filters
        </button>
      </div>
    );
  }

  // Empty watchlist
  return (
    <div className="text-center py-16">
      <div className="w-32 h-32 bg-surface rounded-full flex items-center justify-center mx-auto mb-8">
        <Icon name="Heart" size={48} color="#B3B3B3" />
      </div>
      
      <h2 className="text-3xl font-heading font-bold text-white mb-4">
        Your watchlist is empty
      </h2>
      
      <p className="text-text-secondary mb-8 max-w-lg mx-auto">
        Start building your personal collection by adding movies and TV shows you want to watch later. 
        Your saved content will appear here for easy access.
      </p>

      {/* Call to Action */}
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
        <Link
          to="/content-browse-search"
          className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
        >
          Browse Content
        </Link>
        <Link
          to="/home-dashboard"
          className="bg-surface hover:bg-white/10 text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-300"
        >
          Go to Home
        </Link>
      </div>

      {/* Trending Suggestions */}
      <div className="max-w-4xl mx-auto">
        <h3 className="text-xl font-heading font-semibold text-white mb-6">
          Trending Now
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {trendingContent.map((item) => (
            <Link
              key={item.id}
              to="/content-detail"
              state={{ content: item }}
              className="group bg-surface rounded-lg overflow-hidden hover:bg-surface/80 transition-all duration-300 hover:scale-105"
            >
              <div className="aspect-[2/3] overflow-hidden">
                <Image
                  src={item.poster}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="p-4">
                <h4 className="font-heading font-semibold text-white mb-2 truncate">
                  {item.title}
                </h4>
                <p className="text-sm text-text-secondary truncate">
                  {item.genre}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded transition-colors duration-300">
                    <Icon name="Plus" size={16} color="white" />
                  </button>
                  <button className="bg-white/10 hover:bg-white/20 text-white p-2 rounded transition-colors duration-300">
                    <Icon name="Play" size={16} color="white" />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="mt-16 max-w-2xl mx-auto">
        <div className="bg-surface/50 rounded-lg p-6 border border-white/10">
          <h4 className="font-heading font-semibold text-white mb-4 flex items-center">
            <Icon name="Lightbulb" size={20} color="#FFD700" className="mr-2" />
            Pro Tips
          </h4>
          <ul className="text-left text-text-secondary space-y-2">
            <li className="flex items-start">
              <Icon name="Check" size={16} color="#46D369" className="mr-2 mt-0.5 flex-shrink-0" />
              <span>Click the + icon on any content to add it to your watchlist</span>
            </li>
            <li className="flex items-start">
              <Icon name="Check" size={16} color="#46D369" className="mr-2 mt-0.5 flex-shrink-0" />
              <span>Use search and filters to organize your saved content</span>
            </li>
            <li className="flex items-start">
              <Icon name="Check" size={16} color="#46D369" className="mr-2 mt-0.5 flex-shrink-0" />
              <span>Your watchlist syncs across all your devices</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmptyWatchlist;