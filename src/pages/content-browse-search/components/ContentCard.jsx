import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ContentCard = ({ content, viewMode = 'grid' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    // Simulate preview loading delay
    setTimeout(() => {
      if (isHovered) {
        setShowPreview(true);
      }
    }, 1000);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowPreview(false);
  };

  const handleWatchlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Toggle watchlist for:', content.title);
  };

  const handleQuickPlay = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Quick play:', content.title);
  };

  const getRatingColor = (rating) => {
    if (rating >= 8.5) return 'text-success';
    if (rating >= 7.0) return 'text-accent';
    if (rating >= 6.0) return 'text-warning';
    return 'text-error';
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  if (viewMode === 'list') {
    return (
      <Link
        to="/content-detail"
        state={{ content }}
        className="flex bg-surface hover:bg-surface/80 rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] group"
      >
        <div className="relative w-32 h-48 flex-shrink-0">
          <Image
            src={content.poster}
            alt={content.title}
            className="w-full h-full object-cover"
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
          )}
          
          {/* Quality Badge */}
          <div className="absolute top-2 left-2 bg-accent/90 backdrop-blur-sm rounded px-2 py-1">
            <span className="text-xs font-semibold text-black">{content.quality}</span>
          </div>

          {/* Progress Bar */}
          {content.watchProgress > 0 && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm">
              <div className="h-1 bg-white/20">
                <div 
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${content.watchProgress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-heading font-semibold text-white text-lg mb-1 truncate group-hover:text-primary transition-colors duration-300">
                {content.title}
              </h3>
              <div className="flex items-center space-x-2 text-sm text-text-secondary mb-2">
                <span className="capitalize">{content.type}</span>
                <span>•</span>
                <span>{content.year}</span>
                <span>•</span>
                <span>{formatDuration(content.duration)}</span>
                <span>•</span>
                <span className={`font-semibold ${getRatingColor(content.rating)}`}>
                  ★ {content.rating}
                </span>
              </div>
            </div>
            
            <button
              onClick={handleWatchlistToggle}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-300 ml-2"
            >
              <Icon 
                name={content.isInWatchlist ? "Check" : "Plus"} 
                size={18} 
                color={content.isInWatchlist ? "#FFD700" : "#B3B3B3"} 
              />
            </button>
          </div>

          <div className="flex flex-wrap gap-1 mb-3">
            {content.genre.slice(0, 3).map((genre, index) => (
              <span
                key={index}
                className="bg-white/10 text-text-secondary text-xs px-2 py-1 rounded-full"
              >
                {genre}
              </span>
            ))}
          </div>

          <p className="text-text-secondary text-sm line-clamp-2 mb-3">
            {content.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="text-xs text-text-secondary">
              <span>Director: {content.director}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              {content.watchProgress > 0 && (
                <span className="text-xs text-primary">
                  {content.watchProgress}% watched
                </span>
              )}
              <Link
                to="/video-player"
                state={{ content }}
                onClick={handleQuickPlay}
                className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300"
              >
                <Icon name="Play" size={14} color="white" className="inline mr-1" />
                Play
              </Link>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div
      className="group relative bg-surface rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to="/content-detail" state={{ content }}>
        <div className="relative aspect-[2/3] overflow-hidden">
          <Image
            src={content.poster}
            alt={content.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onLoad={() => setImageLoaded(true)}
          />
          
          {!imageLoaded && (
            <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
          )}

          {/* Hover Overlay */}
          <div className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <button
              onClick={handleQuickPlay}
              className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition-colors duration-300"
            >
              <Icon name="Play" size={24} color="white" />
            </button>
          </div>

          {/* Quality Badge */}
          <div className="absolute top-2 right-2 bg-accent/90 backdrop-blur-sm rounded px-2 py-1">
            <span className="text-xs font-semibold text-black">{content.quality}</span>
          </div>

          {/* Watchlist Button */}
          <button
            onClick={handleWatchlistToggle}
            className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm rounded-full p-2 hover:bg-black/90 transition-colors duration-300"
          >
            <Icon 
              name={content.isInWatchlist ? "Check" : "Plus"} 
              size={16} 
              color={content.isInWatchlist ? "#FFD700" : "white"} 
            />
          </button>

          {/* Progress Bar */}
          {content.watchProgress > 0 && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm">
              <div className="h-1 bg-white/20">
                <div 
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${content.watchProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Preview Tooltip */}
          {showPreview && (
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full bg-surface border border-white/20 rounded-lg p-3 z-1100 w-64 animate-scale-in">
              <h4 className="font-semibold text-white mb-1">{content.title}</h4>
              <p className="text-xs text-text-secondary mb-2 line-clamp-2">
                {content.description}
              </p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-text-secondary">{content.year}</span>
                <span className={`font-semibold ${getRatingColor(content.rating)}`}>
                  ★ {content.rating}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="p-3">
          <h3 className="font-heading font-semibold text-white text-sm mb-1 truncate group-hover:text-primary transition-colors duration-300">
            {content.title}
          </h3>
          
          <div className="flex items-center justify-between text-xs text-text-secondary mb-2">
            <span className="capitalize">{content.type}</span>
            <span>{content.year}</span>
          </div>

          <div className="flex flex-wrap gap-1 mb-2">
            {content.genre.slice(0, 2).map((genre, index) => (
              <span
                key={index}
                className="bg-white/10 text-text-secondary text-xs px-2 py-1 rounded-full"
              >
                {genre}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <span className={`text-sm font-semibold ${getRatingColor(content.rating)}`}>
              ★ {content.rating}
            </span>
            <span className="text-xs text-text-secondary">
              {formatDuration(content.duration)}
            </span>
          </div>

          {content.watchProgress > 0 && (
            <div className="mt-2 text-xs text-primary">
              {content.watchProgress}% watched
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ContentCard;