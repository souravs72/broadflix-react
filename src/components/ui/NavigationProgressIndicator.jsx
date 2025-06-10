import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';
import Image from '../AppImage';

const NavigationProgressIndicator = ({ content, showThumbnail = true, size = 'medium' }) => {
  const [watchProgress, setWatchProgress] = useState(content?.watchProgress || 0);
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    small: 'h-1',
    medium: 'h-1.5',
    large: 'h-2'
  };

  const containerClasses = {
    small: 'p-2',
    medium: 'p-3',
    large: 'p-4'
  };

  useEffect(() => {
    if (content?.watchProgress !== undefined) {
      setWatchProgress(content.watchProgress);
    }
  }, [content?.watchProgress]);

  const handleContinueWatching = () => {
    console.log('Continue watching:', content?.title);
    // Navigate to video player with timestamp
  };

  const handleMarkAsWatched = () => {
    setWatchProgress(100);
    console.log('Marked as watched:', content?.title);
  };

  const handleRemoveFromContinueWatching = () => {
    setWatchProgress(0);
    console.log('Removed from continue watching:', content?.title);
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const formatTimeRemaining = (totalMinutes, progressPercent) => {
    const remainingMinutes = Math.round(totalMinutes * (1 - progressPercent / 100));
    return formatDuration(remainingMinutes);
  };

  if (!content) {
    return (
      <div className="animate-pulse">
        <div className="bg-surface rounded-lg overflow-hidden">
          <div className="aspect-video bg-white/10"></div>
          <div className="p-3">
            <div className="h-4 bg-white/10 rounded mb-2"></div>
            <div className="h-2 bg-white/10 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="group relative bg-surface rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {showThumbnail && (
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={content.thumbnail}
            alt={content.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          
          {/* Play Button Overlay */}
          <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <button
              onClick={handleContinueWatching}
              className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition-colors duration-300"
            >
              <Icon name="Play" size={24} color="white" />
            </button>
          </div>

          {/* Progress Bar */}
          {watchProgress > 0 && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm">
              <div className="relative">
                <div className={`w-full bg-white/20 ${sizeClasses[size]}`}>
                  <div 
                    className={`bg-primary ${sizeClasses[size]} transition-all duration-500 ease-out`}
                    style={{ width: `${watchProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {/* Duration Badge */}
          <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded px-2 py-1">
            <span className="text-xs font-data text-white">
              {formatDuration(content.duration)}
            </span>
          </div>

          {/* Quality Badge */}
          {content.quality && (
            <div className="absolute top-2 left-2 bg-accent/90 backdrop-blur-sm rounded px-2 py-1">
              <span className="text-xs font-semibold text-black">
                {content.quality}
              </span>
            </div>
          )}
        </div>
      )}

      <div className={containerClasses[size]}>
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-heading font-semibold text-white truncate mb-1">
              {content.title}
            </h3>
            {content.subtitle && (
              <p className="text-sm text-text-secondary truncate">
                {content.subtitle}
              </p>
            )}
          </div>
          
          {/* Action Menu */}
          <div className="relative ml-2">
            <button className="p-1 hover:bg-white/10 rounded transition-colors duration-300">
              <Icon name="MoreVertical" size={16} color="#B3B3B3" />
            </button>
          </div>
        </div>

        {/* Progress Information */}
        {watchProgress > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">
                {watchProgress === 100 ? 'Watched' : `${Math.round(watchProgress)}% watched`}
              </span>
              {watchProgress < 100 && (
                <span className="text-text-secondary">
                  {formatTimeRemaining(content.duration, watchProgress)} left
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              {watchProgress < 100 ? (
                <>
                  <Link
                    to="/video-player"
                    state={{ content, startTime: (content.duration * 60 * watchProgress) / 100 }}
                    className="flex-1 bg-primary hover:bg-primary/90 text-white text-sm font-medium py-2 px-3 rounded transition-colors duration-300 text-center"
                  >
                    Continue
                  </Link>
                  <button
                    onClick={handleMarkAsWatched}
                    className="p-2 hover:bg-white/10 rounded transition-colors duration-300"
                    title="Mark as watched"
                  >
                    <Icon name="Check" size={16} color="#B3B3B3" />
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/video-player"
                    state={{ content, startTime: 0 }}
                    className="flex-1 bg-secondary hover:bg-secondary/90 text-white text-sm font-medium py-2 px-3 rounded transition-colors duration-300 text-center"
                  >
                    Watch Again
                  </Link>
                  <button
                    onClick={handleRemoveFromContinueWatching}
                    className="p-2 hover:bg-white/10 rounded transition-colors duration-300"
                    title="Remove from continue watching"
                  >
                    <Icon name="X" size={16} color="#B3B3B3" />
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* No Progress - Show Play Button */}
        {watchProgress === 0 && (
          <Link
            to="/video-player"
            state={{ content, startTime: 0 }}
            className="flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium py-2 px-3 rounded transition-colors duration-300"
          >
            <Icon name="Play" size={16} color="white" />
            <span>Play</span>
          </Link>
        )}

        {/* Additional Metadata */}
        {(content.year || content.rating || content.genre) && (
          <div className="flex items-center space-x-2 mt-2 text-xs text-text-secondary">
            {content.year && <span>{content.year}</span>}
            {content.rating && (
              <>
                <span>•</span>
                <span className="bg-white/10 px-1.5 py-0.5 rounded">{content.rating}</span>
              </>
            )}
            {content.genre && (
              <>
                <span>•</span>
                <span>{content.genre}</span>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavigationProgressIndicator;