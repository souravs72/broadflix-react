import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FilterPanel = ({ isOpen, filters, filterOptions, onFilterChange, onClose }) => {
  const [expandedSections, setExpandedSections] = useState({
    genres: true,
    types: true,
    years: false,
    ratings: false,
    languages: false,
    qualities: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getFilterCount = (filterType) => {
    return filters[filterType]?.length || 0;
  };

  const renderFilterSection = (title, filterType, options) => {
    const isExpanded = expandedSections[filterType];
    const count = getFilterCount(filterType);

    return (
      <div className="border-b border-white/10 last:border-b-0">
        <button
          onClick={() => toggleSection(filterType)}
          className="flex items-center justify-between w-full p-4 text-left hover:bg-white/5 transition-colors duration-300"
        >
          <div className="flex items-center space-x-2">
            <span className="font-medium text-white">{title}</span>
            {count > 0 && (
              <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                {count}
              </span>
            )}
          </div>
          <Icon 
            name="ChevronDown" 
            size={16} 
            color="#B3B3B3" 
            className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
          />
        </button>
        
        {isExpanded && (
          <div className="px-4 pb-4 space-y-2 max-h-48 overflow-y-auto">
            {options.map((option) => (
              <label
                key={option}
                className="flex items-center space-x-3 cursor-pointer hover:bg-white/5 p-2 rounded transition-colors duration-300"
              >
                <input
                  type="checkbox"
                  checked={filters[filterType]?.includes(option) || false}
                  onChange={() => onFilterChange(filterType, option)}
                  className="w-4 h-4 text-primary bg-surface border-white/20 rounded focus:ring-primary focus:ring-2"
                />
                <span className="text-text-secondary hover:text-white transition-colors duration-300">
                  {option}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-1000 lg:hidden"
        onClick={onClose}
      />
      
      {/* Filter Panel */}
      <div className={`
        fixed lg:sticky lg:top-24 left-0 bottom-0 lg:bottom-auto
        w-full lg:w-80 max-w-sm lg:max-w-none
        bg-surface border-r border-white/10 lg:border lg:rounded-lg
        z-1100 lg:z-auto
        transform transition-transform duration-300 lg:transform-none
        ${isOpen ? 'translate-y-0' : 'translate-y-full lg:translate-y-0'}
        lg:h-fit lg:max-h-[calc(100vh-8rem)] overflow-hidden
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h3 className="font-heading font-semibold text-white">Filters</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-300 lg:hidden"
          >
            <Icon name="X" size={20} color="#B3B3B3" />
          </button>
        </div>

        {/* Filter Sections */}
        <div className="overflow-y-auto max-h-[calc(100vh-8rem)] lg:max-h-[calc(100vh-12rem)]">
          {renderFilterSection('Content Type', 'types', filterOptions.types)}
          {renderFilterSection('Genres', 'genres', filterOptions.genres)}
          {renderFilterSection('Release Year', 'years', filterOptions.years)}
          {renderFilterSection('Rating', 'ratings', filterOptions.ratings)}
          {renderFilterSection('Language', 'languages', filterOptions.languages)}
          {renderFilterSection('Quality', 'qualities', filterOptions.qualities)}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/10 bg-surface">
          <div className="flex space-x-2">
            <button
              onClick={() => {
                Object.keys(filters).forEach(filterType => {
                  filters[filterType].forEach(value => {
                    onFilterChange(filterType, value);
                  });
                });
              }}
              className="flex-1 bg-secondary hover:bg-secondary/90 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-300"
            >
              Clear All
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-300 lg:hidden"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;