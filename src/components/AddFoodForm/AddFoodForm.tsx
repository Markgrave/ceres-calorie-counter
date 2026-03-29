import { RxCross1 } from "react-icons/rx";
import { IoMdCheckmark } from "react-icons/io";

import { useForm, type SubmitHandler } from "react-hook-form";
import { isSameDay, compareAsc } from "date-fns";
import { motion } from "framer-motion";

import { useCalorieStore } from "../../lib/store";
import type { FoodEntry } from "../../types";

interface FormProps {
  onClose: () => void;
  mealType: FoodEntry["type"];
  existingEntry?: FoodEntry;
}

const AddFoodForm = ({ onClose, mealType, existingEntry }: FormProps) => {
  const { addEntry, updateEntry, selectedDate } = useCalorieStore();

  const { register, handleSubmit } = useForm<FoodEntry>();

  const onSubmit: SubmitHandler<FoodEntry> = (data) => {
    const entry: FoodEntry = {
      id: existingEntry?.id || crypto.randomUUID(),
      name: data.name,
      calories: Number(data.calories),
      protein: Number(data.protein),
      carbs: Number(data.carbs),
      fat: Number(data.fat),
      servingSize: Number(data.servingSize),
      servings: Number(data.servings) || 1,
      type: mealType,
      date: selectedDate,
    };
    if (existingEntry) {
      updateEntry(entry);
    } else {
      addEntry(entry);
    }
    onClose();
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="flex w-full flex-row justify-between items-center gap-6 mb-2 mt-4 rounded-lg p-2 bg-gray-200 dark:bg-(--dark-bg-quaternary)"
    >
      <form
        className="flex flex-col items-stretch w-full gap-2"
        onSubmit={handleSubmit(onSubmit)}
        id={`add-food-form-${mealType}`}
      >
        <div className="flex flex-row justify-between gap-2 w-full md:w-3/4">
          <input
            type="text"
            placeholder="Name"
            {...register("name", { value: existingEntry?.name || "" })}
            className="w-1/3 border-2 rounded-lg px-2 tracking-tighter truncate text-sm md:text-base text-gray-500 border-gray-300 bg-gray-100 focus:outline-none"
          />
          <input
            type="number"
            {...register("calories", {
              value: existingEntry?.calories,
              required: true,
              min: 1,
            })}
            placeholder="kcal"
            className="w-1/3 border-2 rounded-lg px-2 tracking-tighter truncate text-sm md:text-base text-gray-500 border-gray-300 bg-gray-100 focus:outline-none"
          />
          <input
            type="number"
            {...register("servingSize", {
              value: existingEntry?.servingSize,
              required: true,
              min: 1,
            })}
            placeholder="Size"
            className="w-1/3 border-2 rounded-lg px-2 tracking-tighter truncate text-sm md:text-base text-gray-500 border-gray-300 bg-gray-100 focus:outline-none"
          />
        </div>

        <div className="flex flex-row justify-between items-center gap-2 w-full md:w-3/4">
          <input
            type="number"
            {...register("protein", {
              value: existingEntry?.protein,
              required: true,
              min: 1,
            })}
            placeholder="Protein"
            className="w-1/3 border-2 rounded-lg px-2 tracking-tighter truncate text-sm md:text-base text-gray-500 border-gray-300 bg-gray-100 focus:outline-none"
          />
          <input
            type="number"
            {...register("carbs", {
              value: existingEntry?.carbs,
              required: true,
              min: 1,
            })}
            placeholder="Carbs"
            className="w-1/3 border-2 rounded-lg px-2 tracking-tighter truncate text-sm md:text-base text-gray-500 border-gray-300 bg-gray-100 focus:outline-none"
          />
          <input
            type="number"
            {...register("fat", {
              value: existingEntry?.fat,
              required: true,
              min: 1,
            })}
            placeholder="Fats"
            className="w-1/3 border-2 rounded-lg px-2 tracking-tighter truncate text-sm md:text-base text-gray-500 border-gray-300 bg-gray-100 focus:outline-none"
          />
        </div>
      </form>

      <div className="flex flex-col gap-2">
        <button
          type="submit"
          form={`add-food-form-${mealType}`}
          className="bg-gray-300 p-1 rounded-lg hover:bg-gray-400 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-default hover:disabled:bg-gray-300"
          disabled={
            !isSameDay(new Date(selectedDate), new Date()) &&
            compareAsc(new Date(selectedDate), new Date()) !== -1
          }
        >
          <IoMdCheckmark className="text-lg text-gray-600" />
        </button>

        <button
          className="bg-gray-300 p-1 rounded-lg hover:bg-gray-400 transition-colors cursor-pointer"
          onClick={onClose}
        >
          <RxCross1 className="text-lg text-gray-600" />
        </button>
      </div>
    </motion.div>
  );
};

export default AddFoodForm;
