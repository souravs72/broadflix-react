import React from 'react';
import ContentCarousel from './ContentCarousel';

const TrendingNow = () => {
  const trendingData = [
    {
      id: 7,
      title: "Wednesday",
      subtitle: "Limited Series",
      thumbnail: "https://images.unsplash.com/photo-1509909756405-be0199881695?w=400&h=600&fit=crop",
      year: 2022,
      rating: "TV-14",
      genre: "Dark Comedy",
      duration: 45,
      imdbRating: 8.1,
      quality: "4K",
      isNew: true
    },
    {
      id: 8,
      title: "The Queen\'s Gambit",
      subtitle: "Limited Series",
      thumbnail: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=600&fit=crop",
      year: 2020,
      rating: "TV-MA",
      genre: "Drama",
      duration: 60,
      imdbRating: 8.5,
      quality: "4K",
      isNew: false
    },
    {
      id: 9,
      title: "Lupin",
      subtitle: "Part 3",
      thumbnail: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
      year: 2023,
      rating: "TV-MA",
      genre: "Crime Mystery",
      duration: 52,
      imdbRating: 7.5,
      quality: "4K",
      isNew: true
    },
    {
      id: 10,
      title: "Dark",
      subtitle: "Complete Series",
      thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
      year: 2020,
      rating: "TV-MA",
      genre: "Sci-Fi Mystery",
      duration: 60,
      imdbRating: 8.8,
      quality: "4K",
      isNew: false
    },
    {
      id: 11,
      title: "Bridgerton",
      subtitle: "Season 2",
      thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      year: 2022,
      rating: "TV-MA",
      genre: "Period Romance",
      duration: 62,
      imdbRating: 7.3,
      quality: "4K",
      isNew: false
    },
    {
      id: 12,
      title: "The Umbrella Academy",
      subtitle: "Season 3",
      thumbnail: "https://images.unsplash.com/photo-1489599735734-79b4f9ab7c34?w=400&h=600&fit=crop",
      year: 2022,
      rating: "TV-14",
      genre: "Superhero",
      duration: 50,
      imdbRating: 7.9,
      quality: "4K",
      isNew: false
    },
    {
      id: 13,
      title: "Elite",
      subtitle: "Season 5",
      thumbnail: "https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?w=400&h=600&fit=crop",
      year: 2022,
      rating: "TV-MA",
      genre: "Teen Drama",
      duration: 50,
      imdbRating: 7.5,
      quality: "HD",
      isNew: false
    }
  ];

  return (
    <ContentCarousel
      title="Trending Now"
      items={trendingData}
      variant="default"
    />
  );
};

export default TrendingNow;