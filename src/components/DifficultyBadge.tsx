import React from 'react';

interface DifficultyBadgeProps {
  difficulty: 'easy' | 'slightly_difficult' | 'moderate' | 'difficult';
}

const DifficultyBadge: React.FC<DifficultyBadgeProps> = ({ difficulty }) => {
  const getBadgeStyles = () => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border-green-200 dark:border-green-700';
      case 'slightly_difficult':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 border-yellow-200 dark:border-yellow-700';
      case 'moderate':
        return 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 border-orange-200 dark:border-orange-700';
      case 'difficult':
        return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 border-red-200 dark:border-red-700';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-600';
    }
  };

  const getDifficultyText = () => {
    switch (difficulty) {
      case 'easy':
        return 'Easy';
      case 'slightly_difficult':
        return 'Slightly Difficult';
      case 'moderate':
        return 'Moderate';
      case 'difficult':
        return 'Difficult';
      default:
        return 'Unknown';
    }
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getBadgeStyles()}`}
    >
      {getDifficultyText()}
    </span>
  );
};

export default DifficultyBadge;