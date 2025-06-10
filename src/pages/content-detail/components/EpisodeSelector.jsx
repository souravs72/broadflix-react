// src/pages/content-detail/components/EpisodeSelector.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const EpisodeSelector = ({ seasons = [], episodes = [], currentSeason = 1 }) => {
  const [selectedSeason, setSelectedSeason] = useState(currentSeason);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Filter episodes for selected season
  const seasonEpisodes = episodes?.filter(ep => ep.seasonNumber === selectedSeason) || [];
  const selectedSeasonData = seasons?.find(s => s.number === selectedSeason);

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getWatchedProgress = (episode) => {
    return episode.watchProgress || 0;
  };

  const handleEpisodePlay = (episode) => {
    console.log('Playing episode:', episode.title);
  };

  if (!seasons?.length) {
    return null;
  }

  return (
    <section className="px-4 lg:px-6 py-12 border-b border-white/10">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div>
            <h2 className="font-heading font-bold text-2xl text-white mb-2">Episodes</h2>
            <p className="text-text-secondary">
              {selectedSeasonData?.episodeCount} episodes • {selectedSeasonData?.year}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Season Selector */}
            <div className="relative">
              <select
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(parseInt(e.target.value))}
                className="bg-surface border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none appearance-none pr-10 min-w-[140px]"
              >
                {seasons.map((season) => (
                  <option key={season.number} value={season.number}>
                    Season {season.number}
                  </option>
                ))}
              </select>
              <Icon 
                name="ChevronDown" 
                size={16} 
                color="#B3B3B3" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" 
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex bg-surface rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-all duration-300 ${
                  viewMode === 'grid' ?'bg-primary text-white' :'text-text-secondary hover:text-white'
                }`}
              >
                <Icon name="Grid3X3" size={16} color="currentColor" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-all duration-300 ${
                  viewMode === 'list' ?'bg-primary text-white' :'text-text-secondary hover:text-white'
                }`}
              >
                <Icon name="List" size={16} color="currentColor" />
              </button>
            </div>
          </div>
        </div>

        {/* Season Preview Card */}
        <div className="bg-surface rounded-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-32 h-48 flex-shrink-0 mx-auto lg:mx-0">
              <Image
                src={selectedSeasonData?.poster}
                alt={`Season ${selectedSeason}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h3 className="font-heading font-bold text-xl text-white mb-2">
                Season {selectedSeason}
              </h3>
              <p className="text-text-secondary mb-4">
                {selectedSeasonData?.episodeCount} episodes • Released in {selectedSeasonData?.year}
              </p>
              <p className="text-text-secondary leading-relaxed mb-4">
                Continue the thrilling journey in Season {selectedSeason}. New mysteries unfold as our characters face their greatest challenges yet.
              </p>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm">
                  Latest Season
                </span>
                <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm">
                  4K Available
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Episodes Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {seasonEpisodes.map((episode, index) => {
              const progress = getWatchedProgress(episode);
              const isWatched = progress === 100;
              const isPartiallyWatched = progress > 0 && progress < 100;

              return (
                <div
                  key={episode.id}
                  className="group bg-surface hover:bg-surface/80 rounded-lg overflow-hidden transition-all duration-300 cursor-pointer hover:scale-105"
                  onClick={() => handleEpisodePlay(episode)}
                >
                  <div className="relative aspect-video">
                    <Image
                      src={episode.thumbnail}
                      alt={episode.title}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-300">
                        <Icon name="Play" size={24} color="white" />
                      </div>
                    </div>

                    {/* Episode Number */}
                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm rounded px-2 py-1">
                      <span className="text-xs font-data text-white">{episode.episodeNumber}</span>
                    </div>

                    {/* Duration */}
                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded px-2 py-1">
                      <span className="text-xs font-data text-white">{formatDuration(episode.duration)}</span>
                    </div>

                    {/* Progress Bar */}
                    {isPartiallyWatched && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/50">
                        <div 
                          className="h-full bg-primary transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    )}

                    {/* Watched Indicator */}
                    {isWatched && (
                      <div className="absolute bottom-3 right-3 bg-success/90 backdrop-blur-sm rounded-full p-1">
                        <Icon name="Check" size={12} color="white" />
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="font-heading font-semibold text-white text-sm lg:text-base mb-2 line-clamp-1 group-hover:text-primary transition-colors duration-300">
                      {episode.title}
                    </h3>
                    <p className="text-text-secondary text-sm line-clamp-2 mb-3">
                      {episode.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-text-secondary">
                      <span>Episode {episode.episodeNumber}</span>
                      {isWatched && (
                        <span className="flex items-center space-x-1 text-success">
                          <Icon name="Check" size={12} color="var(--color-success)" />
                          <span>Watched</span>
                        </span>
                      )}
                      {isPartiallyWatched && (
                        <span className="flex items-center space-x-1 text-primary">
                          <Icon name="Clock" size={12} color="var(--color-primary)" />
                          <span>{Math.round(progress)}%</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4">
            {seasonEpisodes.map((episode, index) => {
              const progress = getWatchedProgress(episode);
              const isWatched = progress === 100;
              const isPartiallyWatched = progress > 0 && progress < 100;

              return (
                <div
                  key={episode.id}
                  className="group bg-surface hover:bg-surface/80 rounded-lg p-4 transition-all duration-300 cursor-pointer"
                  onClick={() => handleEpisodePlay(episode)}
                >
                  <div className="flex space-x-4">
                    {/* Episode Thumbnail */}
                    <div className="relative w-32 h-20 flex-shrink-0 rounded overflow-hidden">
                      <Image
                        src={episode.thumbnail}
                        alt={episode.title}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Icon name="Play" size={16} color="white" />
                      </div>

                      {/* Progress Bar */}
                      {isPartiallyWatched && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/50">
                          <div 
                            className="h-full bg-primary"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Episode Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-heading font-semibold text-white text-lg mb-1 truncate group-hover:text-primary transition-colors duration-300">
                            {episode.episodeNumber}. {episode.title}
                          </h3>
                          <div className="text-sm text-text-secondary">
                            {formatDuration(episode.duration)} • {episode.releaseDate}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-4">
                          {isWatched && (
                            <Icon name="Check" size={16} color="var(--color-success)" />
                          )}
                          <Link
                            to="/video-player"
                            state={{ episode }}
                            className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded text-sm transition-colors duration-300"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Play
                          </Link>
                        </div>
                      </div>

                      <p className="text-text-secondary text-sm line-clamp-2">
                        {episode.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Season Navigation */}
        <div className="flex items-center justify-between mt-8 pt-8 border-t border-white/10">
          <button
            onClick={() => setSelectedSeason(Math.max(1, selectedSeason - 1))}
            disabled={selectedSeason === 1}
            className="flex items-center space-x-2 bg-surface hover:bg-surface/80 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-all duration-300"
          >
            <Icon name="ChevronLeft" size={16} color="white" />
            <span>Previous Season</span>
          </button>
          
          <span className="text-text-secondary">
            Season {selectedSeason} of {seasons.length}
          </span>
          
          <button
            onClick={() => setSelectedSeason(Math.min(seasons.length, selectedSeason + 1))}
            disabled={selectedSeason === seasons.length}
            className="flex items-center space-x-2 bg-surface hover:bg-surface/80 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-all duration-300"
          >
            <span>Next Season</span>
            <Icon name="ChevronRight" size={16} color="white" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default EpisodeSelector;