// WorkoutNavigation.js
const Navigation = ({ onNext, onPrev, hasNext, hasPrev }) => {
  return (
    <div className="workout-navigation">
      <button onClick={onPrev} disabled={!hasPrev}>⏮ Prev</button>
      <button onClick={onNext} disabled={!hasNext}>Next ⏭</button>
    </div>
  );
};

export default Navigation;