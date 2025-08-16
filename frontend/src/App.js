import Workouts from "./components/Workouts";
import WorkoutSetup from "./components/WorkoutSetup";
import React, { useState } from "react";

function App() {
  const [customPlan, setCustomPlan] = useState(null);
  const [restDuration, setRestDuration] = useState(5);

  const handleStartWorkout = (plan, rest) => {
    setCustomPlan(plan);
    setRestDuration(rest);
  };

  return (
    <div className="App">
      {!customPlan ? (
        <WorkoutSetup
          onStart={handleStartWorkout}
          backgroundColor="#102c3f"
          textColor="white"
        />
      ) : (
        <Workouts
          backgroundColor="#102c3f"
          textColor="white"
          customPlan={customPlan}
          restDuration={restDuration}
        />
      )}
    </div>
  );
}

export default App;
