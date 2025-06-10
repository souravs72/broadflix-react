import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';

const ContentActionBar = ({ content, variant = 'horizontal', showLabels = true }) => {
  const [isInWatchlist, setIsInWatchlist] = useState(content?.isInWatchlist || false);
  const [userRating, setUserRating] = useState(content?.userRating || 0);
  const [isLiked, setIsLiked] = useState(content?.isLiked || false);
  const [isDisliked, setIsDisliked] = useState(content?.isDisliked || false);
  const [isSharing, setIsSharing] = useState(false);
  const [showRatingTooltip, setShowRatingTooltip] = useState(false);

  useEffect(() => {
    if (content) {
      setIsInWatchlist(content.isInWatchlist || false);
      setUserRating(content.userRating || 0);
      setIsLiked(content.isLiked || false);
      setIsDisliked(content.isDisliked || false);
    }
  }, [content]);

  const handleWatchlistToggle = () => {
    setIsInWatchlist(!isInWatchlist);
    console.log(isInWatchlist ? 'Removed from watchlist:' : 'Added to watchlist:', content?.title);
    
    // Optimistic update with micro-feedback
    const button = document.querySelector('[data-action="watchlist"]');
    if (button) {
      button.classList.add('micro-pulse');
      setTimeout(() => button.classList.remove('micro-pulse'), 1000);
    }
  };

  const handleLike = () => {
    if (isLiked) {
      setIsLiked(false);
    } else {
      setIsLiked(true);
      setIsDisliked(false);
    }
    console.log('Liked:', content?.title);
  };

  const handleDislike = () => {
    if (isDisliked) {
      setIsDisliked(false);
    } else {
      setIsDisliked(true);
      setIsLiked(false);
    }
    console.log('Disliked:', content?.title);
  };

  const handleRating = (rating) => {
    setUserRating(rating);
    setShowRatingTooltip(false);
    console.log('Rated:', content?.title, 'Rating:', rating);
  };

  const handleShare = async () => {
    setIsSharing(true);
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: content?.title,
          text: `Check out ${content?.title}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        console.log('Link copied to clipboard');
      } catch (error) {
        console.log('Failed to copy link');
      }
    }
    
    setIsSharing(false);
  };

  const handleDownload = () => {
    console.log('Download:', content?.title);
    // Implement download functionality
  };

  const handleMoreInfo = () => {
    console.log('More info:', content?.title);
  };

  const containerClasses = variant === 'horizontal' ?'flex items-center space-x-4' :'flex flex-col space-y-3';

  const buttonClasses = variant === 'horizontal' ?'flex items-center space-x-2 px-4 py-2' :'flex flex-col items-center space-y-1 px-3 py-2';

  const iconSize = variant === 'horizontal' ? 20 : 18;

  return (
    <div className={`${containerClasses} bg-surface/50 backdrop-blur-sm rounded-lg p-3 border border-white/10`}>
      {/* Play Button */}
      <Link
        to="/video-player"
        state={{ content }}
        className="flex items-center space-x-2 bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
      >
        <Icon name="Play" size={iconSize} color="white" />
        {showLabels && <span>Play</span>}
      </Link>

      {/* Watchlist Toggle */}
      <button
        data-action="watchlist"
        onClick={handleWatchlistToggle}
        className={`${buttonClasses} hover:bg-white/10 rounded-lg transition-all duration-300 ${isInWatchlist ? 'text-accent' : 'text-text-secondary hover:text-white'}`}
        title={isInWatchlist ? 'Remove from My List' : 'Add to My List'}
      >
        <Icon 
          name={isInWatchlist ? "Check" : "Plus"} 
          size={iconSize} 
          color={isInWatchlist ? "#FFD700" : "currentColor"} 
        />
        {showLabels && (
          <span className="text-sm">
            {isInWatchlist ? 'In List' : 'My List'}
          </span>
        )}
      </button>

      {/* Like/Dislike */}
      <div className={variant === 'horizontal' ? 'flex items-center space-x-2' : 'flex flex-col space-y-2'}>
        <button
          onClick={handleLike}
          className={`${buttonClasses} hover:bg-white/10 rounded-lg transition-all duration-300 ${isLiked ? 'text-success' : 'text-text-secondary hover:text-white'}`}
          title="Like"
        >
          <Icon 
            name="ThumbsUp" 
            size={iconSize} 
            color={isLiked ? "#46D369" : "currentColor"}
            fill={isLiked ? "#46D369" : "none"}
          />
          {showLabels && variant === 'vertical' && (
            <span className="text-xs">Like</span>
          )}
        </button>

        <button
          onClick={handleDislike}
          className={`${buttonClasses} hover:bg-white/10 rounded-lg transition-all duration-300 ${isDisliked ? 'text-error' : 'text-text-secondary hover:text-white'}`}
          title="Dislike"
        >
          <Icon 
            name="ThumbsDown" 
            size={iconSize} 
            color={isDisliked ? "#F40612" : "currentColor"}
            fill={isDisliked ? "#F40612" : "none"}
          />
          {showLabels && variant === 'vertical' && (
            <span className="text-xs">Dislike</span>
          )}
        </button>
      </div>

      {/* Rating */}
      <div className="relative">
        <button
          onClick={() => setShowRatingTooltip(!showRatingTooltip)}
          className={`${buttonClasses} hover:bg-white/10 rounded-lg transition-all duration-300 text-text-secondary hover:text-white`}
          title="Rate this content"
        >
          <Icon name="Star" size={iconSize} color={userRating > 0 ? "#FFD700" : "currentColor"} fill={userRating > 0 ? "#FFD700" : "none"} />
          {showLabels && (
            <span className="text-sm">
              {userRating > 0 ? `${userRating}/5` : 'Rate'}
            </span>
          )}
        </button>

        {/* Rating Tooltip */}
        {showRatingTooltip && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-surface border border-white/20 rounded-lg p-3 z-1100 animate-scale-in">
            <div className="flex items-center space-x-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRating(star)}
                  className="hover:scale-110 transition-transform duration-200"
                >
                  <Icon 
                    name="Star" 
                    size={20} 
                    color={star <= userRating ? "#FFD700" : "#B3B3B3"}
                    fill={star <= userRating ? "#FFD700" : "none"}
                  />
                </button>
              ))}
            </div>
            <p className="text-xs text-text-secondary text-center">Rate this content</p>
          </div>
        )}
      </div>

      {/* Share */}
      <button
        onClick={handleShare}
        disabled={isSharing}
        className={`${buttonClasses} hover:bg-white/10 rounded-lg transition-all duration-300 text-text-secondary hover:text-white disabled:opacity-50`}
        title="Share"
      >
        <Icon 
          name={isSharing ? "Loader2" : "Share2"} 
          size={iconSize} 
          color="currentColor"
          className={isSharing ? "animate-spin" : ""}
        />
        {showLabels && (
          <span className="text-sm">
            {isSharing ? 'Sharing...' : 'Share'}
          </span>
        )}
      </button>

      {/* Download */}
      <button
        onClick={handleDownload}
        className={`${buttonClasses} hover:bg-white/10 rounded-lg transition-all duration-300 text-text-secondary hover:text-white`}
        title="Download"
      >
        <Icon name="Download" size={iconSize} color="currentColor" />
        {showLabels && (
          <span className="text-sm">Download</span>
        )}
      </button>

      {/* More Info */}
      <Link
        to="/content-detail"
        state={{ content }}
        className={`${buttonClasses} hover:bg-white/10 rounded-lg transition-all duration-300 text-text-secondary hover:text-white`}
        title="More Info"
      >
        <Icon name="Info" size={iconSize} color="currentColor" />
        {showLabels && (
          <span className="text-sm">Info</span>
        )}
      </Link>
    </div>
  );
};

export default ContentActionBar;