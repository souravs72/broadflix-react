import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const HeroBanner = ({ content, onRefresh }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredContent = [
    {
      id: 1,
      title: "Stranger Things",
      subtitle: "Season 4",
      description: `When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.
      
Set in 1980s Indiana, this supernatural thriller follows a group of friends as they search for their missing companion and uncover dark secrets about their government and otherworldly creatures.`,
      genre: "Sci-Fi Thriller",
      year: 2024,
      rating: "TV-14",
      duration: 51,
      imdbRating: 8.7,
      backgroundImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop",
      trailerUrl: "https://example.com/trailer",
      cast: ["Millie Bobby Brown", "Finn Wolfhard", "David Harbour"],
      isNew: true,
      quality: "4K"
    },
    {
      id: 2,
      title: "The Crown",
      subtitle: "Final Season",
      description: `Follow the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the twentieth century.
      
This acclaimed series chronicles the life of Queen Elizabeth II from the 1940s to modern times, exploring the personal intrigues, political rivalries, and romantic entanglements that shaped the second half of the twentieth century.`,
      genre: "Historical Drama",
      year: 2024,
      rating: "TV-MA",
      duration: 58,
      imdbRating: 8.9,
      backgroundImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920&h=1080&fit=crop",
      trailerUrl: "https://example.com/trailer2",
      cast: ["Claire Foy", "Olivia Colman", "Imelda Staunton"],
      isNew: true,
      quality: "4K"
    },
    {
      id: 3,
      title: "Wednesday",
      subtitle: "New Series",
      description: `A coming-of-age supernatural mystery comedy horror series that follows Wednesday Addams as she navigates her years as a student at Nevermore Academy.
      
Wednesday attempts to master her emerging psychic ability, thwart a monstrous killing spree that has terrorized the local town, and solve the murder mystery that embroiled her parents.`,
      genre: "Dark Comedy",
      year: 2024,
      rating: "TV-14",
      duration: 45,
      imdbRating: 8.1,
      backgroundImage: "https://images.unsplash.com/photo-1509909756405-be0199881695?w=1920&h=1080&fit=crop",
      trailerUrl: "https://example.com/trailer3",
      cast: ["Jenna Ortega", "Emma Myers", "Enid Sinclair"],
      isNew: true,
      quality: "4K"
    }
  ];

  const currentContent = content || featuredContent[currentSlide];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredContent.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handlePlayTrailer = () => {
    setIsPlaying(!isPlaying);
    console.log('Playing trailer for:', currentContent.title);
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative h-screen max-h-[800px] min-h-[600px] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src={currentContent.backgroundImage}
          alt={currentContent.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-2xl">
            {/* Badges */}
            <div className="flex items-center space-x-3 mb-4">
              {currentContent.isNew && (
                <span className="bg-primary text-white text-sm font-bold px-3 py-1 rounded">
                  NEW
                </span>
              )}
              {currentContent.quality && (
                <span className="bg-accent text-black text-sm font-bold px-3 py-1 rounded">
                  {currentContent.quality}
                </span>
              )}
              <span className="bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-3 py-1 rounded">
                {currentContent.rating}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-heading font-bold text-4xl lg:text-6xl text-white mb-2 text-shadow-sm">
              {currentContent.title}
            </h1>
            
            {currentContent.subtitle && (
              <h2 className="font-heading font-semibold text-xl lg:text-2xl text-accent mb-4">
                {currentContent.subtitle}
              </h2>
            )}

            {/* Metadata */}
            <div className="flex items-center space-x-4 mb-6 text-white">
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={16} color="var(--color-accent)" fill="var(--color-accent)" />
                <span className="font-medium">{currentContent.imdbRating}</span>
              </div>
              <span>{currentContent.year}</span>
              <span>{currentContent.duration}m</span>
              <span>{currentContent.genre}</span>
            </div>

            {/* Description */}
            <p className="text-lg text-white/90 mb-8 leading-relaxed line-clamp-4 lg:line-clamp-none">
              {currentContent.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
              <Link
                to="/video-player"
                state={{ content: currentContent }}
                className="flex items-center space-x-3 bg-white text-black font-bold px-8 py-4 rounded-lg hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <Icon name="Play" size={24} color="black" />
                <span className="text-lg">Play</span>
              </Link>

              <Link
                to="/content-detail"
                state={{ content: currentContent }}
                className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/30 transition-all duration-300 border border-white/30"
              >
                <Icon name="Info" size={24} color="white" />
                <span className="text-lg">More Info</span>
              </Link>

              <button
                onClick={handlePlayTrailer}
                className="flex items-center space-x-3 bg-transparent text-white font-semibold px-6 py-4 rounded-lg hover:bg-white/10 transition-all duration-300 border border-white/50"
              >
                <Icon name={isPlaying ? "Pause" : "Play"} size={20} color="white" />
                <span>Trailer</span>
              </button>
            </div>

            {/* Cast */}
            {currentContent.cast && (
              <div className="text-white/80">
                <span className="font-medium">Starring: </span>
                <span>{currentContent.cast.join(', ')}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {featuredContent.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Audio Control */}
      <button
        onClick={handleMuteToggle}
        className="absolute bottom-8 right-8 w-12 h-12 bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white rounded-full transition-all duration-300 z-20"
      >
        <Icon name={isMuted ? "VolumeX" : "Volume2"} size={20} color="white" />
      </button>

      {/* Pull to Refresh Area (Mobile) */}
      <div 
        className="absolute top-0 left-0 right-0 h-20 z-30 lg:hidden"
        onTouchStart={(e) => {
          const startY = e.touches[0].clientY;
          const handleTouchMove = (e) => {
            const currentY = e.touches[0].clientY;
            const diff = currentY - startY;
            if (diff > 100 && window.scrollY === 0) {
              onRefresh && onRefresh();
              document.removeEventListener('touchmove', handleTouchMove);
            }
          };
          document.addEventListener('touchmove', handleTouchMove);
          document.addEventListener('touchend', () => {
            document.removeEventListener('touchmove', handleTouchMove);
          }, { once: true });
        }}
      />
    </section>
  );
};

export default HeroBanner;