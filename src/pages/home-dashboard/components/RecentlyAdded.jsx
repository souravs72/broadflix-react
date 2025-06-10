import React from 'react';
import ContentCarousel from './ContentCarousel';

const RecentlyAdded = () => {
  const recentlyAddedData = [
    {
      id: 21,
      title: "Glass Onion",
      subtitle: "A Knives Out Mystery",
      thumbnail: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
      year: 2022,
      rating: "PG-13",
      genre: "Mystery Comedy",
      duration: 139,
      imdbRating: 7.2,
      quality: "4K",
      isNew: true
    },
    {
      id: 22,
      title: "The Gray Man",
      subtitle: "Action Thriller",
      thumbnail: "https://images.unsplash.com/photo-1489599735734-79b4f9ab7c34?w=400&h=600&fit=crop",
      year: 2022,
      rating: "PG-13",
      genre: "Action Thriller",
      duration: 122,
      imdbRating: 6.5,
      quality: "4K",
      isNew: true
    },
    {
      id: 23,
      title: "Enola Holmes 2",
      subtitle: "Mystery Adventure",
      thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      year: 2022,
      rating: "PG-13",
      genre: "Mystery Adventure",
      duration: 129,
      imdbRating: 6.8,
      quality: "4K",
      isNew: true
    },
    {
      id: 24,
      title: "The Adam Project",
      subtitle: "Sci-Fi Adventure",
      thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
      year: 2022,
      rating: "PG-13",
      genre: "Sci-Fi Adventure",
      duration: 106,
      imdbRating: 6.7,
      quality: "4K",
      isNew: true
    },
    {
      id: 25,
      title: "Red Notice",
      subtitle: "Action Comedy",
      thumbnail: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=600&fit=crop",
      year: 2021,
      rating: "PG-13",
      genre: "Action Comedy",
      duration: 118,
      imdbRating: 6.3,
      quality: "4K",
      isNew: true
    },
    {
      id: 26,
      title: "Don\'t Look Up",
      subtitle: "Dark Comedy",
      thumbnail: "https://images.unsplash.com/photo-1509909756405-be0199881695?w=400&h=600&fit=crop",
      year: 2021,
      rating: "R",
      genre: "Dark Comedy",
      duration: 138,
      imdbRating: 7.2,
      quality: "4K",
      isNew: true
    },
    {
      id: 27,
      title: "The Power of the Dog",
      subtitle: "Psychological Drama",
      thumbnail: "https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?w=400&h=600&fit=crop",
      year: 2021,
      rating: "R",
      genre: "Psychological Drama",
      duration: 126,
      imdbRating: 6.8,
      quality: "4K",
      isNew: true
    }
  ];

  return (
    <ContentCarousel
      title="Recently Added"
      items={recentlyAddedData}
      variant="default"
    />
  );
};

export default RecentlyAdded;