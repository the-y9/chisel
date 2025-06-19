import "./Workout.css";
import { useState } from 'react';
import Timer from './Timer';
import Navigation from "./Navigation.jsx";

const workouts = [
  // Warm-up
  { name: 'Boxer bounce', method: 'timer', duration: 30 },
  { name: 'Jog in place', method: 'timer', duration: 30 },

  // Circuit Begins
  { name: 'Squats', method: 'rep', reps: 10 },                        // Strength (lower)
  { name: 'Twisted Crunch', method: 'rep', reps: 10 },                // Core
  { name: 'Push-ups', method: 'rep', reps: 15 },                      // Strength (upper)
  { name: 'High plank shoulder taps', method: 'rep', reps: 14 },      // Plank stability

  { name: 'Run in place', method: 'timer', duration: 30 },            // Cardio burst

  { name: 'Plank saws', method: 'timer', duration: 30 },              // Plank challenge
  { name: 'Plank alternating leg lifts', method: 'rep', reps: 14 },   // Plank dynamic core
  { name: 'Twisted Crunch', method: 'rep', reps: 10 },                // Core

  { name: 'Flutter kicks', method: 'timer', duration: 30 },           // Core endurance
  { name: 'Reverse crunch', method: 'rep', reps: 10 },                // Core
  { name: 'Plank', method: 'timer', duration: 45 },                   // Core hold

  // Cool-down
  { name: 'Cobra pose', method: 'timer', duration: 30 },              // Stretch
];



const WORK_DURATION = 30;
const REST_DURATION = 5;

const Workouts = ({ backgroundColor, textColor }) => {

const [appearance, setAppearance] = useState({
    backgroundColor: backgroundColor,
    color: textColor
  });
  const [color, setColor] = useState('backgroundColor');


  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState('workout'); // 'workout' or 'rest'
  const [key, setKey] = useState(0); // Force Timer remount to reset timer
  const [hasStarted, setHasStarted] = useState(false);


  const goToNextStep = () => {
  if (currentIndex < workouts.length - 1) {
    setCurrentIndex(prev => prev + 1);
    setPhase('workout');
    setKey(prev => prev + 1);
  } else {
    setPhase('done');
  }
};


  const handleNext = () => {
  if (phase === 'rest') {
    goToNextStep();
  } else if (currentIndex < workouts.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setPhase('workout');
        setKey(prev => prev + 1); // Reset timer
  }
};


const handlePrev = () => {
    if (phase === 'rest') {
        if (currentIndex > 0) {
    setCurrentIndex(prev => prev - 1);
    setPhase('workout');
    setKey(prev => prev + 1); // Reset timer
    }}
    else if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
        setPhase('workout');
        setKey(prev => prev + 1);
  }
};


  const handleTimerComplete = () => {
    if (phase === 'workout') {
      setPhase('rest');
      setKey(prev => prev + 1);
    } else {
      goToNextStep();
    }
  };

  if (phase === 'done') {
    return <h2>Workout Complete! 🎉</h2>;
  }

  const currentWorkout = workouts[currentIndex];
  
  const handleColorChange = (e) => {
    setColor(e.target.value);
    setAppearance(prev => ({ ...prev, backgroundColor: e.target.value }));
  };

  return (<>

    <div className="routine" style={appearance}>
      <h2 style= {{ marginBottom: 0, textAlign: 'center' }}>{phase === 'workout' ? currentWorkout.name : 'Rest'} </h2>
      <p style= {{ marginTop: 0 }}>({currentIndex+1}/{workouts.length})</p>
      <Navigation
        onNext={handleNext}
        onPrev={handlePrev}
        hasNext={currentIndex < workouts.length - 1}
        hasPrev={currentIndex > 0}
      />
      {!hasStarted ? (
        <div className="ready" style={{ textAlign: 'center' }}>
            <h3>Ready to start the workout?</h3>
            <button onClick={() => setHasStarted(true)}>Start</button>
        </div>
        ) : ( phase === 'rest' |
        currentWorkout.method === 'timer' ? (
            <Timer
            key={key}
            seconds={phase === 'workout' ? currentWorkout.duration || WORK_DURATION : REST_DURATION}
            automatic={true}
            onComplete={handleTimerComplete}
        />):(<div className="rep-mode">
                <p>{currentWorkout.reps} reps</p>
                <button onClick={handleTimerComplete}>Done</button>
            </div>)
        )}

    </div>
      {/* Color Picker Button */}
        <label htmlFor="colorPicker">Customize Background:   </label>
        <input id="colorPicker" type="color" value={color} onChange={handleColorChange} />
    </>
  );
};

export default Workouts;
