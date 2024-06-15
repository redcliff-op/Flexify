import { Pedometer } from "expo-sensors"
import { create } from "zustand"

let subscription: Pedometer.Subscription

type workoutStore = {
  steps: number,
  caloriesBurnt: number,
  startWorkout: () => Promise<void>,
  stopWorkout: () => Promise<void>
}

export const useWorkoutStore = create<workoutStore>((set) => ({
  steps: 0,
  caloriesBurnt: 0,
  startWorkout: async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    if (isAvailable) {
      subscription = Pedometer.watchStepCount((stepCount) => {
        set(() => ({ steps: stepCount.steps, caloriesBurnt: (stepCount.steps * 70 * 0.0005) }));
      });
    } else {
      console.log('Pedometer not available');
    }
  },
  stopWorkout: async () => {
    if (subscription) {
      subscription.remove()
    }
  }
}))