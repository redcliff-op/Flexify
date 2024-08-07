import { ImageSourcePropType } from "react-native"

type UserData = {
  weight: number,
  height: number,
  stepGoal: number,
  caloriesGoal: number,
  distanceGoal: number
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

type Meal = {
  strMeal: string,
  strMealThumb: string,
  idMeal: string
}

type MealData = {
  idMeal: string | null;
  strMeal: string | null;
  strDrinkAlternate: string | null;
  strCategory: string | null;
  strArea: string | null;
  strInstructions: string | null;
  strMealThumb: string | null;
  strTags: string | null;
  strYoutube: string | null;
  strIngredient1: string | null;
  strIngredient2: string | null;
  strIngredient3: string | null;
  strIngredient4: string | null;
  strIngredient5: string | null;
  strIngredient6: string | null;
  strIngredient7: string | null;
  strIngredient8: string | null;
  strIngredient9: string | null;
  strIngredient10: string | null;
  strIngredient11: string | null;
  strIngredient12: string | null;
  strIngredient13: string | null;
  strIngredient14: string | null;
  strIngredient15: string | null;
  strIngredient16: string | null;
  strIngredient17: string | null;
  strIngredient18: string | null;
  strIngredient19: string | null;
  strIngredient20: string | null;
  strMeasure1: string | null;
  strMeasure2: string | null;
  strMeasure3: string | null;
  strMeasure4: string | null;
  strMeasure5: string | null;
  strMeasure6: string | null;
  strMeasure7: string | null;
  strMeasure8: string | null;
  strMeasure9: string | null;
  strMeasure10: string | null;
  strMeasure11: string | null;
  strMeasure12: string | null;
  strMeasure13: string | null;
  strMeasure14: string | null;
  strMeasure15: string | null;
  strMeasure16: string | null;
  strMeasure17: string | null;
  strMeasure18: string | null;
  strMeasure19: string | null;
  strMeasure20: string | null;
  strSource: string | null;
  strImageSource: string | null;
  strCreativeCommonsConfirmed: string | null;
  dateModified: string | null;
}

type IngredientData = {
  ingredient: string,
  measure: string
}

type ChatMessage = {
  message: string,
  ai?: boolean = false,
  time: string
}

type WorkoutStepsInfo = {
  title: string,
  reps: string,
  desc: string,
  timer?: boolean = false
}

type WorkoutDesc = {
  title: string,
  image: ImageSourcePropType,
  desc: string,
  steps: WorkoutStepsInfo[]
}