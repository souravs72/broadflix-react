// import React from 'react';

// const UserProfileSettings = () => {
//   return (
//     <div className="min-h-screen bg-background flex items-center justify-center">
//       <div className="text-center">
//         <h1 className="text-4xl font-bold text-white mb-4">User Profile Settings</h1>
//         <p className="text-text-secondary">This page will be implemented soon.</p>
//       </div>
//     </div>
//   );
// };

// export default UserProfileSettings;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const UserProfileSettings = ({ user }) => {
  const navigate = useNavigate();

  const defaultUser = {
    name: 'Sourav Singh',
    email: 'sourav@clapgrow.com',
    avatar: 'https://st4.depositphotos.com/19956822/25338/i/450/depositphotos_253387844-stock-photo-silhouette-of-a-man-standing.jpg',
    subscription: 'Premium',
    profiles: [
      { id: 1, name: 'Sourav', avatar: 'https://st4.depositphotos.com/19956822/25338/i/450/depositphotos_253387844-stock-photo-silhouette-of-a-man-standing.jpg', isKid: false },
      { id: 2, name: 'Nasrin', avatar: 'https://st4.depositphotos.com/19956822/25338/i/450/depositphotos_253387844-stock-photo-silhouette-of-a-man-standing.jpg', isKid: false },
      { id: 3, name: 'Kids', avatar: null, isKid: true },
    ],
  };

  const currentUser = user || defaultUser;

  // State for user info form
  const [userInfo, setUserInfo] = useState({
    name: currentUser.name,
    email: currentUser.email,
    avatar: currentUser.avatar,
  });

  // State for profiles
  const [profiles, setProfiles] = useState(currentUser.profiles);
  const [newProfileName, setNewProfileName] = useState('');
  const [isNewProfileKid, setIsNewProfileKid] = useState(false);

  // State for form errors
  const [errors, setErrors] = useState({});

  // Log user data for debugging (similar to UserContextMenu)
  useEffect(() => {
    console.log('Current User:', currentUser);
    console.log('User Avatar:', userInfo.avatar || 'No avatar set');
  }, [currentUser, userInfo.avatar]);

  const validateUserInfo = () => {
    const newErrors = {};
    if (!userInfo.name.trim()) newErrors.name = 'Name is required';
    if (!userInfo.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(userInfo.email)) {
      newErrors.email = 'Invalid email format';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUserInfoSubmit = (e) => {
    e.preventDefault();
    if (validateUserInfo()) {
      console.log('Updating user info:', userInfo);
      // Simulate API call to update user info
      alert('User info updated successfully!');
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserInfo({ ...userInfo, avatar: reader.result });
        console.log('New avatar set:', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateNewProfile = () => {
    const newErrors = {};
    if (!newProfileName.trim()) newErrors.newProfile = 'Profile name is required';
    if (profiles.length >= 5) newErrors.newProfile = 'Maximum 5 profiles allowed';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddProfile = (e) => {
    e.preventDefault();
    if (validateNewProfile()) {
      const newProfile = {
        id: profiles.length + 1,
        name: newProfileName,
        avatar: null,
        isKid: isNewProfileKid,
      };
      setProfiles([...profiles, newProfile]);
      setNewProfileName('');
      setIsNewProfileKid(false);
      console.log('Added profile:', newProfile);
      alert('Profile added successfully!');
    }
  };

  const handleDeleteProfile = (profileId) => {
    if (profiles.length <= 1) {
      setErrors({ deleteProfile: 'At least one profile is required' });
      return;
    }
    const updatedProfiles = profiles.filter((p) => p.id !== profileId);
    setProfiles(updatedProfiles);
    console.log('Deleted profile ID:', profileId);
    alert('Profile deleted successfully!');
  };

  const getProfileInitials = (name) => {
    return name ? name.split(' ').map((n) => n[0]).join('').toUpperCase() : '';
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-8 px-4 lg:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Account Settings</h1>

        {/* User Information */}
        <section className="bg-surface rounded-lg p-6 mb-6 border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-4">User Information</h2>
          <form onSubmit={handleUserInfoSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-1">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={userInfo.name}
                onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                className="w-full bg-background border border-white/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                placeholder="Enter your name"
              />
              {errors.name && <p className="text-error text-sm mt-1">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={userInfo.email}
                onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                className="w-full bg-background border border-white/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-error text-sm mt-1">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="avatar" className="block text-sm font-medium text-text-secondary mb-1">
                Profile Picture
              </label>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  {userInfo.avatar ? (
                    <img
                      src={userInfo.avatar}
                      alt="Profile"
                      className="w-16 h-16 rounded-full object-cover"
                      onError={(e) => {
                        e.target.src = defaultUser.avatar;
                      }}
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-lg font-semibold text-white">
                      {getProfileInitials(userInfo.name)}
                    </div>
                  )}
                </div>
                <input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-white file:hover:bg-primary/80"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/80 transition-colors duration-300"
            >
              Save Changes
            </button>
          </form>
        </section>

        {/* Subscription Details */}
        <section className="bg-surface rounded-lg p-6 mb-6 border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-4">Subscription Details</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-text-secondary">Plan</p>
              <p className="text-white">{currentUser.subscription}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-text-secondary">Status</p>
              <p className="text-success">Active</p>
            </div>
            <div>
              <p className="text-sm font-medium text-text-secondary">Next Billing Date</p>
              <p className="text-white">July 11, 2025</p>
            </div>
            <button
              onClick={() => {
                console.log('Navigating to billing management');
                navigate('/billing-payments');
              }}
              className="bg-accent text-black px-6 py-2 rounded-lg hover:bg-accent/80 transition-colors duration-300"
            >
              Manage Subscription
            </button>
          </div>
        </section>

        {/* Manage Profiles */}
        <section className="bg-surface rounded-lg p-6 border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-4">Manage Profiles</h2>
          <div className="space-y-4">
            {/* Current Profiles */}
            <div>
              <h3 className="text-sm font-medium text-text-secondary mb-2">Current Profiles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {profiles.map((profile) => (
                  <div
                    key={profile.id}
                    className="flex items-center justify-between p-4 bg-background rounded-lg border border-white/10"
                  >
                    <div className="flex items-center space-x-3">
                      {profile.avatar ? (
                        <img
                          src={profile.avatar}
                          alt={profile.name}
                          className="w-10 h-10 rounded-full object-cover"
                          onError={(e) => {
                            e.target.src = defaultUser.avatar;
                          }}
                        />
                      ) : (
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                            profile.isKid ? 'bg-warning text-black' : 'bg-gradient-to-br from-primary to-accent text-white'
                          }`}
                        >
                          {getProfileInitials(profile.name)}
                        </div>
                      )}
                      <div>
                        <p className="text-white">{profile.name}</p>
                        {profile.isKid && (
                          <p className="text-xs text-text-secondary">Kids Profile</p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteProfile(profile.id)}
                      className="text-error hover:text-error/80"
                      disabled={profiles.length <= 1}
                      aria-label={`Delete ${profile.name} profile`}
                    >
                      <Icon name="Trash" size={18} />
                    </button>
                  </div>
                ))}
              </div>
              {errors.deleteProfile && (
                <p className="text-error text-sm mt-2">{errors.deleteProfile}</p>
              )}
            </div>

            {/* Add New Profile */}
            <div>
              <h3 className="text-sm font-medium text-text-secondary mb-2">Add New Profile</h3>
              <form onSubmit={handleAddProfile} className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={newProfileName}
                    onChange={(e) => setNewProfileName(e.target.value)}
                    placeholder="Profile name"
                    className="w-full bg-background border border-white/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                  />
                  {errors.newProfile && (
                    <p className="text-error text-sm mt-1">{errors.newProfile}</p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    id="isKid"
                    type="checkbox"
                    checked={isNewProfileKid}
                    onChange={(e) => setIsNewProfileKid(e.target.checked)}
                    className="h-4 w-4 text-primary focus:ring-primary border-white/20 rounded"
                  />
                  <label htmlFor="isKid" className="text-sm text-white">
                    Kids Profile
                  </label>
                </div>
                <button
                  type="submit"
                  className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/80 transition-colors duration-300"
                >
                  Add Profile
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserProfileSettings;