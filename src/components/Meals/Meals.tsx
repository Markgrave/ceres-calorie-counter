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
import type { FoodEntry } from "../../types";

const Meals = () => {
  const { entries, removeEntry, selectedDate } = useCalorieStore();
  const [addBreakfast, setAddBreakfast] = useState<boolean>(false);
  const [addLunch, setAddLunch] = useState<boolean>(false);
  const [addDinner, setAddDinner] = useState<boolean>(false);
  const [addSnack, setAddSnack] = useState<boolean>(false);

  const dailyEntries = entries.filter((entry) => entry.date === selectedDate);

  useEffect(() => {
    setAddBreakfast(false);
    setAddLunch(false);
    setAddDinner(false);
    setAddSnack(false);
  }, [selectedDate]);

  return (
    <div className="w-full md:w-1/2 h-fit bg-(--bg-secondary) rounded-2xl p-3 shadow-md">
      <div className="flex flex-col justify-start items-center h-full bg-(--bg-secondary) border-2 border-gray-100 rounded-2xl px-6 pt-6 pb-0 md:p-10 shadow-md gap-1">
        <div className="flex flex-row items-center w-full gap-2">
          <MdOutlineFreeBreakfast className="text-black" />
          <h2 className="text-xl font-bold">Breakfast</h2>
        </div>

        <div className="flex flex-col gap-2 px-6 w-full items-start mb-6">
          <AnimatePresence>
            {dailyEntries
              .filter((entry) => entry.type === "breakfast")
              .map((entry: FoodEntry) => (
                <FoodEntryItem
                  key={entry.id}
                  entry={entry}
                  onDelete={removeEntry}
                />
              ))}
          </AnimatePresence>

          {addBreakfast && (
            <AddFoodForm
              onClose={() => setAddBreakfast(false)}
              mealType="breakfast"
            />
          )}

          <Button onClick={() => setAddBreakfast(true)} disabled={addBreakfast}>
            <IoIosAdd className="text-black text-3xl" />
            <p>Add Food</p>
          </Button>
        </div>

        <div className="flex flex-row items-center w-full gap-2">
          <FaBowlFood className="text-black" />
          <h2 className="text-xl font-bold">Lunch</h2>
        </div>

        <div className="flex flex-col gap-2 px-6 w-full items-start mb-6">
          <AnimatePresence>
            {dailyEntries
              .filter((entry) => entry.type === "lunch")
              .map((entry: FoodEntry) => (
                <FoodEntryItem
                  key={entry.id}
                  entry={entry}
                  onDelete={removeEntry}
                />
              ))}
          </AnimatePresence>

          {addLunch && (
            <AddFoodForm onClose={() => setAddLunch(false)} mealType="lunch" />
          )}

          <Button onClick={() => setAddLunch(true)} disabled={addLunch}>
            <IoIosAdd className="text-black text-3xl" />
            <p>Add Food</p>
          </Button>
        </div>

        <div className="flex flex-row items-center w-full gap-2">
          <MdDinnerDining className="text-black" />
          <h2 className="text-xl font-bold">Dinner</h2>
        </div>

        <div className="flex flex-col gap-2 px-6 mb-6 w-full items-start">
          <AnimatePresence>
            {dailyEntries
              .filter((entry) => entry.type === "dinner")
              .map((entry: FoodEntry) => (
                <FoodEntryItem
                  key={entry.id}
                  entry={entry}
                  onDelete={removeEntry}
                />
              ))}
          </AnimatePresence>

          {addDinner && (
            <AddFoodForm
              onClose={() => setAddDinner(false)}
              mealType="dinner"
            />
          )}

          <Button onClick={() => setAddDinner(true)} disabled={addDinner}>
            <IoIosAdd className="text-black text-3xl" />
            <p>Add Food</p>
          </Button>
        </div>

        <div className="flex flex-row items-center w-full gap-2">
          <MdCookie className="text-black" />
          <h2 className="text-xl font-bold">Snacks</h2>
        </div>

        <div className="flex flex-col gap-2 px-6 w-full items-start mb-6">
          <AnimatePresence>
            {dailyEntries
              .filter((entry) => entry.type === "snack")
              .map((entry: FoodEntry) => (
                <FoodEntryItem
                  key={entry.id}
                  entry={entry}
                  onDelete={removeEntry}
                />
              ))}
          </AnimatePresence>

          {addSnack && (
            <AddFoodForm onClose={() => setAddSnack(false)} mealType="snack" />
          )}

          <Button onClick={() => setAddSnack(true)} disabled={addSnack}>
            <IoIosAdd className="text-black text-3xl" />
            <p>Add Food</p>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Meals;
