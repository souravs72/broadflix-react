import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import HomeDashboard from "pages/home-dashboard";
import ContentBrowseSearch from "pages/content-browse-search";
import VideoPlayer from "pages/video-player";
import ContentDetail from "pages/content-detail";
import UserProfileSettings from "pages/user-profile-settings";
import WatchlistManagement from "pages/watchlist-management";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<HomeDashboard />} />
          <Route path="/home-dashboard" element={<HomeDashboard />} />
          <Route path="/content-browse-search" element={<ContentBrowseSearch />} />
          <Route path="/video-player" element={<VideoPlayer />} />
          <Route path="/content-detail" element={<ContentDetail />} />
          <Route path="/user-profile-settings" element={<UserProfileSettings />} />
          <Route path="/watchlist-management" element={<WatchlistManagement />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;