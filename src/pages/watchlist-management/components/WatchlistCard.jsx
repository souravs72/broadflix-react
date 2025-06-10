import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const WatchlistCard = ({ item, viewMode, isSelected, onSelect, onRemove, formatRuntime }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);

  const handleRemoveClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowRemoveConfirm(true);
  };

  const confirmRemove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onRemove();
    setShowRemoveConfirm(false);
  };

  const cancelRemove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowRemoveConfirm(false);
  };

  const handleSelectClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onSelect();
  };

  const getProgressColor = (progress) => {
    if (progress === 0) return 'bg-white/20';
    if (progress === 100) return 'bg-success';
    return 'bg-primary';
  };

  const getAvailabilityStatus = () => {
    if (!item.isAvailable) {
      return (
        <div className="absolute top-2 left-2 bg-error/90 backdrop-blur-sm rounded px-2 py-1">
          <span className="text-xs font-semibold text-white">Unavailable</span>
        </div>
      );
    }
    return null;
  };

  if (viewMode === 'list') {
    return (
      <div className={`bg-surface rounded-lg overflow-hidden transition-all duration-300 hover:bg-surface/80 ${isSelected ? 'ring-2 ring-primary' : ''}`}>
        <div className="flex items-center p-4">
          {/* Selection Checkbox */}
          <button
            onClick={handleSelectClick}
            className={`w-5 h-5 rounded border-2 mr-4 flex items-center justify-center transition-colors duration-300 ${
              isSelected ? 'bg-primary border-primary' : 'border-white/30 hover:border-white/50'
            }`}
          >
            {isSelected && <Icon name="Check" size={12} color="white" />}
          </button>

          {/* Poster */}
          <div className="relative w-16 h-24 flex-shrink-0 mr-4">
            <Image
              src={item.poster}
              alt={item.title}
              className="w-full h-full object-cover rounded"
            />
            {getAvailabilityStatus()}
          </div>

          {/* Content Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-semibold text-white truncate mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-text-secondary mb-2">
                  {item.year} • {item.genre} • {formatRuntime(item.runtime)}
                  {item.type === 'series' && ` • ${item.seasons} Season${item.seasons > 1 ? 's' : ''}`}
                </p>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={14} color="#FFD700" fill="#FFD700" />
                    <span className="text-text-secondary">{item.imdbRating}</span>
                  </div>
                  <span className="text-text-secondary">Added {item.dateAdded.toLocaleDateString()}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 ml-4">
                <Link
                  to="/video-player"
                  state={{ content: item }}
                  className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded transition-colors duration-300"
                >
                  <Icon name="Play" size={16} color="white" />
                </Link>
                <Link
                  to="/content-detail"
                  state={{ content: item }}
                  className="bg-white/10 hover:bg-white/20 text-white p-2 rounded transition-colors duration-300"
                >
                  <Icon name="Info" size={16} color="white" />
                </Link>
                <button
                  onClick={handleRemoveClick}
                  className="bg-white/10 hover:bg-error/20 text-white hover:text-error p-2 rounded transition-colors duration-300"
                >
                  <Icon name="Trash2" size={16} color="currentColor" />
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            {item.watchProgress > 0 && (
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs text-text-secondary mb-1">
                  <span>{item.watchProgress === 100 ? 'Watched' : `${item.watchProgress}% watched`}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1">
                  <div 
                    className={`h-1 rounded-full transition-all duration-300 ${getProgressColor(item.watchProgress)}`}
                    style={{ width: `${item.watchProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Remove Confirmation */}
        {showRemoveConfirm && (
          <div className="border-t border-white/10 p-4 bg-error/10">
            <p className="text-sm text-white mb-3">Remove "{item.title}" from your watchlist?</p>
            <div className="flex items-center space-x-2">
              <button
                onClick={confirmRemove}
                className="bg-error hover:bg-error/90 text-white px-4 py-2 rounded text-sm transition-colors duration-300"
              >
                Remove
              </button>
              <button
                onClick={cancelRemove}
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded text-sm transition-colors duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div 
      className={`group relative bg-surface rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg ${isSelected ? 'ring-2 ring-primary' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Selection Checkbox */}
      <button
        onClick={handleSelectClick}
        className={`absolute top-2 left-2 w-5 h-5 rounded border-2 z-10 flex items-center justify-center transition-all duration-300 ${
          isSelected ? 'bg-primary border-primary' : 'border-white/30 hover:border-white/50 bg-black/50 backdrop-blur-sm'
        } ${isHovered || isSelected ? 'opacity-100' : 'opacity-0'}`}
      >
        {isSelected && <Icon name="Check" size={12} color="white" />}
      </button>

      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <Image
          src={item.poster}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {getAvailabilityStatus()}

        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center space-x-2">
            <Link
              to="/video-player"
              state={{ content: item }}
              className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-colors duration-300"
            >
              <Icon name="Play" size={20} color="white" />
            </Link>
            <Link
              to="/content-detail"
              state={{ content: item }}
              className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-colors duration-300"
            >
              <Icon name="Info" size={20} color="white" />
            </Link>
          </div>
        </div>

        {/* Progress Bar */}
        {item.watchProgress > 0 && (
          <div className="absolute bottom-0 left-0 right-0">
            <div className={`h-1 ${getProgressColor(item.watchProgress)} transition-all duration-300`} style={{ width: `${item.watchProgress}%` }}></div>
          </div>
        )}

        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded px-2 py-1">
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={12} color="#FFD700" fill="#FFD700" />
            <span className="text-xs font-data text-white">{item.imdbRating}</span>
          </div>
        </div>
      </div>

      {/* Content Info */}
      <div className="p-3">
        <h3 className="font-heading font-semibold text-white truncate mb-1">
          {item.title}
        </h3>
        <p className="text-sm text-text-secondary truncate mb-2">
          {item.year} • {formatRuntime(item.runtime)}
        </p>
        <p className="text-xs text-text-secondary truncate mb-3">
          {item.genre}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Link
              to="/video-player"
              state={{ content: item }}
              className="bg-primary hover:bg-primary/90 text-white p-2 rounded transition-colors duration-300"
            >
              <Icon name="Play" size={14} color="white" />
            </Link>
            <Link
              to="/content-detail"
              state={{ content: item }}
              className="bg-white/10 hover:bg-white/20 text-white p-2 rounded transition-colors duration-300"
            >
              <Icon name="Info" size={14} color="white" />
            </Link>
          </div>
          
          <button
            onClick={handleRemoveClick}
            className="bg-white/10 hover:bg-error/20 text-white hover:text-error p-2 rounded transition-colors duration-300"
          >
            <Icon name="Trash2" size={14} color="currentColor" />
          </button>
        </div>

        {/* Progress Info */}
        {item.watchProgress > 0 && (
          <div className="mt-2 text-xs text-text-secondary">
            {item.watchProgress === 100 ? 'Watched' : `${item.watchProgress}% watched`}
          </div>
        )}
      </div>

      {/* Remove Confirmation Modal */}
      {showRemoveConfirm && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-20">
          <div className="bg-surface rounded-lg p-4 m-4 max-w-xs">
            <h4 className="font-semibold text-white mb-2">Remove from Watchlist?</h4>
            <p className="text-sm text-text-secondary mb-4">This will remove "{item.title}" from your watchlist.</p>
            <div className="flex items-center space-x-2">
              <button
                onClick={confirmRemove}
                className="flex-1 bg-error hover:bg-error/90 text-white py-2 px-3 rounded text-sm transition-colors duration-300"
              >
                Remove
              </button>
              <button
                onClick={cancelRemove}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 px-3 rounded text-sm transition-colors duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchlistCard;