import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = 'Generating test paper...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="animate-spin text-blue-600 mb-4" size={48} />
      <p className="text-gray-600 text-lg">{message}</p>
      <p className="text-gray-500 text-sm mt-2">Please wait while we prepare your questions</p>
    </div>
  );
};

export default LoadingSpinner;