// src/pages/content-detail/components/ReviewsSection.jsx
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ReviewsSection = ({ reviews = [], averageRating = 0, contentId }) => {
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [sortBy, setSortBy] = useState('recent'); // 'recent', 'rating', 'helpful'
  const [filterRating, setFilterRating] = useState(0); // 0 = all ratings
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

  const handleRatingClick = (rating) => {
    setUserRating(rating);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (userRating === 0 || userComment.trim() === '') {
      return;
    }
    
    console.log('Submitting review:', {
      rating: userRating,
      comment: userComment,
      contentId
    });
    
    // Reset form
    setUserRating(0);
    setUserComment('');
    setShowReviewForm(false);
  };

  const handleLikeReview = (reviewId) => {
    console.log('Liked review:', reviewId);
  };

  const handleDislikeReview = (reviewId) => {
    console.log('Disliked review:', reviewId);
  };

  // Sort reviews
  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'helpful':
        return (b.likes - b.dislikes) - (a.likes - a.dislikes);
      default:
        return new Date(b.date) - new Date(a.date);
    }
  });

  // Filter reviews
  const filteredReviews = filterRating === 0 
    ? sortedReviews 
    : sortedReviews.filter(review => review.rating === filterRating);

  // Paginate reviews
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const paginatedReviews = filteredReviews.slice(startIndex, startIndex + reviewsPerPage);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderStars = (rating, interactive = false, onRatingClick = null) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => interactive && onRatingClick && onRatingClick(star)}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform duration-200`}
            disabled={!interactive}
          >
            <Icon
              name="Star"
              size={16}
              color={star <= rating ? "var(--color-accent)" : "#374151"}
              fill={star <= rating ? "var(--color-accent)" : "none"}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <section className="px-4 lg:px-6 py-12 border-b border-white/10">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div>
            <h2 className="font-heading font-bold text-2xl text-white mb-2">Reviews & Ratings</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {renderStars(Math.round(averageRating))}
                <span className="text-white font-semibold">{averageRating}</span>
                <span className="text-text-secondary">({reviews.length} reviews)</span>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 font-medium"
          >
            Write a Review
          </button>
        </div>

        {/* Rating Distribution */}
        <div className="bg-surface rounded-lg p-6 mb-8">
          <h3 className="font-heading font-semibold text-white mb-4">Rating Distribution</h3>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = reviews.filter(r => r.rating === rating).length;
              const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
              
              return (
                <div key={rating} className="flex items-center space-x-3">
                  <span className="text-white text-sm w-8">{rating} ★</span>
                  <div className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-full bg-accent transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-text-secondary text-sm w-12">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Review Form */}
        {showReviewForm && (
          <div className="bg-surface rounded-lg p-6 mb-8">
            <h3 className="font-heading font-semibold text-white mb-4">Write Your Review</h3>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-white font-medium mb-2">Your Rating</label>
                {renderStars(userRating, true, handleRatingClick)}
              </div>
              
              <div>
                <label className="block text-white font-medium mb-2">Your Review</label>
                <textarea
                  value={userComment}
                  onChange={(e) => setUserComment(e.target.value)}
                  placeholder="Share your thoughts about this content..."
                  className="w-full bg-background border border-white/20 rounded-lg p-3 text-white placeholder-text-secondary focus:border-primary focus:outline-none resize-none h-24"
                  maxLength={500}
                />
                <div className="text-right text-text-secondary text-sm mt-1">
                  {userComment.length}/500
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  type="submit"
                  disabled={userRating === 0 || userComment.trim() === ''}
                  className="bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg transition-colors duration-300"
                >
                  Submit Review
                </button>
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="bg-surface hover:bg-surface/80 text-white px-6 py-2 rounded-lg transition-colors duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filters and Sorting */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label className="text-text-secondary text-sm">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-surface border border-white/20 rounded px-3 py-2 text-white text-sm focus:border-primary focus:outline-none"
              >
                <option value="recent">Most Recent</option>
                <option value="rating">Highest Rating</option>
                <option value="helpful">Most Helpful</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <label className="text-text-secondary text-sm">Filter:</label>
              <select
                value={filterRating}
                onChange={(e) => setFilterRating(parseInt(e.target.value))}
                className="bg-surface border border-white/20 rounded px-3 py-2 text-white text-sm focus:border-primary focus:outline-none"
              >
                <option value={0}>All Ratings</option>
                <option value={5}>5 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={3}>3 Stars</option>
                <option value={2}>2 Stars</option>
                <option value={1}>1 Star</option>
              </select>
            </div>
          </div>
          
          <div className="text-text-secondary text-sm">
            Showing {paginatedReviews.length} of {filteredReviews.length} reviews
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6 mb-8">
          {paginatedReviews.map((review) => (
            <div key={review.id} className="bg-surface rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={review.userAvatar}
                    alt={review.userName}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 mb-3">
                    <div>
                      <h4 className="font-heading font-semibold text-white">{review.userName}</h4>
                      <div className="flex items-center space-x-3">
                        {renderStars(review.rating)}
                        <span className="text-text-secondary text-sm">{formatDate(review.date)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-text-secondary leading-relaxed mb-4">
                    {review.comment}
                  </p>
                  
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleLikeReview(review.id)}
                      className="flex items-center space-x-1 text-text-secondary hover:text-success transition-colors duration-300"
                    >
                      <Icon name="ThumbsUp" size={14} color="currentColor" />
                      <span className="text-sm">{review.likes}</span>
                    </button>
                    
                    <button
                      onClick={() => handleDislikeReview(review.id)}
                      className="flex items-center space-x-1 text-text-secondary hover:text-error transition-colors duration-300"
                    >
                      <Icon name="ThumbsDown" size={14} color="currentColor" />
                      <span className="text-sm">{review.dislikes}</span>
                    </button>
                    
                    <button className="flex items-center space-x-1 text-text-secondary hover:text-white transition-colors duration-300">
                      <Icon name="MessageCircle" size={14} color="currentColor" />
                      <span className="text-sm">Reply</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="flex items-center space-x-1 bg-surface hover:bg-surface/80 disabled:opacity-50 disabled:cursor-not-allowed text-white px-3 py-2 rounded transition-colors duration-300"
            >
              <Icon name="ChevronLeft" size={16} color="white" />
              <span>Previous</span>
            </button>
            
            <div className="flex space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 rounded transition-colors duration-300 ${
                    currentPage === page
                      ? 'bg-primary text-white' :'bg-surface hover:bg-surface/80 text-white'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center space-x-1 bg-surface hover:bg-surface/80 disabled:opacity-50 disabled:cursor-not-allowed text-white px-3 py-2 rounded transition-colors duration-300"
            >
              <span>Next</span>
              <Icon name="ChevronRight" size={16} color="white" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewsSection;