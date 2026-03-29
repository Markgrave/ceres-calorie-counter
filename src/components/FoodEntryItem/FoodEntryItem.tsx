import { useState } from "react";
import { motion } from "framer-motion";

import { FaTrashAlt } from "react-icons/fa";
import { FaPen } from "react-icons/fa";

import type { FoodEntry } from "../../types";
import AddFoodForm from "../AddFoodForm/AddFoodForm";

interface FoodEntryItemProps {
  entry: FoodEntry;
  onDelete: (id: string) => void;
}

const FoodEntryItem = ({ entry, onDelete }: FoodEntryItemProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return isEditing === false ? (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="flex flex-row justify-between gap-3 w-full px-4 py-2 bg-(--bg-secondary) rounded-2xl shadow-md"
    >
      <div className="flex flex-row justify-between items-center w-3/5">
        <div>
          <span className="text-gray-400 text-[0.6rem] uppercase tracking-wider">
            Name
          </span>
          <p className="text-center">{entry.name}</p>
        </div>

        <div>
          <span className="text-gray-400 text-[0.6rem] uppercase tracking-wider">
            Serving
          </span>
          <p className="text-center">
            {entry.servingSize}
            <span className="text-[0.7rem] tracking-wider">g</span>
          </p>
        </div>

        <div>
          <span className="text-gray-400 text-[0.6rem] uppercase tracking-wider">
            Calories
          </span>
          <p className="text-center">
            {entry.calories}
            <span className="text-[0.7rem] tracking-wider">kcal</span>
          </p>
        </div>
      </div>

      <div className="flex flex-row justify-center items-center gap-4">
        <button
          className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
          onClick={() => setIsEditing(!isEditing)}
        >
          <FaPen className="text-md" />
        </button>
        <button
          className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
          onClick={() => onDelete(entry.id)}
        >
          <FaTrashAlt className="text-md" />
        </button>
      </div>
    </motion.div>
  ) : (
    <AddFoodForm
      onClose={() => setIsEditing(false)}
      mealType={entry.type}
      existingEntry={entry}
    />
  );
};

export default FoodEntryItem;
