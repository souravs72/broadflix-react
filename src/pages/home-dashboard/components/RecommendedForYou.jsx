import React from 'react';
import ContentCarousel from './ContentCarousel';

const RecommendedForYou = () => {
  const recommendedData = [
    {
      id: 14,
      title: "The Crown",
      subtitle: "Season 5",
      thumbnail: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=600&fit=crop",
      year: 2022,
      rating: "TV-MA",
      genre: "Historical Drama",
      duration: 58,
      imdbRating: 8.9,
      quality: "4K",
      isNew: false
    },
    {
      id: 15,
      title: "Narcos",
      subtitle: "Complete Series",
      thumbnail: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
      year: 2017,
      rating: "TV-MA",
      genre: "Crime Biography",
      duration: 49,
      imdbRating: 8.8,
      quality: "4K",
      isNew: false
    },
    {
      id: 16,
      title: "House of Cards",
      subtitle: "Complete Series",
      thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
      year: 2018,
      rating: "TV-MA",
      genre: "Political Drama",
      duration: 51,
      imdbRating: 8.7,
      quality: "4K",
      isNew: false
    },
    {
      id: 17,
      title: "Mindhunter",
      subtitle: "Complete Series",
      thumbnail: "https://images.unsplash.com/photo-1489599735734-79b4f9ab7c34?w=400&h=600&fit=crop",
      year: 2019,
      rating: "TV-MA",
      genre: "Crime Thriller",
      duration: 54,
      imdbRating: 8.6,
      quality: "4K",
      isNew: false
    },
    {
      id: 18,
      title: "Black Mirror",
      subtitle: "Complete Series",
      thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      year: 2019,
      rating: "TV-MA",
      genre: "Sci-Fi Anthology",
      duration: 60,
      imdbRating: 8.8,
      quality: "4K",
      isNew: false
    },
    {
      id: 19,
      title: "The Haunting of Hill House",
      subtitle: "Limited Series",
      thumbnail: "https://images.unsplash.com/photo-1509909756405-be0199881695?w=400&h=600&fit=crop",
      year: 2018,
      rating: "TV-MA",
      genre: "Horror Drama",
      duration: 57,
      imdbRating: 8.6,
      quality: "4K",
      isNew: false
    },
    {
      id: 20,
      title: "Peaky Blinders",
      subtitle: "Complete Series",
      thumbnail: "https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?w=400&h=600&fit=crop",
      year: 2022,
      rating: "TV-MA",
      genre: "Crime Drama",
      duration: 58,
      imdbRating: 8.8,
      quality: "4K",
      isNew: false
    }
  ];

  return (
    <ContentCarousel
      title="Recommended for You"
      items={recommendedData}
      variant="default"
    />
  );
};

export default RecommendedForYou;