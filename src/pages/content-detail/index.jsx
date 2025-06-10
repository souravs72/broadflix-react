// src/pages/content-detail/index.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import ContentInfo from './components/ContentInfo';
import CastCrew from './components/CastCrew';
import EpisodeSelector from './components/EpisodeSelector';
import RelatedContent from './components/RelatedContent';
import ReviewsSection from './components/ReviewsSection';
import BreadcrumbNavigation from './components/BreadcrumbNavigation';

const ContentDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock content data - in real app this would come from API
  const mockContent = {
    id: 1,
    title: "Stranger Things",
    subtitle: "Season 4",
    type: "series", // or "movie"
    description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl. Set in 1980s Indiana, this supernatural thriller follows a group of friends as they search for their missing companion and uncover dark secrets about their government and otherworldly creatures. The fourth season takes the story to new heights with deeper character development and more intense supernatural encounters.",
    year: 2024,
    rating: "TV-14",
    duration: 51,
    imdbRating: 8.7,
    rottenTomatoes: 94,
    genre: ["Sci-Fi", "Thriller", "Drama", "Horror"],
    director: "The Duffer Brothers",
    creator: "The Duffer Brothers",
    language: "English",
    country: "USA",
    quality: "4K",
    isNew: true,
    isInWatchlist: false,
    poster: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
    backdropImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop",
    trailerUrl: "https://example.com/trailer",
    cast: [
      {
        name: "Millie Bobby Brown",
        character: "Eleven",
        image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=200&h=200&fit=crop"
      },
      {
        name: "Finn Wolfhard",
        character: "Mike Wheeler",
        image: "https://images.pixabay.com/photo-2016/11/29/13/14/attractive-1869761_640.jpg"
      },
      {
        name: "David Harbour",
        character: "Jim Hopper",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop"
      },
      {
        name: "Winona Ryder",
        character: "Joyce Byers",
        image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=200&h=200&fit=crop"
      }
    ],
    crew: [
      {
        name: "Matt Duffer",
        role: "Creator/Director",
        image: "https://images.pixabay.com/photo-2016/11/21/12/42/beard-1845166_640.jpg"
      },
      {
        name: "Ross Duffer",
        role: "Creator/Director",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop"
      }
    ],
    seasons: [
      {
        number: 1,
        episodeCount: 8,
        year: 2016,
        poster: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop"
      },
      {
        number: 2,
        episodeCount: 9,
        year: 2017,
        poster: "https://images.pexels.com/photos/1115697/pexels-photo-1115697.jpeg?w=300&h=450&fit=crop"
      },
      {
        number: 3,
        episodeCount: 8,
        year: 2019,
        poster: "https://images.pixabay.com/photo-2016/01/09/18/27/dark-1130742_640.jpg"
      },
      {
        number: 4,
        episodeCount: 9,
        year: 2022,
        poster: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop"
      }
    ],
    episodes: [
      {
        id: 1,
        seasonNumber: 4,
        episodeNumber: 1,
        title: "The Hellfire Club",
        description: "In 1986, the kids have started high school. After a body is found in the woods, Nancy and Jonathan set out to prove that the Upside Down still exists.",
        duration: 78,
        thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=169&fit=crop",
        releaseDate: "2022-05-27",
        watchProgress: 0
      },
      {
        id: 2,
        seasonNumber: 4,
        episodeNumber: 2,
        title: "Vecna\'s Curse",
        description: "Nancy has sobering visions, and El passes an important test. Back in Hawkins, the gang gathers supplies and prepares for battle.",
        duration: 77,
        thumbnail: "https://images.pexels.com/photos/1115697/pexels-photo-1115697.jpeg?w=300&h=169&fit=crop",
        releaseDate: "2022-05-27",
        watchProgress: 65
      }
    ],
    reviews: [
      {
        id: 1,
        userName: "MovieBuff2024",
        userAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop",
        rating: 5,
        comment: "Absolutely incredible season! The Duffer Brothers have outdone themselves with the character development and special effects.",
        date: "2024-01-15",
        likes: 124,
        dislikes: 3
      },
      {
        id: 2,
        userName: "SciFiFan",
        userAvatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=40&h=40&fit=crop",
        rating: 4,
        comment: "Great continuation of the series. Some episodes feel a bit long but overall very entertaining.",
        date: "2024-01-12",
        likes: 89,
        dislikes: 12
      }
    ],
    relatedContent: [
      {
        id: 2,
        title: "Dark",
        type: "series",
        poster: "https://images.pixabay.com/photo-2016/01/09/18/27/dark-1130742_640.jpg",
        rating: 8.8,
        year: 2020,
        genre: ["Sci-Fi", "Thriller"]
      },
      {
        id: 3,
        title: "The Umbrella Academy",
        type: "series",
        poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300&h=450&fit=crop",
        rating: 8.0,
        year: 2019,
        genre: ["Sci-Fi", "Action"]
      }
    ]
  };

  useEffect(() => {
    // Get content from location state or fetch from API
    const contentFromState = location.state?.content;
    if (contentFromState) {
      setContent(contentFromState);
    } else {
      // Use mock data or fetch from API based on ID
      setContent(mockContent);
    }
    setLoading(false);
  }, [location.state]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="animate-pulse text-white">Loading content...</div>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center text-white">
            <h1 className="text-2xl font-bold mb-4">Content Not Found</h1>
            <button
              onClick={() => navigate('/home-dashboard')}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-colors duration-300"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Main Content */}
      <main className="pt-16">
        {/* Breadcrumb Navigation */}
        <BreadcrumbNavigation content={content} />
        
        {/* Hero Section */}
        <HeroSection content={content} />
        
        {/* Content Information */}
        <ContentInfo content={content} />
        
        {/* Cast & Crew */}
        <CastCrew cast={content.cast} crew={content.crew} />
        
        {/* Episode Selector (for TV series only) */}
        {content.type === 'series' && (
          <EpisodeSelector 
            seasons={content.seasons} 
            episodes={content.episodes} 
            currentSeason={4}
          />
        )}
        
        {/* Reviews Section */}
        <ReviewsSection 
          reviews={content.reviews} 
          averageRating={content.imdbRating}
          contentId={content.id}
        />
        
        {/* Related Content */}
        <RelatedContent 
          relatedItems={content.relatedContent} 
          currentGenre={content.genre[0]}
        />
      </main>
    </div>
  );
};

export default ContentDetail;