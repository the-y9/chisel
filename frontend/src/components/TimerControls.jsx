// TimerControls.jsx
const TimerControls = ({
  isRunning,
  timeLeft,
  initialTime,
  onStart,
  onPause,
  onReset
}) => {
  return (
    <div className="controls">
      <button onClick={onStart} disabled={isRunning || timeLeft === 0}> ▶ </button>
      <button onClick={onPause} disabled={!isRunning}> ❚❚ </button>
      <button onClick={onReset} disabled={timeLeft === initialTime}> ⟳ </button>
    </div>
  );
};

export default TimerControls;
