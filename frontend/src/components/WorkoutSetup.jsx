import { useState } from "react";
import'./WorkoutSetup.css';

const defaultExercises = [
  { name: "Boxer bounce", method: "timer", duration: 30 },
  { name: "Jog in place", method: "timer", duration: 30 },
  { name: "Squats", method: "rep", reps: 10 },
  { name: "Twisted Crunch", method: "rep", reps: 10 },
  { name: "Push-ups", method: "rep", reps: 15 },
  { name: "High plank shoulder taps", method: "rep", reps: 14 },
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
