const API = {
    async getLastWorkout() {
      let res;
      try {
        res = await fetch("/api/workouts");
      } catch (err) {
        console.log(err)
      }
      const json = await res.json();
  
      return json[json.length - 1];
    },
    async addExercise(data) {
      const id = location.search.split("=")[1];
  
      const res = await fetch("/api/workouts/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
  
      const json = await res.json();
  
      return json;
    },
    async createWorkout(data = {}) {
      const res = await fetch("/api/workouts", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      });
  
      const json = await res.json();
  
      return json;
    },
  
    async getWorkoutsInRange() {
      const res = await fetch(`/api/workouts/range`);
      const json = await res.json();
  
      return json;
    },
  };
  async function initWorkout() {
    const lastWorkout = await API.getLastWorkout();
    console.log("Last workout:", lastWorkout);
    if (lastWorkout) {
      document
        .querySelector("a[href='/exercise?']")
        .setAttribute("href", `/exercise?id=${lastWorkout._id}`);
  
      const workoutSummary = {
        date: formatDate(lastWorkout.day),
        totalDuration: lastWorkout.totalDuration,
        numExercises: lastWorkout.exercises.length,
        ...tallyExercises(lastWorkout.exercises)
      };
  
      renderWorkoutSummary(workoutSummary);
    } else {
      renderNoWorkoutText()
    }
  }
  
  function tallyExercises(exercises) {
    const tallied = exercises.reduce((acc, curr) => {
      if (curr.type === "resistance") {
        acc.totalWeight = (acc.totalWeight || 0) + curr.weight;
        acc.totalSets = (acc.totalSets || 0) + curr.sets;
        acc.totalReps = (acc.totalReps || 0) + curr.reps;
      } else if (curr.type === "cardio") {
        acc.totalDistance = (acc.totalDistance || 0) + curr.distance;
      }
      return acc;
    }, {});
    return tallied;
  }
  
  function formatDate(date) {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    };
  
    return new Date(date).toLocaleDateString(options);
  }
  
  function renderWorkoutSummary(summary) {
    const container = document.querySelector(".workout-stats");
  
    const workoutKeyMap = {
      date: "Date",
      totalDuration: "Total Workout Duration",
      numExercises: "Exercises Performed",
      totalWeight: "Total Weight Lifted",
      totalSets: "Total Sets Performed",
      totalReps: "Total Reps Performed",
      totalDistance: "Total Distance Covered"
    };
  
    Object.keys(summary).forEach(key => {
      const p = document.createElement("p");
      const strong = document.createElement("strong");
  
      strong.textContent = workoutKeyMap[key];
      const textNode = document.createTextNode(`: ${summary[key]}`);
  
      p.appendChild(strong);
      p.appendChild(textNode);
  
      container.appendChild(p);
    });
  }
  
  function renderNoWorkoutText() {
    const container = document.querySelector(".workout-stats");
    const p = document.createElement("p");
    const strong = document.createElement("strong");
    strong.textContent = "You have not created a workout yet!"
  
    p.appendChild(strong);
    container.appendChild(p);
  }
  
  initWorkout();
  