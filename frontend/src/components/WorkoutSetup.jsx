import { useState } from "react";
import'./WorkoutSetup.css';

const defaultExercises = [
  // Warm-up
  { name: "Boxer bounce", method: "timer", duration: 30 },
  { name: "Jog in place", method: "timer", duration: 30 },

  // Circuit Begins
  { name: "Squats", method: "rep", reps: 10 }, // Strength (lower)
  { name: "Twisted Crunch", method: "rep", reps: 10 }, // Core
  { name: "Push-ups", method: "rep", reps: 15 }, // Strength (upper)
  { name: "High plank shoulder taps", method: "rep", reps: 14 }, // Plank stability

  { name: "Run in place", method: "timer", duration: 30 }, // Cardio burst

  { name: "Plank saws", method: "timer", duration: 30 }, // Plank challenge
  { name: "Plank alternating leg lifts", method: "rep", reps: 14 }, // Plank dynamic core
  { name: "Twisted Crunch", method: "rep", reps: 10 }, // Core

  { name: "Flutter kicks", method: "timer", duration: 30 }, // Core endurance
  { name: "Reverse crunch", method: "rep", reps: 10 }, // Core
  { name: "Plank", method: "timer", duration: 45 }, // Core hold

  // Cool-down
  { name: "Cobra pose", method: "timer", duration: 30 }, // Stretch
];

const WorkoutSetup = ({ onStart, backgroundColor, textColor }) => {
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [restDuration, setRestDuration] = useState(5);

  const toggleExercise = (exercise) => {
    if (selectedExercises.includes(exercise)) {
      setSelectedExercises(selectedExercises.filter((ex) => ex !== exercise));
    } else {
      setSelectedExercises([...selectedExercises, exercise]);
    }
  };

   const [appearance, setAppearance] = useState({
    backgroundColor: backgroundColor,
    color: textColor,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const plan = selectedExercises.length ? selectedExercises : defaultExercises;
    onStart(plan, restDuration);
  };

  return (
    <div className="setup" style={appearance}>
      <h2 className="title">Customize Your Workout</h2>
      <form onSubmit={handleSubmit}>
        <h3>Select Exercises</h3>
        {defaultExercises.map((exercise, idx) => (
          <div key={idx}>
            <label>
              <input
                type="checkbox"
                checked={selectedExercises.includes(exercise)}
                onChange={() => toggleExercise(exercise)}
              />
              {exercise.name} ({exercise.method === "rep" ? `${exercise.reps} reps` : `${exercise.duration}s`})
            </label>
          </div>
        ))}

        <h3>Rest Duration (seconds)</h3>
        <input
          type="number"
          value={restDuration}
          onChange={(e) => setRestDuration(Number(e.target.value))}
          min="1"
        />

        <br />
        <button type="submit">Start Workout</button>
      </form>
    </div>
  );
};

export default WorkoutSetup;
