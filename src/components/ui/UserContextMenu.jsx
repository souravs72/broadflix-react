import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const UserContextMenu = ({ user, onLogout, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeProfile, setActiveProfile] = useState(user?.activeProfile || user?.profiles?.[0]);
  const [showProfileSwitcher, setShowProfileSwitcher] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const defaultAvatar = `https://st4.depositphotos.com/19956822/25338/i/450/depositphotos_253387844-stock-photo-silhouette-of-a-man-standing.jpg`;

  const defaultUser = {
    name: 'Sourav Singh',
    email: 'sourav@clapgrow.com',
    avatar: defaultAvatar,
    subscription: 'Premium',
    profiles: [
      { id: 1, name: 'Sourav', avatar: defaultAvatar, isKid: false },
      { id: 2, name: 'Nasrin', avatar: defaultAvatar, isKid: false },
      { id: 3, name: 'Kids', avatar: null, isKid: true },
    ],
  };

  const currentUser = user || defaultUser;
  const currentProfile = activeProfile || currentUser.profiles[0];

  // Log current user and profile when they change
  useEffect(() => {
    console.log('Current User:', currentUser);
    console.log('Current Profile:', currentProfile);
    console.log('Profile Avatar:', currentProfile.avatar || 'No avatar set');
  }, [currentUser, currentProfile]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
        setShowProfileSwitcher(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProfileSwitch = (profile) => {
    setActiveProfile(profile);
    setShowProfileSwitcher(false);
    console.log('Switched to profile:', profile.name, 'Avatar:', profile.avatar || 'No avatar set');
  };

  const handleLogoutClick = () => {
    setIsOpen(false);
    if (onLogout) {
      onLogout();
    } else {
      console.log('Logging out...');
      navigate('/login');
    }
  };

  const getProfileInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : '';
  };

  const getSubscriptionBadgeColor = (subscription) => {
    switch (subscription?.toLowerCase()) {
      case 'premium': return 'bg-accent text-black';
      case 'standard': return 'bg-primary text-white';
      case 'basic': return 'bg-secondary text-white';
      default: return 'bg-surface text-text-secondary';
    }
  };

  return (
    <div className={`relative ${className}`} ref={menuRef}>
      {/* User Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 hover:bg-white/10 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        <div className="relative">
          {currentProfile.avatar ? (
            <img
              src={currentProfile.avatar}
              alt={currentProfile.name}
              className="w-8 h-8 rounded-full object-cover"
              onError={(e) => { e.target.src = defaultAvatar; }} // Fallback for broken images
            />
          ) : (
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${currentProfile.isKid ? 'bg-warning text-black' : 'bg-gradient-to-br from-primary to-accent text-white'}`}>
              {getProfileInitials(currentProfile.name)}
            </div>
          )}
          {currentProfile.isKid && (
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-warning rounded-full border border-background flex items-center justify-center">
              <Icon name="Baby" size={8} color="black" />
            </div>
          )}
        </div>
        <div className="hidden sm:block text-left">
          <div className="text-sm font-medium text-white">{currentProfile.name}</div>
          <div className="text-xs text-text-secondary">{currentUser.subscription}</div>
        </div>
        <Icon 
          name="ChevronDown" 
          size={16} 
          color="white" 
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-surface rounded-lg shadow-lg border border-white/10 z-50 animate-scale-in">
          {/* User Info Header */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center space-x-3 mb-3">
              <div className="relative">
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-12 h-12 rounded-full object-cover"
                    onError={(e) => { e.target.src = defaultAvatar; }}
                  />
                ) : (
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-lg font-semibold text-white">
                    {getProfileInitials(currentUser.name)}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white truncate">{currentUser.name}</h3>
                <p className="text-sm text-text-secondary truncate">{currentUser.email}</p>
                <span className={`inline-block text-xs font-medium px-2 py-1 rounded-full mt-1 ${getSubscriptionBadgeColor(currentUser.subscription)}`}>
                  {currentUser.subscription}
                </span>
              </div>
            </div>

            {/* Profile Switcher */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-text-secondary">Current Profile</span>
                <button
                  onClick={() => setShowProfileSwitcher(!showProfileSwitcher)}
                  className="text-sm text-primary hover:text-primary/80 transition-colors duration-300"
                >
                  Switch
                </button>
              </div>
              
              {showProfileSwitcher && (
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {currentUser.profiles.map((profile) => (
                    <button
                      key={profile.id}
                      onClick={() => handleProfileSwitch(profile)}
                      className={`flex items-center space-x-3 w-full text-left p-2 rounded-lg transition-colors duration-300 ${profile.id === currentProfile.id ? 'bg-primary/20 text-primary' : 'hover:bg-white/5 text-white'}`}
                    >
                      {profile.avatar ? (
                        <img
                          src={profile.avatar}
                          alt={profile.name}
                          className="w-6 h-6 rounded-full object-cover"
                          onError={(e) => { e.target.src = defaultAvatar; }}
                        />
                      ) : (
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${profile.isKid ? 'bg-warning text-black' : 'bg-gradient-to-br from-primary to-accent text-white'}`}>
                          {getProfileInitials(profile.name)}
                        </div>
                      )}
                      <span className="text-sm">{profile.name}</span>
                      {profile.isKid && (
                        <Icon name="Baby" size={12} color="currentColor" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-2">
            <Link
              to="/user-profile-settings"
              className="flex items-center space-x-3 w-full text-left p-3 hover:bg-white/5 rounded-lg transition-colors duration-300 text-white"
              onClick={() => setIsOpen(false)}
            >
              <Icon name="Settings" size={18} color="#B3B3B3" />
              <span>Account Settings</span>
            </Link>

            <Link
              to="/watchlist-management"
              className="flex items-center space-x-3 w-full text-left p-3 hover:bg-white/5 rounded-lg transition-colors duration-300 text-white"
              onClick={() => setIsOpen(false)}
            >
              <Icon name="Heart" size={18} color="#B3B3B3" />
              <span>My Watchlist</span>
              <span className="ml-auto text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">12</span>
            </Link>

            <button className="flex items-center space-x-3 w-full text-left p-3 hover:bg-white/5 rounded-lg transition-colors duration-300 text-white">
              <Icon name="Download" size={18} color="#B3B3B3" />
              <span>Downloads</span>
              <span className="ml-auto text-xs bg-success/20 text-success px-2 py-1 rounded-full">3</span>
            </button>

            <button className="flex items-center space-x-3 w-full text-left p-3 hover:bg-white/5 rounded-lg transition-colors duration-300 text-white">
              <Icon name="History" size={18} color="#B3B3B3" />
              <span>Watch History</span>
            </button>

            <button className="flex items-center space-x-3 w-full text-left p-3 hover:bg-white/5 rounded-lg transition-colors duration-300 text-white">
              <Icon name="Users" size={18} color="#B3B3B3" />
              <span>Manage Profiles</span>
            </button>

            <button className="flex items-center space-x-3 w-full text-left p-3 hover:bg-white/5 rounded-lg transition-colors duration-300 text-white">
              <Icon name="CreditCard" size={18} color="#B3B3B3" />
              <span>Billing & Payments</span>
            </button>

            <button className="flex items-center space-x-3 w-full text-left p-3 hover:bg-white/5 rounded-lg transition-colors duration-300 text-white">
              <Icon name="HelpCircle" size={18} color="#B3B3B3" />
              <span>Help Center</span>
            </button>

            <button className="flex items-center space-x-3 w-full text-left p-3 hover:bg-white/5 rounded-lg transition-colors duration-300 text-white">
              <Icon name="MessageSquare" size={18} color="#B3B3B3" />
              <span>Feedback</span>
            </button>
          </div>

          {/* Logout Section */}
          <div className="p-2 border-t border-white/10">
            <button
              onClick={handleLogoutClick}
              className="flex items-center space-x-3 w-full text-left p-3 hover:bg-white/5 rounded-lg transition-colors duration-300 text-error"
            >
              <Icon name="LogOut" size={18} color="#F40612" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserContextMenu;