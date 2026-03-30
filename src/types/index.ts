export interface SearchResult {
  id: string;
  name: string;
  calories: number;
  carbs?: number;
  protein?: number;
  fat?: number;
  servingSize?: string;
  nutriscore?: string;
}

export interface FoodEntry {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  servingSize: number;
  servings: number;
  type: "breakfast" | "lunch" | "dinner" | "snack";
  date: string;
}

export interface Goal {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  goalType: "custom" | "weight loss" | "weight maintenance" | "muscle gain";
  weight?: number;
  height?: number;
  age?: number;
  gender?: "male" | "female";
  activityLevel?: "sedentary" | "light" | "moderate" | "active" | "veryActive";
}
