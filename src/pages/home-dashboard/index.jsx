import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import HeroBanner from './components/HeroBanner';

import ContinueWatching from './components/ContinueWatching';
import TrendingNow from './components/TrendingNow';
import RecommendedForYou from './components/RecommendedForYou';
import RecentlyAdded from './components/RecentlyAdded';
import GenreCarousel from './components/GenreCarousel';
import Icon from '../../components/AppIcon';

const HomeDashboard = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const refreshTimeoutRef = useRef(null);

  // Mock featured content for hero banner
  const featuredContent = {
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
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setShowScrollTop(currentScrollY > 1000);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRefresh = async () => {
    if (isRefreshing) return;
    
    setIsRefreshing(true);
    
    // Simulate API refresh
    await new Promise(resolve => {
      refreshTimeoutRef.current = setTimeout(resolve, 2000);
    });
    
    setIsRefreshing(false);
    console.log('Content refreshed');
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Pull to Refresh Indicator */}
      {isRefreshing && (
        <div className="fixed top-16 left-0 right-0 z-50 bg-primary/90 backdrop-blur-sm text-white text-center py-2">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm font-medium">Refreshing content...</span>
          </div>
        </div>
      )}

      <main className="pt-16">
        {/* Hero Banner */}
        <HeroBanner content={featuredContent} onRefresh={handleRefresh} />

        {/* Content Sections */}
        <div className="space-y-8 pb-8">
          {/* Continue Watching */}
          <ContinueWatching />

          {/* Trending Now */}
          <TrendingNow />

          {/* Recommended For You */}
          <RecommendedForYou />

          {/* Recently Added */}
          <RecentlyAdded />

          {/* Browse by Genre */}
          <GenreCarousel />

          {/* Quick Actions */}
          <section className="px-4 lg:px-6">
            <div className="bg-surface rounded-lg p-6 border border-white/10">
              <h2 className="font-heading font-bold text-xl text-white mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Link
                  to="/content-browse-search"
                  className="flex flex-col items-center space-y-2 p-4 hover:bg-white/5 rounded-lg transition-colors duration-300"
                >
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <Icon name="Search" size={24} color="var(--color-primary)" />
                  </div>
                  <span className="text-sm font-medium text-white text-center">Browse All</span>
                </Link>

                <Link
                  to="/watchlist-management"
                  className="flex flex-col items-center space-y-2 p-4 hover:bg-white/5 rounded-lg transition-colors duration-300"
                >
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                    <Icon name="Heart" size={24} color="var(--color-accent)" />
                  </div>
                  <span className="text-sm font-medium text-white text-center">My List</span>
                </Link>

                <button className="flex flex-col items-center space-y-2 p-4 hover:bg-white/5 rounded-lg transition-colors duration-300">
                  <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center">
                    <Icon name="Download" size={24} color="var(--color-success)" />
                  </div>
                  <span className="text-sm font-medium text-white text-center">Downloads</span>
                </button>

                <Link
                  to="/user-profile-settings"
                  className="flex flex-col items-center space-y-2 p-4 hover:bg-white/5 rounded-lg transition-colors duration-300"
                >
                  <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                    <Icon name="Settings" size={24} color="var(--color-secondary)" />
                  </div>
                  <span className="text-sm font-medium text-white text-center">Settings</span>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={handleScrollToTop}
          className="fixed bottom-6 right-6 w-12 h-12 bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50"
        >
          <Icon name="ArrowUp" size={20} color="white" />
        </button>
      )}

      {/* Bottom Tab Navigation (Mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-surface/95 backdrop-blur-dark border-t border-white/10 lg:hidden z-40">
        <div className="flex items-center justify-around py-2">
          <Link
            to="/home-dashboard"
            className="flex flex-col items-center space-y-1 p-2 text-primary"
          >
            <Icon name="Home" size={20} color="var(--color-primary)" />
            <span className="text-xs font-medium">Home</span>
          </Link>
          
          <Link
            to="/content-browse-search"
            className="flex flex-col items-center space-y-1 p-2 text-text-secondary"
          >
            <Icon name="Search" size={20} color="var(--color-text-secondary)" />
            <span className="text-xs font-medium">Browse</span>
          </Link>
          
          <Link
            to="/watchlist-management"
            className="flex flex-col items-center space-y-1 p-2 text-text-secondary"
          >
            <Icon name="Heart" size={20} color="var(--color-text-secondary)" />
            <span className="text-xs font-medium">My List</span>
          </Link>
          
          <Link
            to="/user-profile-settings"
            className="flex flex-col items-center space-y-1 p-2 text-text-secondary"
          >
            <Icon name="User" size={20} color="var(--color-text-secondary)" />
            <span className="text-xs font-medium">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default HomeDashboard;