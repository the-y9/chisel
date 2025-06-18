// Timer.jsx
// import './Timer.css';
import { useState, useEffect, useRef } from 'react';
import TimerControls from './TimerControls';

const Timer = ({ seconds, automatic=false, onComplete  }) => {
  

  const [timeLeft, setTimeLeft] = useState(seconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (automatic) {
      setIsRunning(true);
    }
  }, [automatic]);

  
  useEffect(() => {
    
    if (isRunning && timeLeft > 0) {
      const timeoutId = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    if (onComplete) onComplete();
    }
  }, [timeLeft, onComplete]);

  const handleStart = () => {
    if (!isRunning && timeLeft > 0) {
      setIsRunning(true);
    }
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setTimeLeft(seconds);
    setIsRunning(false);
  };

  return (
    <div className="timer">
      <h2 style={{ textAlign: 'center' }}>{timeLeft}s</h2>
      <TimerControls
        isRunning={isRunning}
        timeLeft={timeLeft}
        initialTime={seconds}
        onStart={handleStart}
        onPause={handlePause}
        onReset={handleReset}
      />
    </div>
  );
};

export default Timer;
