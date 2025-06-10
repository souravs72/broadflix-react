import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const BulkActions = ({ selectedCount, totalCount, onSelectAll, onBulkRemove, onCancel }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleBulkRemove = () => {
    setShowConfirmation(true);
  };

  const confirmBulkRemove = () => {
    onBulkRemove();
    setShowConfirmation(false);
  };

  const cancelBulkRemove = () => {
    setShowConfirmation(false);
  };

  const isAllSelected = selectedCount === totalCount;

  return (
    <>
      <div className="bg-surface/80 backdrop-blur-sm border border-white/10 rounded-lg p-4 mb-6 animate-scale-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onSelectAll}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-300 ${
                isAllSelected 
                  ? 'bg-primary/20 text-primary hover:bg-primary/30' :'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                isAllSelected ? 'bg-primary border-primary' : 'border-white/30'
              }`}>
                {isAllSelected && <Icon name="Check" size={12} color="white" />}
              </div>
              <span className="text-sm font-medium">
                {isAllSelected ? 'Deselect All' : 'Select All'}
              </span>
            </button>

            <div className="text-sm text-text-secondary">
              {selectedCount} of {totalCount} items selected
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleBulkRemove}
              className="flex items-center space-x-2 bg-error/20 hover:bg-error/30 text-error px-4 py-2 rounded-lg transition-colors duration-300"
            >
              <Icon name="Trash2" size={16} color="currentColor" />
              <span className="text-sm font-medium">Remove Selected</span>
            </button>

            <button
              onClick={onCancel}
              className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors duration-300"
            >
              <Icon name="X" size={16} color="currentColor" />
              <span className="text-sm font-medium">Cancel</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-3">
          <div className="w-full bg-white/10 rounded-full h-1">
            <div 
              className="bg-primary h-1 rounded-full transition-all duration-300"
              style={{ width: `${(selectedCount / totalCount) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-1200 animate-fade-in">
          <div className="bg-surface rounded-lg p-6 m-4 max-w-md w-full border border-white/10 animate-scale-in">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-error/20 rounded-full flex items-center justify-center">
                <Icon name="AlertTriangle" size={24} color="#F40612" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-white">Confirm Removal</h3>
                <p className="text-sm text-text-secondary">This action cannot be undone</p>
              </div>
            </div>

            <p className="text-text-secondary mb-6">
              Are you sure you want to remove {selectedCount} item{selectedCount > 1 ? 's' : ''} from your watchlist?
            </p>

            <div className="flex items-center space-x-3">
              <button
                onClick={confirmBulkRemove}
                className="flex-1 bg-error hover:bg-error/90 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-300"
              >
                Remove {selectedCount} Item{selectedCount > 1 ? 's' : ''}
              </button>
              <button
                onClick={cancelBulkRemove}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BulkActions;