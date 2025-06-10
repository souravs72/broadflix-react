// src/pages/content-detail/components/CastCrew.jsx
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CastCrew = ({ cast = [], crew = [] }) => {
  const [activeSection, setActiveSection] = useState('cast');
  const [showAll, setShowAll] = useState(false);

  const displayItems = showAll 
    ? (activeSection === 'cast' ? cast : crew)
    : (activeSection === 'cast' ? cast?.slice(0, 8) : crew?.slice(0, 8));

  const hasMore = activeSection === 'cast' 
    ? cast?.length > 8 
    : crew?.length > 8;

  if (!cast?.length && !crew?.length) {
    return null;
  }

  return (
    <section className="px-4 lg:px-6 py-12 border-b border-white/10">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-heading font-bold text-2xl text-white">Cast & Crew</h2>
          
          {/* Section Switcher */}
          <div className="flex bg-surface rounded-lg p-1">
            <button
              onClick={() => {
                setActiveSection('cast');
                setShowAll(false);
              }}
              className={`px-4 py-2 rounded-md transition-all duration-300 ${
                activeSection === 'cast' ?'bg-primary text-white shadow-md' :'text-text-secondary hover:text-white'
              }`}
            >
              Cast ({cast?.length || 0})
            </button>
            <button
              onClick={() => {
                setActiveSection('crew');
                setShowAll(false);
              }}
              className={`px-4 py-2 rounded-md transition-all duration-300 ${
                activeSection === 'crew' ?'bg-primary text-white shadow-md' :'text-text-secondary hover:text-white'
              }`}
            >
              Crew ({crew?.length || 0})
            </button>
          </div>
        </div>

        {/* Cast/Crew Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 lg:gap-6">
          {displayItems?.map((person, index) => (
            <div
              key={index}
              className="group cursor-pointer"
              onClick={() => console.log('View person details:', person.name)}
            >
              <div className="relative overflow-hidden rounded-lg mb-3 aspect-[3/4] bg-surface">
                <Image
                  src={person.image}
                  alt={person.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <Icon name="User" size={24} color="white" className="mx-auto mb-2" />
                    <span className="text-white text-sm font-medium">View Profile</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="font-heading font-semibold text-white text-sm lg:text-base mb-1 line-clamp-1 group-hover:text-primary transition-colors duration-300">
                  {person.name}
                </h3>
                <p className="text-text-secondary text-xs lg:text-sm line-clamp-2">
                  {activeSection === 'cast' ? person.character : person.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Show More/Less Button */}
        {hasMore && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex items-center space-x-2 bg-surface hover:bg-surface/80 text-white px-6 py-3 rounded-lg transition-all duration-300 mx-auto hover:scale-105"
            >
              <Icon 
                name={showAll ? "ChevronUp" : "ChevronDown"} 
                size={16} 
                color="white" 
              />
              <span>
                {showAll 
                  ? 'Show Less' 
                  : `Show All ${activeSection === 'cast' ? cast?.length : crew?.length} ${activeSection === 'cast' ? 'Cast Members' : 'Crew Members'}`
                }
              </span>
            </button>
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4 mt-8 pt-8 border-t border-white/10">
          <button className="flex items-center space-x-2 bg-white/5 hover:bg-white/10 text-text-secondary hover:text-white px-4 py-2 rounded-lg transition-all duration-300">
            <Icon name="Search" size={16} color="currentColor" />
            <span>Search Cast</span>
          </button>
          
          <button className="flex items-center space-x-2 bg-white/5 hover:bg-white/10 text-text-secondary hover:text-white px-4 py-2 rounded-lg transition-all duration-300">
            <Icon name="Filter" size={16} color="currentColor" />
            <span>Filter by Role</span>
          </button>
          
          <button className="flex items-center space-x-2 bg-white/5 hover:bg-white/10 text-text-secondary hover:text-white px-4 py-2 rounded-lg transition-all duration-300">
            <Icon name="Share" size={16} color="currentColor" />
            <span>Share Cast Info</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CastCrew;