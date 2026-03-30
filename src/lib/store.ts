import { create } from "zustand";
import { persist, combine } from "zustand/middleware";
import type { FoodEntry, Goal } from "../types";
import { format } from "date-fns";

interface CalorieState {
  entries: FoodEntry[];
  goals: Goal;
  selectedDate: string;
  theme: "light" | "dark";
  addEntry: (entry: FoodEntry) => void;
  updateEntry: (entry: FoodEntry) => void;
  removeEntry: (id: string) => void;
  setGoals: (goals: Goal) => void;
  setSelectedDate: (date: string) => void;
  toggleTheme: () => void;
}

const initialState: Pick<
  CalorieState,
  "entries" | "goals" | "selectedDate" | "theme"
> = {
  entries: [],
  goals: {
    calories: 2000,
    protein: 50,
    carbs: 200,
    fat: 70,
    goalType: "custom",
  },
  selectedDate: format(new Date(), "yyyy-MM-dd"),
  theme: "light",
};

export const useCalorieStore = create<CalorieState>()(
  persist(
    combine({ ...initialState }, (set) => ({
      addEntry: (entry: FoodEntry) =>
        set((state) => ({
          entries: [...state.entries, entry],
        })),
      updateEntry: (entry: FoodEntry) =>
        set((state) => ({
          entries: state.entries.map((e) => (e.id === entry.id ? entry : e)),
        })),
      removeEntry: (id: string) =>
        set((state) => ({
          entries: state.entries.filter((entry) => entry.id !== id),
        })),
      setGoals: (goals: Goal) => set({ goals }),
      setSelectedDate: (date: string) => set({ selectedDate: date }),
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
    })),
    {
      name: "ceres-storage",
    },
  ),
);
