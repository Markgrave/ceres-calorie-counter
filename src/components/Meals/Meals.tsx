import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import { MdOutlineFreeBreakfast } from "react-icons/md";
import { FaBowlFood } from "react-icons/fa6";
import { MdDinnerDining } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { MdCookie } from "react-icons/md";

import Button from "../Button/Button";
import AddFoodForm from "../AddFoodForm/AddFoodForm";
import FoodEntryItem from "../FoodEntryItem/FoodEntryItem";
import { useCalorieStore } from "../../lib/store";
import type { FoodEntry, MealType } from "../../types";

const Meals = () => {
  const { entries, removeEntry, selectedDate } = useCalorieStore();
  const [activeForms, setActiveForms] = useState<
    Partial<Record<MealType, boolean>>
  >({});

  const dailyEntries = entries.filter((entry) => entry.date === selectedDate);

  useEffect(() => {
    setActiveForms({});
  }, [selectedDate]);

  const MEAL_CONFIG: {
    type: MealType;
    label: string;
    icon: React.ReactNode;
  }[] = [
    {
      type: "breakfast",
      label: "Breakfast",
      icon: <MdOutlineFreeBreakfast className="text-black dark:text-white" />,
    },
    {
      type: "lunch",
      label: "Lunch",
      icon: <FaBowlFood className="text-black dark:text-white" />,
    },
    {
      type: "dinner",
      label: "Dinner",
      icon: <MdDinnerDining className="text-black dark:text-white" />,
    },
    {
      type: "snack",
      label: "Snacks",
      icon: <MdCookie className="text-black dark:text-white" />,
    },
  ];

  return (
    <div className="w-full md:w-1/2 h-fit bg-(--bg-secondary) dark:bg-(--dark-bg-secondary) rounded-2xl p-3 shadow-md">
      <div className="flex flex-col justify-start items-center h-full bg-(--bg-secondary) dark:bg-(--dark-bg-tertiary) border-2 border-gray-100 dark:border-gray-700 rounded-2xl px-2 md:px-6 pt-6 pb-0 md:p-10 shadow-md gap-1">
        {MEAL_CONFIG.map((meal) => (
          <div key={meal.type} className="w-full">
            <div className="flex flex-row items-center w-full gap-2">
              {meal.icon}
              <h2 className="text-xl font-bold">{meal.label}</h2>
            </div>

            <div className="flex flex-col gap-2 px-2 md:px-6 w-full items-start mb-6">
              <AnimatePresence>
                {dailyEntries
                  .filter((entry) => entry.type === meal.type)
                  .map((entry: FoodEntry) => (
                    <FoodEntryItem
                      key={entry.id}
                      entry={entry}
                      onDelete={removeEntry}
                    />
                  ))}
              </AnimatePresence>

              {activeForms[meal.type] && (
                <AddFoodForm
                  onClose={() =>
                    setActiveForms((prev) => ({ ...prev, [meal.type]: false }))
                  }
                  mealType={meal.type}
                />
              )}

              <Button
                onClick={() =>
                  setActiveForms((prev) => ({ ...prev, [meal.type]: true }))
                }
                disabled={activeForms[meal.type]}
              >
                <IoIosAdd className="text-black dark:text-white text-2xl md:text-3xl" />
                <p className="text-sm md:text-base">Add Food</p>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Meals;
