import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';

import VideoControls from './components/VideoControls';
import VideoSettings from './components/VideoSettings';
import EpisodeList from './components/EpisodeList';
import RelatedContent from './components/RelatedContent';

const VideoPlayer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  // Get content from navigation state or use mock data
  const contentFromState = location.state?.content;
  const startTime = location.state?.startTime || 0;

  // Mock content data
  const mockContent = {
    id: 1,
    title: "The Dark Knight",
    subtitle: "S1 E1 - Pilot",
    type: "movie",
    duration: 152,
    year: 2008,
    rating: "PG-13",
    genre: "Action, Crime, Drama",
    description: `When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.`,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnail: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=800&h=450&fit=crop",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Michael Caine"],
    director: "Christopher Nolan",
    languages: ["English", "Spanish", "French"],
    subtitles: ["English", "Spanish", "French", "German"],
    qualities: ["4K", "HD", "SD"],
    episodes: [
      { id: 1, title: "Pilot", duration: 45, thumbnail: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=300&h=169&fit=crop", current: true },
      { id: 2, title: "The Dark Knight Returns", duration: 48, thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=169&fit=crop" },
      { id: 3, title: "Shadows of Gotham", duration: 52, thumbnail: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=169&fit=crop" }
    ]
  };

  const content = contentFromState || mockContent;

  // Player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(startTime);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [selectedQuality, setSelectedQuality] = useState('HD');
  const [selectedSubtitle, setSelectedSubtitle] = useState('English');
  const [selectedAudio, setSelectedAudio] = useState('English');
  const [showSettings, setShowSettings] = useState(false);
  const [showEpisodes, setShowEpisodes] = useState(false);
  const [isPictureInPicture, setIsPictureInPicture] = useState(false);
  const [watchProgress, setWatchProgress] = useState(0);

  // Related content mock data
  const relatedContent = [
    {
      id: 2,
      title: "Batman Begins",
      thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=169&fit=crop",
      duration: 140,
      year: 2005,
      rating: "PG-13"
    },
    {
      id: 3,
      title: "The Dark Knight Rises",
      thumbnail: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=169&fit=crop",
      duration: 165,
      year: 2012,
      rating: "PG-13"
    },
    {
      id: 4,
      title: "Joker",
      thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=169&fit=crop",
      duration: 122,
      year: 2019,
      rating: "R"
    }
  ];

  // Initialize video
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = startTime;
      
      const handleLoadedMetadata = () => {
        setDuration(video.duration);
        setIsLoading(false);
      };

      const handleTimeUpdate = () => {
        setCurrentTime(video.currentTime);
        const progress = (video.currentTime / video.duration) * 100;
        setWatchProgress(progress);
      };

      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      const handleVolumeChange = () => {
        setVolume(video.volume);
        setIsMuted(video.muted);
      };

      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('play', handlePlay);
      video.addEventListener('pause', handlePause);
      video.addEventListener('volumechange', handleVolumeChange);

      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('pause', handlePause);
        video.removeEventListener('volumechange', handleVolumeChange);
      };
    }
  }, [startTime]);

  // Auto-hide controls
  useEffect(() => {
    if (showControls && isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [showControls, isPlaying]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.target.tagName === 'INPUT') return;

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          togglePlayPause();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          seek(currentTime - 10);
          break;
        case 'ArrowRight':
          e.preventDefault();
          seek(currentTime + 10);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setVolume(Math.min(1, volume + 0.1));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setVolume(Math.max(0, volume - 0.1));
          break;
        case 'KeyF':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'KeyM':
          e.preventDefault();
          toggleMute();
          break;
        case 'Escape':
          if (isFullscreen) {
            exitFullscreen();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [currentTime, volume, isFullscreen]);

  // Fullscreen change handler
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
    }
  };

  const seek = (time) => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = Math.max(0, Math.min(duration, time));
    }
  };

  const handleVolumeChange = (newVolume) => {
    const video = videoRef.current;
    if (video) {
      video.volume = newVolume;
      setVolume(newVolume);
      if (newVolume === 0) {
        setIsMuted(true);
      } else if (isMuted) {
        setIsMuted(false);
      }
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      exitFullscreen();
    }
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  const handlePlaybackRateChange = (rate) => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = rate;
      setPlaybackRate(rate);
    }
  };

  const togglePictureInPicture = async () => {
    const video = videoRef.current;
    if (video) {
      try {
        if (isPictureInPicture) {
          await document.exitPictureInPicture();
          setIsPictureInPicture(false);
        } else {
          await video.requestPictureInPicture();
          setIsPictureInPicture(true);
        }
      } catch (error) {
        console.log('Picture-in-picture not supported');
      }
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
  };

  const handleEpisodeSelect = (episode) => {
    console.log('Playing episode:', episode.title);
    setShowEpisodes(false);
    // Reset video state for new episode
    setCurrentTime(0);
    setWatchProgress(0);
  };

  const handleRelatedContentSelect = (relatedItem) => {
    navigate('/video-player', { 
      state: { 
        content: relatedItem, 
        startTime: 0 
      } 
    });
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Video Player Container */}
      <div 
        ref={containerRef}
        className={`relative ${isFullscreen ? 'fixed inset-0 z-[9999]' : 'w-full'} bg-black`}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => isPlaying && setShowControls(false)}
      >
        {/* Video Element */}
        <div className={`relative ${isFullscreen ? 'h-screen' : 'aspect-video'} bg-black`}>
          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            src={content.videoUrl}
            poster={content.thumbnail}
            preload="metadata"
            onClick={togglePlayPause}
          />

          {/* Loading Spinner */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* Header Overlay */}
          <div className={`absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate(-1)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-300"
                >
                  <Icon name="ArrowLeft" size={24} color="white" />
                </button>
                <div>
                  <h1 className="text-white font-heading font-semibold text-lg">{content.title}</h1>
                  {content.subtitle && (
                    <p className="text-text-secondary text-sm">{content.subtitle}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {/* Cast Button */}
                <button className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-300">
                  <Icon name="Cast" size={20} color="white" />
                </button>

                {/* Episodes Button (for series) */}
                {content.type === 'series' && (
                  <button
                    onClick={() => setShowEpisodes(!showEpisodes)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-300"
                  >
                    <Icon name="List" size={20} color="white" />
                  </button>
                )}

                {/* Settings Button */}
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-300"
                >
                  <Icon name="Settings" size={20} color="white" />
                </button>
              </div>
            </div>
          </div>

          {/* Video Controls */}
          <VideoControls
            isPlaying={isPlaying}
            currentTime={currentTime}
            duration={duration}
            volume={volume}
            isMuted={isMuted}
            isFullscreen={isFullscreen}
            playbackRate={playbackRate}
            showControls={showControls}
            onPlayPause={togglePlayPause}
            onSeek={seek}
            onVolumeChange={handleVolumeChange}
            onMuteToggle={toggleMute}
            onFullscreenToggle={toggleFullscreen}
            onPlaybackRateChange={handlePlaybackRateChange}
            onPictureInPicture={togglePictureInPicture}
            formatTime={formatTime}
          />

          {/* Settings Panel */}
          {showSettings && (
            <VideoSettings
              selectedQuality={selectedQuality}
              selectedSubtitle={selectedSubtitle}
              selectedAudio={selectedAudio}
              playbackRate={playbackRate}
              qualities={content.qualities}
              subtitles={content.subtitles}
              languages={content.languages}
              onQualityChange={setSelectedQuality}
              onSubtitleChange={setSelectedSubtitle}
              onAudioChange={setSelectedAudio}
              onPlaybackRateChange={handlePlaybackRateChange}
              onClose={() => setShowSettings(false)}
            />
          )}
        </div>
      </div>

      {/* Desktop Layout - Sidebar and Content */}
      {!isFullscreen && (
        <div className="hidden lg:flex">
          {/* Main Content Area */}
          <div className="flex-1 p-6">
            {/* Content Information */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl font-heading font-bold text-white mb-2">{content.title}</h1>
                  <div className="flex items-center space-x-4 text-text-secondary mb-4">
                    <span>{content.year}</span>
                    <span>•</span>
                    <span className="bg-white/10 px-2 py-1 rounded text-xs">{content.rating}</span>
                    <span>•</span>
                    <span>{formatTime(content.duration * 60)}</span>
                    <span>•</span>
                    <span>{content.genre}</span>
                  </div>
                  <p className="text-text-secondary leading-relaxed max-w-3xl">{content.description}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-3 ml-6">
                  <button className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors duration-300">
                    <Icon name="Plus" size={18} color="white" />
                    <span>My List</span>
                  </button>
                  <button className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors duration-300">
                    <Icon name="ThumbsUp" size={18} color="white" />
                  </button>
                  <button className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors duration-300">
                    <Icon name="Share2" size={18} color="white" />
                  </button>
                </div>
              </div>

              {/* Cast and Crew */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-heading font-semibold mb-3">Cast</h3>
                  <div className="space-y-2">
                    {content.cast.map((actor, index) => (
                      <div key={index} className="text-text-secondary">{actor}</div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-heading font-semibold mb-3">Director</h3>
                  <div className="text-text-secondary">{content.director}</div>
                </div>
              </div>
            </div>

            {/* Related Content */}
            <RelatedContent
              content={relatedContent}
              onContentSelect={handleRelatedContentSelect}
            />
          </div>

          {/* Sidebar */}
          <div className="w-80 bg-surface border-l border-white/10">
            {/* Episodes List (for series) */}
            {content.type === 'series' && (
              <EpisodeList
                episodes={content.episodes}
                onEpisodeSelect={handleEpisodeSelect}
              />
            )}
          </div>
        </div>
      )}

      {/* Mobile Episodes Panel */}
      {showEpisodes && content.type === 'series' && (
        <div className="lg:hidden fixed inset-0 bg-background z-1100">
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <h2 className="text-xl font-heading font-semibold text-white">Episodes</h2>
            <button
              onClick={() => setShowEpisodes(false)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-300"
            >
              <Icon name="X" size={24} color="white" />
            </button>
          </div>
          <EpisodeList
            episodes={content.episodes}
            onEpisodeSelect={handleEpisodeSelect}
          />
        </div>
      )}

      {/* Mobile Content Info */}
      {!isFullscreen && (
        <div className="lg:hidden p-4 bg-background">
          <h1 className="text-2xl font-heading font-bold text-white mb-2">{content.title}</h1>
          <div className="flex items-center space-x-3 text-text-secondary mb-4 text-sm">
            <span>{content.year}</span>
            <span>•</span>
            <span className="bg-white/10 px-2 py-1 rounded text-xs">{content.rating}</span>
            <span>•</span>
            <span>{formatTime(content.duration * 60)}</span>
          </div>
          <p className="text-text-secondary leading-relaxed mb-6">{content.description}</p>

          {/* Mobile Action Buttons */}
          <div className="flex items-center space-x-3 mb-6">
            <button className="flex-1 flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg transition-colors duration-300">
              <Icon name="Plus" size={18} color="white" />
              <span>My List</span>
            </button>
            <button className="flex items-center justify-center bg-white/10 hover:bg-white/20 text-white p-3 rounded-lg transition-colors duration-300">
              <Icon name="ThumbsUp" size={18} color="white" />
            </button>
            <button className="flex items-center justify-center bg-white/10 hover:bg-white/20 text-white p-3 rounded-lg transition-colors duration-300">
              <Icon name="Share2" size={18} color="white" />
            </button>
          </div>

          {/* Mobile Related Content */}
          <RelatedContent
            content={relatedContent}
            onContentSelect={handleRelatedContentSelect}
          />
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;