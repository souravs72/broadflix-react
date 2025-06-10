import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const WatchlistFilters = ({ filterBy, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const filterOptions = [
    { value: 'all', label: 'All Content', icon: 'Grid3X3' },
    { value: 'movie', label: 'Movies', icon: 'Film' },
    { value: 'series', label: 'TV Shows', icon: 'Tv' },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentFilter = filterOptions.find(option => option.value === filterBy);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-surface border border-white/10 rounded-lg px-4 py-3 text-white hover:border-white/20 transition-colors duration-300"
      >
        <Icon name={currentFilter.icon} size={18} color="white" />
        <span className="hidden sm:block">{currentFilter.label}</span>
        <Icon name="ChevronDown" size={16} color="white" className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-surface rounded-lg shadow-lg border border-white/10 z-1100 animate-scale-in">
          <div className="p-2">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onFilterChange(option.value);
                  setIsOpen(false);
                }}
                className={`flex items-center space-x-3 w-full text-left p-3 rounded-lg transition-colors duration-300 ${
                  filterBy === option.value 
                    ? 'bg-primary/20 text-primary' :'text-white hover:bg-white/5'
                }`}
              >
                <Icon name={option.icon} size={18} color="currentColor" />
                <span>{option.label}</span>
                {filterBy === option.value && (
                  <Icon name="Check" size={16} color="currentColor" className="ml-auto" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchlistFilters;