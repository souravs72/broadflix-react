import React from 'react';
import ContentCarousel from './ContentCarousel';

const ContinueWatching = () => {
  const continueWatchingData = [
    {
      id: 1,
      title: "Breaking Bad",
      subtitle: "S5 E14 - Ozymandias",
      thumbnail: "https://images.unsplash.com/photo-1489599735734-79b4f9ab7c34?w=400&h=600&fit=crop",
      year: 2013,
      rating: "TV-MA",
      genre: "Crime Drama",
      duration: 47,
      imdbRating: 9.5,
      watchProgress: 65,
      quality: "4K",
      isNew: false
    },
    {
      id: 2,
      title: "The Witcher",
      subtitle: "S2 E8 - Family",
      thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      year: 2021,
      rating: "TV-MA",
      genre: "Fantasy",
      duration: 52,
      imdbRating: 8.2,
      watchProgress: 23,
      quality: "4K",
      isNew: false
    },
    {
      id: 3,
      title: "Squid Game",
      subtitle: "Episode 6 - Gganbu",
      thumbnail: "https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?w=400&h=600&fit=crop",
      year: 2021,
      rating: "TV-MA",
      genre: "Thriller",
      duration: 53,
      imdbRating: 8.0,
      watchProgress: 89,
      quality: "4K",
      isNew: false
    },
    {
      id: 4,
      title: "Money Heist",
      subtitle: "S5 E10 - A Family Tradition",
      thumbnail: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
      year: 2021,
      rating: "TV-MA",
      genre: "Crime Thriller",
      duration: 50,
      imdbRating: 8.3,
      watchProgress: 12,
      quality: "HD",
      isNew: false
    },
    {
      id: 5,
      title: "Ozark",
      subtitle: "S4 E7 - Sanctified",
      thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
      year: 2022,
      rating: "TV-MA",
      genre: "Crime Drama",
      duration: 63,
      imdbRating: 8.4,
      watchProgress: 78,
      quality: "4K",
      isNew: false
    },
    {
      id: 6,
      title: "Stranger Things",
      subtitle: "S4 E9 - The Piggyback",
      thumbnail: "https://images.unsplash.com/photo-1509909756405-be0199881695?w=400&h=600&fit=crop",
      year: 2022,
      rating: "TV-14",
      genre: "Sci-Fi Horror",
      duration: 139,
      imdbRating: 8.7,
      watchProgress: 45,
      quality: "4K",
      isNew: false
    }
  ];

  return (
    <ContentCarousel
      title="Continue Watching"
      items={continueWatchingData}
      showProgress={true}
      variant="large"
    />
  );
};

export default ContinueWatching;