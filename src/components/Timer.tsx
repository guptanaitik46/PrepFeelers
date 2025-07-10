import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

interface TimerProps {
  duration: number; // in minutes
  onTimeUp: () => void;
}

const Timer: React.FC<TimerProps> = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60); // in seconds
  const [isWarning, setIsWarning] = useState(false);

  // ⏱️ Reset timer when duration prop changes
  useEffect(() => {
    setTimeLeft(duration * 60);
  }, [duration]);

  // 🧠 Main countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }

        if (prev <= 300 && !isWarning) {
          setIsWarning(true);
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeUp, isWarning]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (timeLeft <= 60) return 'text-red-600 bg-red-50';
    if (timeLeft <= 300) return 'text-orange-600 bg-orange-50';
    return 'text-blue-600 bg-blue-50';
  };

  return (
    <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-mono text-lg font-bold ${getTimerColor()}`}>
      {isWarning ? (
        <AlertTriangle size={20} className="animate-pulse" />
      ) : (
        <Clock size={20} />
      )}
      <span>{formatTime(timeLeft)}</span>
      {isWarning && timeLeft > 60 && (
        <span className="text-sm font-normal">remaining</span>
      )}
    </div>
  );
};

export default Timer;
