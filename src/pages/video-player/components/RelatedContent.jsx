import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RelatedContent = ({ content, onContentSelect }) => {
  const [activeTab, setActiveTab] = useState('similar');

  const tabs = [
    { id: 'similar', label: 'More Like This', icon: 'Sparkles' },
    { id: 'trending', label: 'Trending Now', icon: 'TrendingUp' },
    { id: 'recommended', label: 'For You', icon: 'Heart' }
  ];

  // Mock trending content
  const trendingContent = [
    {
      id: 5,
      title: "Inception",
      thumbnail: "https://images.unsplash.com/photo-1489599735734-79b4169c2a78?w=300&h=169&fit=crop",
      duration: 148,
      year: 2010,
      rating: "PG-13",
      genre: "Sci-Fi, Thriller",
      matchPercentage: 95
    },
    {
      id: 6,
      title: "Interstellar",
      thumbnail: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=300&h=169&fit=crop",
      duration: 169,
      year: 2014,
      rating: "PG-13",
      genre: "Sci-Fi, Drama",
      matchPercentage: 92
    }
  ];

  // Mock recommended content
  const recommendedContent = [
    {
      id: 7,
      title: "The Matrix",
      thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=169&fit=crop",
      duration: 136,
      year: 1999,
      rating: "R",
      genre: "Action, Sci-Fi",
      matchPercentage: 98
    },
    {
      id: 8,
      title: "Blade Runner 2049",
      thumbnail: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=169&fit=crop",
      duration: 164,
      year: 2017,
      rating: "R",
      genre: "Sci-Fi, Thriller",
      matchPercentage: 89
    }
  ];

  const getContentByTab = () => {
    switch (activeTab) {
      case 'similar':
        return content;
      case 'trending':
        return trendingContent;
      case 'recommended':
        return recommendedContent;
      default:
        return content;
    }
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getMatchColor = (percentage) => {
    if (percentage >= 90) return 'text-success';
    if (percentage >= 75) return 'text-accent';
    return 'text-warning';
  };

  const currentContent = getContentByTab();

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-surface/50 rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all duration-300 ${
              activeTab === tab.id 
                ? 'bg-primary text-white shadow-lg' 
                : 'text-text-secondary hover:text-white hover:bg-white/10'
            }`}
          >
            <Icon name={tab.icon} size={16} color="currentColor" />
            <span className="text-sm font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-heading font-semibold text-white">
            {tabs.find(tab => tab.id === activeTab)?.label}
          </h3>
          <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors duration-300">
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentContent.map((item) => (
            <div
              key={item.id}
              className="group relative bg-surface rounded-lg overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer"
              onClick={() => onContentSelect(item)}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Icon name="Play" size={20} color="white" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded px-2 py-1">
                  <span className="text-xs font-data text-white">
                    {formatDuration(item.duration)}
                  </span>
                </div>

                {/* Match Percentage */}
                {item.matchPercentage && (
                  <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm rounded px-2 py-1">
                    <span className={`text-xs font-semibold ${getMatchColor(item.matchPercentage)}`}>
                      {item.matchPercentage}% Match
                    </span>
                  </div>
                )}

                {/* Quality Badge */}
                <div className="absolute bottom-2 right-2 bg-accent/90 backdrop-blur-sm rounded px-2 py-1">
                  <span className="text-xs font-semibold text-black">HD</span>
                </div>
              </div>

              {/* Content Info */}
              <div className="p-4">
                <h4 className="font-heading font-semibold text-white mb-2 truncate">
                  {item.title}
                </h4>
                
                <div className="flex items-center space-x-2 text-text-secondary text-sm mb-2">
                  <span>{item.year}</span>
                  <span>•</span>
                  <span className="bg-white/10 px-2 py-0.5 rounded text-xs">{item.rating}</span>
                </div>

                <p className="text-text-secondary text-sm mb-3 truncate">
                  {item.genre}
                </p>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onContentSelect(item);
                    }}
                    className="flex-1 bg-primary hover:bg-primary/90 text-white text-sm font-medium py-2 px-3 rounded transition-colors duration-300 flex items-center justify-center space-x-1"
                  >
                    <Icon name="Play" size={14} color="white" />
                    <span>Play</span>
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Add to watchlist:', item.title);
                    }}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded transition-colors duration-300"
                  >
                    <Icon name="Plus" size={16} color="white" />
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('More info:', item.title);
                    }}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded transition-colors duration-300"
                  >
                    <Icon name="Info" size={16} color="white" />
                  </button>
                </div>
              </div>

              {/* Hover Actions */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Like:', item.title);
                    }}
                    className="p-2 bg-black/50 backdrop-blur-sm hover:bg-black/70 rounded-full transition-colors duration-300"
                  >
                    <Icon name="ThumbsUp" size={14} color="white" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Share:', item.title);
                    }}
                    className="p-2 bg-black/50 backdrop-blur-sm hover:bg-black/70 rounded-full transition-colors duration-300"
                  >
                    <Icon name="Share2" size={14} color="white" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center pt-4">
          <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-colors duration-300 flex items-center space-x-2 mx-auto">
            <Icon name="Plus" size={16} color="white" />
            <span>Load More</span>
          </button>
        </div>
      </div>

      {/* Viewing Stats */}
      <div className="bg-surface/50 rounded-lg p-4 border border-white/10">
        <h4 className="text-white font-heading font-semibold mb-3">Viewing Activity</h4>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">12</div>
            <div className="text-sm text-text-secondary">Movies Watched</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-accent">8</div>
            <div className="text-sm text-text-secondary">Series Completed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-success">45h</div>
            <div className="text-sm text-text-secondary">Watch Time</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedContent;