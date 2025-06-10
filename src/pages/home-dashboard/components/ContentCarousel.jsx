import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ContentCarousel = ({ title, items, showProgress = false, variant = 'default' }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [hoveredItem, setHoveredItem] = useState(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const updateScrollButtons = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
      setScrollPosition(scrollLeft);
    };

    updateScrollButtons();
    container.addEventListener('scroll', updateScrollButtons);
    
    const resizeObserver = new ResizeObserver(updateScrollButtons);
    resizeObserver.observe(container);

    return () => {
      container.removeEventListener('scroll', updateScrollButtons);
      resizeObserver.disconnect();
    };
  }, [items]);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;
    const newScrollLeft = direction === 'left' 
      ? container.scrollLeft - scrollAmount
      : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  };

  const handleItemClick = (item) => {
    console.log('Clicked item:', item.title);
  };

  const handleAddToWatchlist = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Added to watchlist:', item.title);
  };

  const getCardClasses = () => {
    switch (variant) {
      case 'large':
        return 'w-80 lg:w-96';
      case 'small':
        return 'w-48 lg:w-56';
      default:
        return 'w-64 lg:w-72';
    }
  };

  const getImageAspect = () => {
    switch (variant) {
      case 'large':
        return 'aspect-video';
      case 'small':
        return 'aspect-[3/4]';
      default:
        return 'aspect-[16/10]';
    }
  };

  if (!items || items.length === 0) {
    return (
      <section className="px-4 lg:px-6">
        <div className="mb-6">
          <h2 className="font-heading font-bold text-xl text-white">{title}</h2>
        </div>
        <div className="flex space-x-4 overflow-hidden">
          {[...Array(6)].map((_, index) => (
            <div key={index} className={`${getCardClasses()} flex-shrink-0 animate-pulse`}>
              <div className={`${getImageAspect()} bg-white/10 rounded-lg mb-3`}></div>
              <div className="h-4 bg-white/10 rounded mb-2"></div>
              <div className="h-3 bg-white/10 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 lg:px-6 group">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-bold text-xl lg:text-2xl text-white">{title}</h2>
        <Link
          to="/content-browse-search"
          className="text-text-secondary hover:text-white transition-colors duration-300 text-sm font-medium"
        >
          View All
        </Link>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Left Scroll Button */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/70 hover:bg-black/90 text-white rounded-full z-10 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
          >
            <Icon name="ChevronLeft" size={24} color="white" />
          </button>
        )}

        {/* Right Scroll Button */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/70 hover:bg-black/90 text-white rounded-full z-10 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
          >
            <Icon name="ChevronRight" size={24} color="white" />
          </button>
        )}

        {/* Content Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((item, index) => (
            <Link
              key={item.id || index}
              to="/content-detail"
              state={{ content: item }}
              className={`${getCardClasses()} flex-shrink-0 group/item cursor-pointer`}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => handleItemClick(item)}
            >
              <div className="relative overflow-hidden rounded-lg transition-transform duration-300 group-hover/item:scale-105">
                {/* Image Container */}
                <div className={`${getImageAspect()} relative overflow-hidden bg-surface`}>
                  <Image
                    src={item.thumbnail || item.poster}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/40 transition-all duration-300">
                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-300">
                        <Icon name="Play" size={24} color="white" />
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={(e) => handleAddToWatchlist(e, item)}
                        className="w-10 h-10 bg-black/70 hover:bg-black/90 text-white rounded-full transition-all duration-300 hover:scale-110"
                      >
                        <Icon name="Plus" size={16} color="white" />
                      </button>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {showProgress && item.watchProgress > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/50">
                      <div 
                        className="h-full bg-primary transition-all duration-500"
                        style={{ width: `${item.watchProgress}%` }}
                      ></div>
                    </div>
                  )}

                  {/* Quality Badge */}
                  {item.quality && (
                    <div className="absolute top-3 left-3 bg-accent text-black text-xs font-bold px-2 py-1 rounded">
                      {item.quality}
                    </div>
                  )}

                  {/* Duration Badge */}
                  {item.duration && (
                    <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded">
                      {item.duration}m
                    </div>
                  )}

                  {/* New Badge */}
                  {item.isNew && (
                    <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                      NEW
                    </div>
                  )}
                </div>

                {/* Content Info */}
                <div className="pt-3">
                  <h3 className="font-heading font-semibold text-white text-sm lg:text-base mb-1 line-clamp-1 group-hover/item:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  
                  {item.subtitle && (
                    <p className="text-text-secondary text-xs lg:text-sm mb-2 line-clamp-1">
                      {item.subtitle}
                    </p>
                  )}

                  {/* Metadata */}
                  <div className="flex items-center space-x-2 text-xs text-text-secondary">
                    {item.year && <span>{item.year}</span>}
                    {item.rating && (
                      <>
                        <span>•</span>
                        <span className="bg-white/10 px-1.5 py-0.5 rounded">{item.rating}</span>
                      </>
                    )}
                    {item.imdbRating && (
                      <>
                        <span>•</span>
                        <div className="flex items-center space-x-1">
                          <Icon name="Star" size={10} color="var(--color-accent)" fill="var(--color-accent)" />
                          <span>{item.imdbRating}</span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Genre */}
                  {item.genre && (
                    <p className="text-text-secondary text-xs mt-1 line-clamp-1">
                      {item.genre}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContentCarousel;