import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const GenreCarousel = () => {
  const genres = [
    {
      id: 1,
      name: "Action & Adventure",
      description: "High-octane thrills and epic adventures",
      image: "https://images.unsplash.com/photo-1489599735734-79b4f9ab7c34?w=400&h=300&fit=crop",
      icon: "Zap",
      color: "from-red-600 to-orange-500",
      count: 245
    },
    {
      id: 2,
      name: "Comedy",
      description: "Laugh-out-loud entertainment",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      icon: "Smile",
      color: "from-yellow-500 to-orange-400",
      count: 189
    },
    {
      id: 3,
      name: "Drama",
      description: "Compelling stories and characters",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
      icon: "Heart",
      color: "from-purple-600 to-pink-500",
      count: 312
    },
    {
      id: 4,
      name: "Horror",
      description: "Spine-chilling scares and thrills",
      image: "https://images.unsplash.com/photo-1509909756405-be0199881695?w=400&h=300&fit=crop",
      icon: "Ghost",
      color: "from-gray-800 to-red-900",
      count: 156
    },
    {
      id: 5,
      name: "Sci-Fi & Fantasy",
      description: "Otherworldly adventures",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
      icon: "Sparkles",
      color: "from-blue-600 to-purple-600",
      count: 198
    },
    {
      id: 6,
      name: "Documentary",
      description: "Real stories, real impact",
      image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=300&fit=crop",
      icon: "FileText",
      color: "from-green-600 to-teal-500",
      count: 134
    },
    {
      id: 7,
      name: "Crime & Thriller",
      description: "Edge-of-your-seat suspense",
      image: "https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?w=400&h=300&fit=crop",
      icon: "Shield",
      color: "from-gray-700 to-gray-900",
      count: 167
    },
    {
      id: 8,
      name: "Romance",
      description: "Love stories that touch the heart",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      icon: "Heart",
      color: "from-pink-500 to-rose-400",
      count: 143
    }
  ];

  return (
    <section className="px-4 lg:px-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-bold text-xl lg:text-2xl text-white">Browse by Genre</h2>
        <Link
          to="/content-browse-search"
          className="text-text-secondary hover:text-white transition-colors duration-300 text-sm font-medium"
        >
          View All Genres
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {genres.map((genre) => (
          <Link
            key={genre.id}
            to="/content-browse-search"
            state={{ genre: genre.name }}
            className="group relative overflow-hidden rounded-lg aspect-[4/3] hover:scale-105 transition-transform duration-300"
          >
            {/* Background Image */}
            <Image
              src={genre.image}
              alt={genre.name}
              className="w-full h-full object-cover"
            />
            
            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${genre.color} opacity-80 group-hover:opacity-70 transition-opacity duration-300`}></div>
            
            {/* Content */}
            <div className="absolute inset-0 p-4 flex flex-col justify-between">
              {/* Icon */}
              <div className="flex justify-end">
                <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Icon name={genre.icon} size={16} color="white" />
                </div>
              </div>
              
              {/* Text Content */}
              <div>
                <h3 className="font-heading font-bold text-white text-lg mb-1 group-hover:text-accent transition-colors duration-300">
                  {genre.name}
                </h3>
                <p className="text-white/80 text-sm mb-2 line-clamp-2">
                  {genre.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-xs">
                    {genre.count} titles
                  </span>
                  <Icon 
                    name="ArrowRight" 
                    size={16} 
                    color="white" 
                    className="group-hover:translate-x-1 transition-transform duration-300" 
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default GenreCarousel;