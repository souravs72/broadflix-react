// src/pages/content-detail/components/ContentInfo.jsx
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ContentInfo = ({ content }) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'details', label: 'Details', icon: 'FileText' },
    { id: 'technical', label: 'Technical', icon: 'Settings' }
  ];

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const isLongDescription = content?.description?.length > 300;
  const displayDescription = isDescriptionExpanded || !isLongDescription 
    ? content?.description 
    : `${content?.description?.substring(0, 300)}...`;

  return (
    <section className="px-4 lg:px-6 py-12 border-b border-white/10">
      <div className="container mx-auto">
        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-surface rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-md transition-all duration-300 flex-1 justify-center ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-md'
                  : 'text-text-secondary hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon 
                name={tab.icon} 
                size={16} 
                color={activeTab === tab.id ? 'white' : '#B3B3B3'} 
              />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-heading font-bold text-xl text-white mb-4">Synopsis</h3>
                  <div className="text-text-secondary leading-relaxed">
                    <p>{displayDescription}</p>
                    {isLongDescription && (
                      <button
                        onClick={toggleDescription}
                        className="text-primary hover:text-primary/80 transition-colors duration-300 mt-2 font-medium"
                      >
                        {isDescriptionExpanded ? 'Show Less' : 'Read More'}
                      </button>
                    )}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-surface rounded-lg p-4 text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary/20 rounded-lg mx-auto mb-2">
                      <Icon name="Star" size={20} color="var(--color-primary)" />
                    </div>
                    <div className="text-2xl font-bold text-white">{content?.imdbRating}</div>
                    <div className="text-sm text-text-secondary">IMDb Rating</div>
                  </div>
                  
                  <div className="bg-surface rounded-lg p-4 text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-accent/20 rounded-lg mx-auto mb-2">
                      <Icon name="Clock" size={20} color="var(--color-accent)" />
                    </div>
                    <div className="text-2xl font-bold text-white">{content?.duration}m</div>
                    <div className="text-sm text-text-secondary">Duration</div>
                  </div>
                  
                  <div className="bg-surface rounded-lg p-4 text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-success/20 rounded-lg mx-auto mb-2">
                      <Icon name="Calendar" size={20} color="var(--color-success)" />
                    </div>
                    <div className="text-2xl font-bold text-white">{content?.year}</div>
                    <div className="text-sm text-text-secondary">Release Year</div>
                  </div>
                  
                  <div className="bg-surface rounded-lg p-4 text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-warning/20 rounded-lg mx-auto mb-2">
                      <Icon name="Monitor" size={20} color="var(--color-warning)" />
                    </div>
                    <div className="text-2xl font-bold text-white">{content?.quality}</div>
                    <div className="text-sm text-text-secondary">Quality</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'details' && (
              <div className="space-y-6">
                <h3 className="font-heading font-bold text-xl text-white mb-4">Content Details</h3>
                <div className="grid gap-4">
                  <div className="flex justify-between py-3 border-b border-white/10">
                    <span className="text-text-secondary">Type</span>
                    <span className="text-white capitalize">{content?.type}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-white/10">
                    <span className="text-text-secondary">Genres</span>
                    <span className="text-white">{content?.genre?.join(', ')}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-white/10">
                    <span className="text-text-secondary">Language</span>
                    <span className="text-white">{content?.language}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-white/10">
                    <span className="text-text-secondary">Country</span>
                    <span className="text-white">{content?.country}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-white/10">
                    <span className="text-text-secondary">Content Rating</span>
                    <span className="text-white">{content?.rating}</span>
                  </div>
                  {content?.type === 'series' && (
                    <div className="flex justify-between py-3 border-b border-white/10">
                      <span className="text-text-secondary">Seasons</span>
                      <span className="text-white">{content?.seasons?.length} seasons</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'technical' && (
              <div className="space-y-6">
                <h3 className="font-heading font-bold text-xl text-white mb-4">Technical Information</h3>
                <div className="grid gap-4">
                  <div className="flex justify-between py-3 border-b border-white/10">
                    <span className="text-text-secondary">Video Quality</span>
                    <span className="text-white">{content?.quality}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-white/10">
                    <span className="text-text-secondary">Audio</span>
                    <span className="text-white">Dolby Atmos</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-white/10">
                    <span className="text-text-secondary">Subtitles</span>
                    <span className="text-white">Available in 20+ languages</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-white/10">
                    <span className="text-text-secondary">HDR</span>
                    <span className="text-white">HDR10, Dolby Vision</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-white/10">
                    <span className="text-text-secondary">Aspect Ratio</span>
                    <span className="text-white">16:9</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Ratings Card */}
            <div className="bg-surface rounded-lg p-6">
              <h4 className="font-heading font-semibold text-white mb-4">Ratings & Reviews</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name="Star" size={16} color="var(--color-accent)" fill="var(--color-accent)" />
                    <span className="text-text-secondary">IMDb</span>
                  </div>
                  <span className="text-white font-semibold">{content?.imdbRating}/10</span>
                </div>
                {content?.rottenTomatoes && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-primary rounded-full"></div>
                      <span className="text-text-secondary">Rotten Tomatoes</span>
                    </div>
                    <span className="text-white font-semibold">{content?.rottenTomatoes}%</span>
                  </div>
                )}
              </div>
            </div>

            {/* Watch Options */}
            <div className="bg-surface rounded-lg p-6">
              <h4 className="font-heading font-semibold text-white mb-4">Watch Options</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                  <Icon name="Play" size={16} color="var(--color-primary)" />
                  <div>
                    <div className="text-white font-medium">Stream</div>
                    <div className="text-text-secondary text-sm">Available now</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                  <Icon name="Download" size={16} color="var(--color-accent)" />
                  <div>
                    <div className="text-white font-medium">Download</div>
                    <div className="text-text-secondary text-sm">For offline viewing</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Actions */}
            <div className="bg-surface rounded-lg p-6">
              <h4 className="font-heading font-semibold text-white mb-4">Share</h4>
              <div className="grid grid-cols-3 gap-3">
                <button className="flex items-center justify-center p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors duration-300">
                  <Icon name="Share" size={16} color="#B3B3B3" />
                </button>
                <button className="flex items-center justify-center p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors duration-300">
                  <Icon name="MessageCircle" size={16} color="#B3B3B3" />
                </button>
                <button className="flex items-center justify-center p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors duration-300">
                  <Icon name="Copy" size={16} color="#B3B3B3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentInfo;