import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { useEffect, useRef } from "react";
import Select, { type StylesConfig } from "react-select";
import { motion, AnimatePresence } from "framer-motion";
import { RxCross1 } from "react-icons/rx";
import { RiSaveFill } from "react-icons/ri";

import { useCalorieStore } from "../../lib/store";
import type { SearchResult, MealType } from "../../types";

interface AddToMealFormProps {
  result: SearchResult;
  onClose: () => void;
}

interface FormValues {
  mealType: MealType;
  servings: number;
}

const mealOptions = [
  { value: "breakfast" as MealType, label: "Breakfast" },
  { value: "lunch" as MealType, label: "Lunch" },
  { value: "dinner" as MealType, label: "Dinner" },
  { value: "snack" as MealType, label: "Snack" },
];

const styles: StylesConfig<{ value: MealType; label: string }, false> = {
  control: (base) => ({
    ...base,
    backgroundColor: "#f5f5f5",
    border: "none",
    borderRadius: "1rem",
    padding: "0.25rem",
    cursor: "pointer",
    boxShadow: "none",
    fontWeight: "bold",
  }),
  option: (base) => ({
    ...base,
    backgroundColor: "#ffffff",
    color: "black",
    cursor: "pointer",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "oklch(87.2% 0.01 258.338)",
    },
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "1rem",
  }),
  menuList: (base) => ({
    ...base,
    padding: 0,
    borderRadius: "1rem",
  }),
  placeholder: (base) => ({
    ...base,
    color: "black",
  }),
  indicatorSeparator: () => ({ display: "none" }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "black",
  }),
};

const AddToMealForm = ({ result, onClose }: AddToMealFormProps) => {
  const { addEntry, selectedDate } = useCalorieStore();
  const { register, handleSubmit, control } = useForm<FormValues>({
    defaultValues: { servings: 1 },
  });
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOverlayClick = (event: MouseEvent) => {
      if (event.target === overlayRef.current) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleOverlayClick);
    return () => document.removeEventListener("mousedown", handleOverlayClick);
  }, [onClose]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const parsedServingSize = result.servingSize
      ? parseFloat(result.servingSize) || 100
      : 100;

    addEntry({
      id: crypto.randomUUID(),
      name: result.name,
      calories: result.calories,
      protein: result.protein ?? 0,
      carbs: result.carbs ?? 0,
      fat: result.fat ?? 0,
      servingSize: parsedServingSize,
      servings: Number(data.servings) || 1,
      type: data.mealType,
      date: selectedDate,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
        ref={overlayRef}
      >
        <form
          className="flex flex-col items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="bg-(--bg-secondary) px-6 py-4 rounded-2xl shadow-md w-80 md:w-96 z-10">
            <div className="flex flex-col gap-4 w-full">
              <div className="flex justify-between items-center">
                <h2
                  className="font-bold text-sm md:text-base truncate max-w-[70%]"
                  title={result.name}
                >
                  {result.name}
                </h2>
                <div className="flex flex-row gap-2">
                  <button
                    type="submit"
                    className="p-1 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer flex flex-row items-center"
                  >
                    <span className="text-xs md:text-sm font-bold tracking-widest text-black uppercase">
                      Add
                    </span>
                    <RiSaveFill className="text-lg md:text-xl text-black" />
                  </button>
                  <button
                    type="button"
                    className="p-1 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
                    onClick={onClose}
                  >
                    <RxCross1 className="text-lg md:text-xl text-black" />
                  </button>
                </div>
              </div>

              <div className="flex flex-row gap-3 text-xs text-gray-500 font-semibold">
                <span>{result.calories} kcal</span>
                <span>{result.carbs ?? 0}g carbs</span>
                <span>{result.protein ?? 0}g prot</span>
                <span>{result.fat ?? 0}g fat</span>
              </div>

              <div className="flex flex-row items-center gap-2">
                <label className="text-[0.6rem] md:text-xs tracking-widest text-gray-400 uppercase whitespace-nowrap">
                  Meal:
                </label>
                <Controller
                  name="mealType"
                  control={control}
                  rules={{ required: "Meal type is required" }}
                  defaultValue="breakfast"
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={mealOptions}
                      value={mealOptions.find((o) => o.value === field.value)}
                      onChange={(val) => field.onChange(val?.value)}
                      className="shadow-sm rounded-lg text-xs md:text-base flex-1"
                      styles={styles}
                    />
                  )}
                />
              </div>

              <div className="flex flex-row items-center gap-2">
                <label className="text-[0.6rem] md:text-xs tracking-widest text-gray-400 uppercase whitespace-nowrap">
                  Servings:
                </label>
                <input
                  type="number"
                  {...register("servings", {
                    required: true,
                    min: 0.1,
                    valueAsNumber: true,
                  })}
                  className="shadow-sm rounded-2xl font-bold p-2 w-full bg-gray-100"
                />
              </div>
            </div>
          </div>
        </form>
      </motion.section>
    </AnimatePresence>
  );
};

export default AddToMealForm;
