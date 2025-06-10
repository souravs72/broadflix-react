import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const VideoSettings = ({
  selectedQuality,
  selectedSubtitle,
  selectedAudio,
  playbackRate,
  qualities,
  subtitles,
  languages,
  onQualityChange,
  onSubtitleChange,
  onAudioChange,
  onPlaybackRateChange,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState('quality');
  const [subtitleSettings, setSubtitleSettings] = useState({
    fontSize: 'medium',
    fontColor: 'white',
    backgroundColor: 'black',
    opacity: 0.8
  });

  const playbackRates = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
  
  const fontSizes = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
    { value: 'extra-large', label: 'Extra Large' }
  ];

  const fontColors = [
    { value: 'white', label: 'White', color: '#FFFFFF' },
    { value: 'yellow', label: 'Yellow', color: '#FFD700' },
    { value: 'red', label: 'Red', color: '#FF0000' },
    { value: 'green', label: 'Green', color: '#00FF00' },
    { value: 'blue', label: 'Blue', color: '#0000FF' },
    { value: 'black', label: 'Black', color: '#000000' }
  ];

  const backgroundColors = [
    { value: 'transparent', label: 'None', color: 'transparent' },
    { value: 'black', label: 'Black', color: '#000000' },
    { value: 'white', label: 'White', color: '#FFFFFF' },
    { value: 'gray', label: 'Gray', color: '#808080' }
  ];

  const tabs = [
    { id: 'quality', label: 'Quality', icon: 'Settings' },
    { id: 'audio', label: 'Audio', icon: 'Volume2' },
    { id: 'subtitles', label: 'Subtitles', icon: 'MessageSquare' },
    { id: 'speed', label: 'Speed', icon: 'Gauge' }
  ];

  const handleSubtitleSettingChange = (setting, value) => {
    setSubtitleSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  return (
    <div className="absolute top-0 right-0 w-80 h-full bg-surface/95 backdrop-blur-sm border-l border-white/20 z-20">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <h3 className="text-lg font-heading font-semibold text-white">Settings</h3>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-300"
        >
          <Icon name="X" size={20} color="white" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex flex-col items-center space-y-1 py-3 px-2 transition-colors duration-300 ${
              activeTab === tab.id 
                ? 'text-primary border-b-2 border-primary bg-primary/10' :'text-text-secondary hover:text-white hover:bg-white/5'
            }`}
          >
            <Icon name={tab.icon} size={16} color="currentColor" />
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4 h-full overflow-y-auto">
        {/* Quality Settings */}
        {activeTab === 'quality' && (
          <div className="space-y-4">
            <div>
              <h4 className="text-white font-medium mb-3">Video Quality</h4>
              <div className="space-y-2">
                {qualities.map((quality) => (
                  <button
                    key={quality}
                    onClick={() => onQualityChange(quality)}
                    className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors duration-300 ${
                      selectedQuality === quality 
                        ? 'bg-primary/20 text-primary border border-primary/50' :'bg-white/5 text-white hover:bg-white/10'
                    }`}
                  >
                    <span className="font-medium">{quality}</span>
                    {selectedQuality === quality && (
                      <Icon name="Check" size={16} color="currentColor" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <h4 className="text-white font-medium mb-3">Auto Quality</h4>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary bg-surface border-white/20 rounded focus:ring-primary focus:ring-2"
                  defaultChecked
                />
                <span className="text-text-secondary">Adjust quality automatically based on connection</span>
              </label>
            </div>
          </div>
        )}

        {/* Audio Settings */}
        {activeTab === 'audio' && (
          <div className="space-y-4">
            <div>
              <h4 className="text-white font-medium mb-3">Audio Language</h4>
              <div className="space-y-2">
                {languages.map((language) => (
                  <button
                    key={language}
                    onClick={() => onAudioChange(language)}
                    className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors duration-300 ${
                      selectedAudio === language 
                        ? 'bg-primary/20 text-primary border border-primary/50' :'bg-white/5 text-white hover:bg-white/10'
                    }`}
                  >
                    <span className="font-medium">{language}</span>
                    {selectedAudio === language && (
                      <Icon name="Check" size={16} color="currentColor" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <h4 className="text-white font-medium mb-3">Audio Enhancement</h4>
              <div className="space-y-3">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-primary bg-surface border-white/20 rounded focus:ring-primary focus:ring-2"
                  />
                  <span className="text-text-secondary">Dialogue Enhancement</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-primary bg-surface border-white/20 rounded focus:ring-primary focus:ring-2"
                  />
                  <span className="text-text-secondary">Surround Sound</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Subtitle Settings */}
        {activeTab === 'subtitles' && (
          <div className="space-y-4">
            <div>
              <h4 className="text-white font-medium mb-3">Subtitle Language</h4>
              <div className="space-y-2">
                <button
                  onClick={() => onSubtitleChange('Off')}
                  className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors duration-300 ${
                    selectedSubtitle === 'Off' ?'bg-primary/20 text-primary border border-primary/50' :'bg-white/5 text-white hover:bg-white/10'
                  }`}
                >
                  <span className="font-medium">Off</span>
                  {selectedSubtitle === 'Off' && (
                    <Icon name="Check" size={16} color="currentColor" />
                  )}
                </button>
                {subtitles.map((subtitle) => (
                  <button
                    key={subtitle}
                    onClick={() => onSubtitleChange(subtitle)}
                    className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors duration-300 ${
                      selectedSubtitle === subtitle 
                        ? 'bg-primary/20 text-primary border border-primary/50' :'bg-white/5 text-white hover:bg-white/10'
                    }`}
                  >
                    <span className="font-medium">{subtitle}</span>
                    {selectedSubtitle === subtitle && (
                      <Icon name="Check" size={16} color="currentColor" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {selectedSubtitle !== 'Off' && (
              <div className="pt-4 border-t border-white/10 space-y-4">
                <h4 className="text-white font-medium">Subtitle Appearance</h4>
                
                {/* Font Size */}
                <div>
                  <label className="block text-text-secondary text-sm mb-2">Font Size</label>
                  <div className="grid grid-cols-2 gap-2">
                    {fontSizes.map((size) => (
                      <button
                        key={size.value}
                        onClick={() => handleSubtitleSettingChange('fontSize', size.value)}
                        className={`p-2 rounded-lg text-sm transition-colors duration-300 ${
                          subtitleSettings.fontSize === size.value 
                            ? 'bg-primary/20 text-primary border border-primary/50' :'bg-white/5 text-white hover:bg-white/10'
                        }`}
                      >
                        {size.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Color */}
                <div>
                  <label className="block text-text-secondary text-sm mb-2">Font Color</label>
                  <div className="grid grid-cols-3 gap-2">
                    {fontColors.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => handleSubtitleSettingChange('fontColor', color.value)}
                        className={`flex items-center space-x-2 p-2 rounded-lg text-sm transition-colors duration-300 ${
                          subtitleSettings.fontColor === color.value 
                            ? 'bg-primary/20 text-primary border border-primary/50' :'bg-white/5 text-white hover:bg-white/10'
                        }`}
                      >
                        <div 
                          className="w-3 h-3 rounded-full border border-white/20"
                          style={{ backgroundColor: color.color }}
                        />
                        <span className="text-xs">{color.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Background */}
                <div>
                  <label className="block text-text-secondary text-sm mb-2">Background</label>
                  <div className="grid grid-cols-2 gap-2">
                    {backgroundColors.map((bg) => (
                      <button
                        key={bg.value}
                        onClick={() => handleSubtitleSettingChange('backgroundColor', bg.value)}
                        className={`flex items-center space-x-2 p-2 rounded-lg text-sm transition-colors duration-300 ${
                          subtitleSettings.backgroundColor === bg.value 
                            ? 'bg-primary/20 text-primary border border-primary/50' :'bg-white/5 text-white hover:bg-white/10'
                        }`}
                      >
                        <div 
                          className="w-3 h-3 rounded border border-white/20"
                          style={{ backgroundColor: bg.color }}
                        />
                        <span className="text-xs">{bg.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preview */}
                <div className="pt-4 border-t border-white/10">
                  <label className="block text-text-secondary text-sm mb-2">Preview</label>
                  <div className="bg-black/50 rounded-lg p-4 text-center">
                    <span 
                      className={`inline-block px-2 py-1 rounded ${
                        subtitleSettings.fontSize === 'small' ? 'text-sm' :
                        subtitleSettings.fontSize === 'medium' ? 'text-base' :
                        subtitleSettings.fontSize === 'large' ? 'text-lg' : 'text-xl'
                      }`}
                      style={{
                        color: fontColors.find(c => c.value === subtitleSettings.fontColor)?.color,
                        backgroundColor: subtitleSettings.backgroundColor === 'transparent' ? 'transparent' : 
                          backgroundColors.find(c => c.value === subtitleSettings.backgroundColor)?.color,
                        opacity: subtitleSettings.opacity
                      }}
                    >
                      Sample subtitle text
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Speed Settings */}
        {activeTab === 'speed' && (
          <div className="space-y-4">
            <div>
              <h4 className="text-white font-medium mb-3">Playback Speed</h4>
              <div className="space-y-2">
                {playbackRates.map((rate) => (
                  <button
                    key={rate}
                    onClick={() => onPlaybackRateChange(rate)}
                    className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors duration-300 ${
                      playbackRate === rate 
                        ? 'bg-primary/20 text-primary border border-primary/50' :'bg-white/5 text-white hover:bg-white/10'
                    }`}
                  >
                    <span className="font-medium">{rate}x</span>
                    {rate === 1 && <span className="text-xs text-text-secondary">Normal</span>}
                    {playbackRate === rate && (
                      <Icon name="Check" size={16} color="currentColor" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <h4 className="text-white font-medium mb-3">Speed Controls</h4>
              <div className="space-y-3">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-primary bg-surface border-white/20 rounded focus:ring-primary focus:ring-2"
                    defaultChecked
                  />
                  <span className="text-text-secondary">Remember speed setting</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-primary bg-surface border-white/20 rounded focus:ring-primary focus:ring-2"
                  />
                  <span className="text-text-secondary">Skip intro automatically</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoSettings;