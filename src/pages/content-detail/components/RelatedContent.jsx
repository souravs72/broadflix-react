// src/pages/content-detail/components/RelatedContent.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RelatedContent = ({ relatedItems = [], currentGenre = 'Sci-Fi' }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeCategory, setActiveCategory] = useState('similar');
  const scrollContainerRef = useRef(null);

  // Mock additional related content
  const mockRelatedContent = [
    {
      id: 4,
      title: "Black Mirror",
      type: "series",
      poster: "https://images.unsplash.com/photo-1516649760729-5333a2b74fb6?w=300&h=450&fit=crop",
      rating: 8.8,
      year: 2019,
      genre: ["Sci-Fi", "Thriller", "Drama"]
    },
    {
      id: 5,
      title: "Westworld",
      type: "series",
      poster: "https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg?w=300&h=450&fit=crop",
      rating: 8.6,
      year: 2020,
      genre: ["Sci-Fi", "Western", "Drama"]
    },
    {
      id: 6,
      title: "Altered Carbon",
      type: "series",
      poster: "https://images.pixabay.com/photo-2016/11/29/13/14/attractive-1869761_640.jpg",
      rating: 8.0,
      year: 2018,
      genre: ["Sci-Fi", "Action", "Thriller"]
    },
    {
      id: 7,
      title: "The OA",
      type: "series",
      poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300&h=450&fit=crop",
      rating: 7.8,
      year: 2019,
      genre: ["Sci-Fi", "Mystery", "Drama"]
    },
    {
      id: 8,
      title: "Russian Doll",
      type: "series",
      poster: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=300&h=450&fit=crop",
      rating: 7.8,
      year: 2019,
      genre: ["Sci-Fi", "Comedy", "Drama"]
    }
  ];

  const allRelatedContent = [...relatedItems, ...mockRelatedContent];

  const categories = {
    similar: {
      label: 'More Like This',
      items: allRelatedContent.filter(item => 
        item.genre.some(g => g === currentGenre)
      )
    },
    trending: {
      label: 'Trending Now',
      items: allRelatedContent.filter(item => item.rating >= 8.0)
    },
    recent: {
      label: 'Recently Added',
      items: allRelatedContent.filter(item => item.year >= 2020)
    }
  };

  const currentItems = categories[activeCategory]?.items || [];

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
  }, [currentItems]);

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

  const handleAddToWatchlist = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Added to watchlist:', item.title);
  };

  if (!currentItems.length) {
    return null;
  }

  return (
    <section className="px-4 lg:px-6 py-12">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <h2 className="font-heading font-bold text-2xl text-white">Related Content</h2>
          
          {/* Category Tabs */}
          <div className="flex bg-surface rounded-lg p-1">
            {Object.entries(categories).map(([key, category]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-4 py-2 rounded-md transition-all duration-300 text-sm font-medium ${
                  activeCategory === key
                    ? 'bg-primary text-white shadow-md'
                    : 'text-text-secondary hover:text-white'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Carousel */}
        <div className="relative group">
          {/* Left Scroll Button */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/70 hover:bg-black/90 text-white rounded-full z-10 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 -ml-6"
            >
              <Icon name="ChevronLeft" size={24} color="white" />
            </button>
          )}

          {/* Right Scroll Button */}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/70 hover:bg-black/90 text-white rounded-full z-10 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 -mr-6"
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
            {currentItems.map((item) => (
              <Link
                key={item.id}
                to="/content-detail"
                state={{ content: item }}
                className="w-64 lg:w-72 flex-shrink-0 group/item cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-lg transition-transform duration-300 group-hover/item:scale-105">
                  {/* Image Container */}
                  <div className="aspect-[16/10] relative overflow-hidden bg-surface">
                    <Image
                      src={item.poster}
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

                    {/* Type Badge */}
                    <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded capitalize">
                      {item.type}
                    </div>
                  </div>

                  {/* Content Info */}
                  <div className="pt-3">
                    <h3 className="font-heading font-semibold text-white text-sm lg:text-base mb-1 line-clamp-1 group-hover/item:text-primary transition-colors duration-300">
                      {item.title}
                    </h3>
                    
                    {/* Metadata */}
                    <div className="flex items-center space-x-2 text-xs text-text-secondary mb-2">
                      <span>{item.year}</span>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={10} color="var(--color-accent)" fill="var(--color-accent)" />
                        <span>{item.rating}</span>
                      </div>
                    </div>

                    {/* Genre */}
                    <div className="flex flex-wrap gap-1">
                      {item.genre?.slice(0, 2).map((genre, index) => (
                        <span
                          key={index}
                          className="bg-white/10 text-text-secondary text-xs px-2 py-1 rounded-full"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Link
            to="/content-browse-search"
            state={{ genre: currentGenre }}
            className="inline-flex items-center space-x-2 bg-surface hover:bg-surface/80 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
          >
            <span>View All {categories[activeCategory]?.label}</span>
            <Icon name="ArrowRight" size={16} color="white" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RelatedContent;