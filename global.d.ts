type UserData = {
  weight: number,
  height: number,
}

type ExerciseData = {
  exercise: string | undefined,
  steps: number | undefined,
  calories: number | undefined,
  distance: number | undefined,
  intensity: number | undefined,
  startTime: number | undefined
}

type Activity = {
  steps: number;
  caloriesBurnt: number;
  distance: number;
  date?: string = new Date().toISOString().split('T')[0]
}