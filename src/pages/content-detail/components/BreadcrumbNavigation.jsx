// src/pages/content-detail/components/BreadcrumbNavigation.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const BreadcrumbNavigation = ({ content }) => {
  const breadcrumbs = [
    { label: 'Home', path: '/home-dashboard' },
    { label: 'Browse', path: '/content-browse-search' },
    { label: content?.title || 'Content Detail', path: null }
  ];

  return (
    <nav className="px-4 lg:px-6 py-4 border-b border-white/10">
      <div className="flex items-center space-x-2 text-sm">
        {breadcrumbs.map((breadcrumb, index) => (
          <React.Fragment key={index}>
            {breadcrumb.path ? (
              <Link
                to={breadcrumb.path}
                className="text-text-secondary hover:text-white transition-colors duration-300"
              >
                {breadcrumb.label}
              </Link>
            ) : (
              <span className="text-white font-medium truncate max-w-xs">
                {breadcrumb.label}
              </span>
            )}
            {index < breadcrumbs.length - 1 && (
              <Icon name="ChevronRight" size={14} color="#B3B3B3" />
            )}
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
};

export default BreadcrumbNavigation;