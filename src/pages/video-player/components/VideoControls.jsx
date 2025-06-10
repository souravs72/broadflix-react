import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const VideoControls = ({
  isPlaying,
  currentTime,
  duration,
  volume,
  isMuted,
  isFullscreen,
  playbackRate,
  showControls,
  onPlayPause,
  onSeek,
  onVolumeChange,
  onMuteToggle,
  onFullscreenToggle,
  onPlaybackRateChange,
  onPictureInPicture,
  formatTime
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showPlaybackRates, setShowPlaybackRates] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const progressBarRef = useRef(null);
  const volumeTimeoutRef = useRef(null);

  const playbackRates = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  useEffect(() => {
    if (showVolumeSlider) {
      volumeTimeoutRef.current = setTimeout(() => {
        setShowVolumeSlider(false);
      }, 3000);
    }

    return () => {
      if (volumeTimeoutRef.current) {
        clearTimeout(volumeTimeoutRef.current);
      }
    };
  }, [showVolumeSlider]);

  const handleProgressClick = (e) => {
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;
    onSeek(newTime);
  };

  const handleProgressMouseMove = (e) => {
    if (!progressBarRef.current) return;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    const hoverX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, hoverX / rect.width));
    const previewTime = percentage * duration;
    
    setThumbnailPreview({
      time: previewTime,
      x: hoverX,
      show: true
    });
  };

  const handleProgressMouseLeave = () => {
    setThumbnailPreview(null);
  };

  const handleVolumeMouseEnter = () => {
    setShowVolumeSlider(true);
    if (volumeTimeoutRef.current) {
      clearTimeout(volumeTimeoutRef.current);
    }
  };

  const handleVolumeMouseLeave = () => {
    volumeTimeoutRef.current = setTimeout(() => {
      setShowVolumeSlider(false);
    }, 1000);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
      {/* Progress Bar */}
      <div className="px-4 pb-2">
        <div 
          ref={progressBarRef}
          className="relative h-1 bg-white/30 rounded-full cursor-pointer group hover:h-1.5 transition-all duration-200"
          onClick={handleProgressClick}
          onMouseMove={handleProgressMouseMove}
          onMouseLeave={handleProgressMouseLeave}
        >
          <div 
            className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
          <div 
            className="absolute top-1/2 transform -translate-y-1/2 w-3 h-3 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{ left: `${progress}%`, marginLeft: '-6px' }}
          />

          {/* Thumbnail Preview */}
          {thumbnailPreview && (
            <div 
              className="absolute bottom-full mb-2 transform -translate-x-1/2 bg-surface border border-white/20 rounded-lg p-2 z-10"
              style={{ left: `${thumbnailPreview.x}px` }}
            >
              <div className="text-xs text-white font-data">
                {formatTime(thumbnailPreview.time)}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between px-4 pb-4">
        {/* Left Controls */}
        <div className="flex items-center space-x-4">
          {/* Play/Pause */}
          <button
            onClick={onPlayPause}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-300"
          >
            <Icon 
              name={isPlaying ? "Pause" : "Play"} 
              size={24} 
              color="white" 
            />
          </button>

          {/* Skip Backward */}
          <button
            onClick={() => onSeek(currentTime - 10)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-300"
          >
            <Icon name="SkipBack" size={20} color="white" />
          </button>

          {/* Skip Forward */}
          <button
            onClick={() => onSeek(currentTime + 10)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-300"
          >
            <Icon name="SkipForward" size={20} color="white" />
          </button>

          {/* Volume Controls */}
          <div 
            className="relative flex items-center"
            onMouseEnter={handleVolumeMouseEnter}
            onMouseLeave={handleVolumeMouseLeave}
          >
            <button
              onClick={onMuteToggle}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-300"
            >
              <Icon 
                name={isMuted || volume === 0 ? "VolumeX" : volume < 0.5 ? "Volume1" : "Volume2"} 
                size={20} 
                color="white" 
              />
            </button>

            {/* Volume Slider */}
            {showVolumeSlider && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-surface border border-white/20 rounded-lg p-3">
                <div className="h-20 w-1 bg-white/30 rounded-full relative">
                  <div 
                    className="absolute bottom-0 left-0 w-full bg-primary rounded-full"
                    style={{ height: `${volume * 100}%` }}
                  />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer transform rotate-90 origin-center"
                    style={{ width: '80px', height: '4px', left: '-39px', top: '38px' }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Time Display */}
          <div className="text-white font-data text-sm">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-4">
          {/* Playback Speed */}
          <div className="relative">
            <button
              onClick={() => setShowPlaybackRates(!showPlaybackRates)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-300 text-white text-sm font-data"
            >
              {playbackRate}x
            </button>

            {showPlaybackRates && (
              <div className="absolute bottom-full right-0 mb-2 bg-surface border border-white/20 rounded-lg py-2 z-10">
                {playbackRates.map((rate) => (
                  <button
                    key={rate}
                    onClick={() => {
                      onPlaybackRateChange(rate);
                      setShowPlaybackRates(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm transition-colors duration-300 ${
                      rate === playbackRate 
                        ? 'text-primary bg-primary/20' :'text-white hover:bg-white/10'
                    }`}
                  >
                    {rate}x
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Picture in Picture */}
          <button
            onClick={onPictureInPicture}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-300"
          >
            <Icon name="PictureInPicture" size={20} color="white" />
          </button>

          {/* Fullscreen */}
          <button
            onClick={onFullscreenToggle}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-300"
          >
            <Icon 
              name={isFullscreen ? "Minimize" : "Maximize"} 
              size={20} 
              color="white" 
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoControls;