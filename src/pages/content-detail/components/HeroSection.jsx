// src/pages/content-detail/components/HeroSection.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const HeroSection = ({ content }) => {
  const [isInWatchlist, setIsInWatchlist] = useState(content?.isInWatchlist || false);
  const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);

  const handleWatchlistToggle = () => {
    setIsInWatchlist(!isInWatchlist);
    console.log('Watchlist toggled for:', content?.title);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: content?.title,
        text: content?.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      console.log('Link copied to clipboard');
    }
  };

  const handlePlayTrailer = () => {
    setIsTrailerPlaying(!isTrailerPlaying);
    console.log('Playing trailer for:', content?.title);
  };

  return (
    <section className="relative min-h-screen max-h-[900px] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src={content?.backdropImage}
          alt={content?.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Poster (Mobile: hidden, Desktop: visible) */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="relative group">
                <Image
                  src={content?.poster}
                  alt={content?.title}
                  className="w-full max-w-sm mx-auto rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
                />
                {/* Quality Badge on Poster */}
                {content?.quality && (
                  <div className="absolute top-4 right-4 bg-accent text-black text-sm font-bold px-3 py-1 rounded">
                    {content?.quality}
                  </div>
                )}
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-9">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {content?.isNew && (
                  <span className="bg-primary text-white text-sm font-bold px-3 py-1 rounded">
                    NEW
                  </span>
                )}
                {content?.quality && (
                  <span className="bg-accent text-black text-sm font-bold px-3 py-1 rounded lg:hidden">
                    {content?.quality}
                  </span>
                )}
                <span className="bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-3 py-1 rounded">
                  {content?.rating}
                </span>
                <span className="bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-3 py-1 rounded capitalize">
                  {content?.type}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-heading font-bold text-4xl lg:text-6xl text-white mb-2 text-shadow-sm">
                {content?.title}
              </h1>
              
              {content?.subtitle && (
                <h2 className="font-heading font-semibold text-xl lg:text-2xl text-accent mb-4">
                  {content?.subtitle}
                </h2>
              )}

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-4 mb-6 text-white">
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={16} color="var(--color-accent)" fill="var(--color-accent)" />
                  <span className="font-medium">{content?.imdbRating}</span>
                  <span className="text-text-secondary text-sm">IMDb</span>
                </div>
                {content?.rottenTomatoes && (
                  <div className="flex items-center space-x-1">
                    <span className="text-primary font-medium">{content?.rottenTomatoes}%</span>
                    <span className="text-text-secondary text-sm">RT</span>
                  </div>
                )}
                <span>{content?.year}</span>
                <span>{content?.duration}m</span>
                <span>{content?.language}</span>
              </div>

              {/* Genre Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {content?.genre?.map((genre, index) => (
                  <span
                    key={index}
                    className="bg-white/10 text-white text-sm px-3 py-1 rounded-full hover:bg-white/20 transition-colors duration-300"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="text-lg text-white/90 mb-8 leading-relaxed line-clamp-4 lg:line-clamp-none max-w-4xl">
                {content?.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
                {/* Primary Action - Watch Now */}
                <Link
                  to="/video-player"
                  state={{ content }}
                  className="flex items-center space-x-3 bg-white text-black font-bold px-8 py-4 rounded-lg hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg min-w-fit"
                >
                  <Icon name="Play" size={24} color="black" />
                  <span className="text-lg">Watch Now</span>
                </Link>

                {/* Secondary Actions */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePlayTrailer}
                    className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white font-semibold px-6 py-4 rounded-lg hover:bg-white/30 transition-all duration-300 border border-white/30"
                  >
                    <Icon name={isTrailerPlaying ? "Pause" : "Play"} size={20} color="white" />
                    <span>Trailer</span>
                  </button>

                  <button
                    onClick={handleWatchlistToggle}
                    className={`flex items-center space-x-2 font-semibold px-6 py-4 rounded-lg transition-all duration-300 ${
                      isInWatchlist
                        ? 'bg-success/20 text-success border border-success/50 hover:bg-success/30' :'bg-white/10 text-white border border-white/30 hover:bg-white/20'
                    }`}
                  >
                    <Icon 
                      name={isInWatchlist ? "Check" : "Plus"} 
                      size={20} 
                      color={isInWatchlist ? "var(--color-success)" : "white"} 
                    />
                    <span>{isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}</span>
                  </button>

                  <button
                    onClick={handleShare}
                    className="flex items-center justify-center w-12 h-12 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/30"
                  >
                    <Icon name="Share" size={20} color="white" />
                  </button>
                </div>
              </div>

              {/* Additional Info */}
              <div className="text-white/80 space-y-1">
                {content?.director && (
                  <div>
                    <span className="font-medium">Director: </span>
                    <span>{content?.director}</span>
                  </div>
                )}
                {content?.creator && content?.type === 'series' && (
                  <div>
                    <span className="font-medium">Creator: </span>
                    <span>{content?.creator}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Poster (visible only on mobile) */}
      <div className="lg:hidden absolute bottom-8 right-4 z-20">
        <div className="w-24 h-36 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={content?.poster}
            alt={content?.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;