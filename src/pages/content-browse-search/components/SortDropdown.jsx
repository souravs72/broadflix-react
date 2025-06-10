import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SortDropdown = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const selectedOption = options.find(option => option.value === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-surface border border-white/20 text-text-secondary hover:text-white hover:border-white/40 px-4 py-2 rounded-lg transition-all duration-300 min-w-[140px]"
      >
        <Icon name="ArrowUpDown" size={16} color="currentColor" />
        <span className="flex-1 text-left">{selectedOption?.label || 'Sort by'}</span>
        <Icon 
          name="ChevronDown" 
          size={16} 
          color="currentColor" 
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-white/20 rounded-lg shadow-lg z-1100 animate-scale-in">
          <div className="py-2">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleOptionSelect(option.value)}
                className={`flex items-center space-x-3 w-full text-left px-4 py-3 hover:bg-white/5 transition-colors duration-300 ${
                  value === option.value ? 'text-primary bg-primary/10' : 'text-text-secondary hover:text-white'
                }`}
              >
                <span>{option.label}</span>
                {value === option.value && (
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

export default SortDropdown;