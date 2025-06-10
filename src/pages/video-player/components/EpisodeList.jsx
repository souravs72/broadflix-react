import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const EpisodeList = ({ episodes, onEpisodeSelect }) => {
  const [selectedSeason, setSelectedSeason] = useState(1);

  // Mock seasons data
  const seasons = [
    { number: 1, episodeCount: 10, year: 2023 },
    { number: 2, episodeCount: 8, year: 2024 }
  ];

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getWatchedProgress = (episode) => {
    // Mock progress data
    const progressMap = {
      1: 100, // Fully watched
      2: 65,  // Partially watched
      3: 0    // Not watched
    };
    return progressMap[episode.id] || 0;
  };

  return (
    <div className="h-full flex flex-col">
      {/* Season Selector */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-heading font-semibold text-white">Episodes</h3>
          <div className="relative">
            <select
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(parseInt(e.target.value))}
              className="bg-surface border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:border-primary focus:outline-none appearance-none pr-8"
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
              className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" 
            />
          </div>
        </div>
        
        <div className="text-sm text-text-secondary">
          {seasons.find(s => s.number === selectedSeason)?.episodeCount} episodes • {seasons.find(s => s.number === selectedSeason)?.year}
        </div>
      </div>

      {/* Episodes List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          {episodes.map((episode, index) => {
            const progress = getWatchedProgress(episode);
            const isWatched = progress === 100;
            const isPartiallyWatched = progress > 0 && progress < 100;

            return (
              <div
                key={episode.id}
                className={`group relative bg-white/5 hover:bg-white/10 rounded-lg p-4 transition-all duration-300 cursor-pointer ${
                  episode.current ? 'ring-2 ring-primary bg-primary/10' : ''
                }`}
                onClick={() => onEpisodeSelect(episode)}
              >
                <div className="flex space-x-4">
                  {/* Episode Thumbnail */}
                  <div className="relative w-24 h-14 flex-shrink-0 rounded overflow-hidden">
                    <Image
                      src={episode.thumbnail}
                      alt={episode.title}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Icon name="Play" size={12} color="white" />
                      </div>
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

                    {/* Episode Number */}
                    <div className="absolute top-1 left-1 bg-black/70 backdrop-blur-sm rounded px-1.5 py-0.5">
                      <span className="text-xs font-data text-white">{index + 1}</span>
                    </div>

                    {/* Watched Indicator */}
                    {isWatched && (
                      <div className="absolute top-1 right-1 bg-success/90 backdrop-blur-sm rounded-full p-1">
                        <Icon name="Check" size={10} color="white" />
                      </div>
                    )}
                  </div>

                  {/* Episode Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="font-heading font-semibold text-white truncate pr-2">
                        {episode.title}
                      </h4>
                      <span className="text-xs font-data text-text-secondary flex-shrink-0">
                        {formatDuration(episode.duration)}
                      </span>
                    </div>

                    <p className="text-sm text-text-secondary line-clamp-2 mb-2">
                      {episode.description || `Episode ${index + 1} of the series. An exciting continuation of the story with new developments and character growth.`}
                    </p>

                    {/* Episode Meta */}
                    <div className="flex items-center space-x-3 text-xs text-text-secondary">
                      {episode.current && (
                        <span className="bg-primary/20 text-primary px-2 py-1 rounded-full">
                          Currently Playing
                        </span>
                      )}
                      {isWatched && (
                        <span className="flex items-center space-x-1">
                          <Icon name="Check" size={12} color="#46D369" />
                          <span>Watched</span>
                        </span>
                      )}
                      {isPartiallyWatched && (
                        <span className="flex items-center space-x-1">
                          <Icon name="Clock" size={12} color="#FFB020" />
                          <span>{Math.round(progress)}% watched</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Add to watchlist:', episode.title);
                      }}
                      className="p-1.5 bg-black/50 backdrop-blur-sm hover:bg-black/70 rounded-full transition-colors duration-300"
                    >
                      <Icon name="Plus" size={12} color="white" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('More options:', episode.title);
                      }}
                      className="p-1.5 bg-black/50 backdrop-blur-sm hover:bg-black/70 rounded-full transition-colors duration-300"
                    >
                      <Icon name="MoreVertical" size={12} color="white" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More Episodes */}
        <div className="p-4 border-t border-white/10">
          <button className="w-full bg-white/5 hover:bg-white/10 text-white py-3 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2">
            <Icon name="Plus" size={16} color="white" />
            <span>Load More Episodes</span>
          </button>
        </div>
      </div>

      {/* Season Info */}
      <div className="p-4 border-t border-white/10 bg-surface/50">
        <div className="text-center">
          <h4 className="text-white font-heading font-semibold mb-1">
            Season {selectedSeason}
          </h4>
          <p className="text-sm text-text-secondary">
            {seasons.find(s => s.number === selectedSeason)?.episodeCount} episodes available
          </p>
        </div>
      </div>
    </div>
  );
};

export default EpisodeList;