import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { useEffect, useRef } from "react";
import Select, { type StylesConfig } from "react-select";
import { motion, AnimatePresence } from "framer-motion";

import type { Goal } from "../../types";
import { RxCross1 } from "react-icons/rx";
import { RiSaveFill } from "react-icons/ri";
import { useCalorieStore } from "../../lib/store.ts";

interface SetGoalsFormProps {
  setGoalsOpen: (value: boolean) => void;
}

const goalOptions = [
  { value: "custom", label: "Custom" },
  { value: "weight loss", label: "Lose" },
  { value: "weight maintenance", label: "Maintain" },
  { value: "muscle gain", label: "Gain" },
] as const;

const activityOptions = [
  { value: "sedentary", label: "Sedentary" },
  { value: "light", label: "Light" },
  { value: "moderate", label: "Moderate" },
  { value: "active", label: "Active" },
  { value: "veryActive", label: "Very Active" },
] as const;

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
] as const;

const activityMultipliers = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  veryActive: 1.9,
} as const;

const calculateTDEE = ({
  weight,
  height,
  age,
  gender,
  activityLevel,
}: Partial<Goal>) => {
  if (!weight || !height || !age || !gender || !activityLevel) return 0;

  const bmr =
    gender === "male"
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;

  return bmr * activityMultipliers[activityLevel];
};

const styles: StylesConfig<{ value: string; label: string }, false> = {
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

const SetGoalsForm = ({ setGoalsOpen }: SetGoalsFormProps) => {
  const { register, handleSubmit, control, watch } = useForm<Goal>();
  const { setGoals } = useCalorieStore();

  const overlayRef = useRef<HTMLDivElement>(null);

  const goalType = watch("goalType");

  const onSubmit: SubmitHandler<Goal> = (data) => {
    const tdee = Math.round(calculateTDEE(data));
    const weight = data.weight ?? 0;

    switch (data.goalType) {
      case "custom":
        setGoals(data);
        setGoalsOpen(false);
        break;

      case "weight loss": {
        const deficit = tdee - 500;
        const proteinCut = weight * 2.2;
        const fatCut = weight * 0.9;
        const carbsCut = (deficit - proteinCut * 4 - fatCut * 9) / 4;

        setGoals({
          ...data,
          calories: deficit,
          protein: Math.round(proteinCut),
          fat: Math.round(fatCut),
          carbs: Math.round(carbsCut),
        });
        setGoalsOpen(false);
        break;
      }

      case "weight maintenance": {
        const proteinMaint = weight * 1.8;
        const fatMaint = weight * 1.0;
        const carbsMaint = (tdee - proteinMaint * 4 - fatMaint * 9) / 4;

        setGoals({
          ...data,
          calories: tdee,
          protein: Math.round(proteinMaint),
          fat: Math.round(fatMaint),
          carbs: Math.round(carbsMaint),
        });
        setGoalsOpen(false);
        break;
      }

      case "muscle gain": {
        const surplus = tdee + 300;
        const proteinBulk = weight * 1.8;
        const fatBulk = weight * 1.0;
        const carbsBulk = (surplus - proteinBulk * 4 - fatBulk * 9) / 4;

        setGoals({
          ...data,
          calories: surplus,
          protein: Math.round(proteinBulk),
          fat: Math.round(fatBulk),
          carbs: Math.round(carbsBulk),
        });
        setGoalsOpen(false);
        break;
      }
    }
  };

  useEffect(() => {
    const handleOverlayClick = (event: MouseEvent) => {
      if (event.target === overlayRef.current) {
        setGoalsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOverlayClick);

    return () => {
      document.removeEventListener("mousedown", handleOverlayClick);
    };
  }, [setGoalsOpen]);

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
          <div
            className={`bg-(--bg-secondary) px-6 py-4 rounded-2xl w-1/2 z-10 ${goalType !== "custom" ? "shadow-xs rounded-b-none" : "md:shadow-md"} transition-all duration-300`}
          >
            <div className="flex flex-col gap-3 w-full">
              <div className="flex justify-between flex-col-reverse md:flex-row items-center gap-4">
                <Controller
                  name="goalType"
                  control={control}
                  rules={{
                    required: "Goal type is required",
                  }}
                  defaultValue="custom"
                  render={({ field }) => (
                    <div className="flex flex-row items-center gap-2">
                      <label className="text-[0.6rem] md:text-xs md:tracking-widest text-gray-400 uppercase">
                        Goal:
                      </label>
                      <Select
                        {...field}
                        options={goalOptions}
                        value={goalOptions.find((c) => c.value === field.value)}
                        onChange={(val) => field.onChange(val?.value)}
                        className="shadow-sm rounded-lg text-xs md:text-base"
                        placeholder="Custom"
                        styles={styles}
                      />
                    </div>
                  )}
                />
                <div className="flex w-full justify-end md:w-auto flex-row gap-2">
                  <button
                    type="submit"
                    className="p-1 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer flex flex-row items-center"
                  >
                    <span className="text-xs md:text-sm font-bold tracking-widest text-black uppercase">
                      Save
                    </span>
                    <RiSaveFill className="text-lg md:text-xl text-black" />
                  </button>
                  <button
                    className="p-1 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
                    onClick={() => setGoalsOpen(false)}
                  >
                    <RxCross1 className="text-lg md:text-xl text-black" />
                  </button>
                </div>
              </div>

              <div className="flex text-[0.6rem] md:text-base font-bold flex-row flex-wrap justify-between md:flex-nowrap gap-2 w-full">
                <input
                  {...register("calories", {
                    required:
                      goalType === "custom" ? "Calories are required" : false,
                    valueAsNumber: true,
                  })}
                  type="number"
                  placeholder="Calories"
                  className="shadow-sm rounded-lg p-2 w-2/5 md:w-full disabled:bg-gray-300"
                  disabled={goalType !== "custom"}
                />

                <input
                  {...register("protein", {
                    required:
                      goalType === "custom" ? "Protein is required" : false,
                    valueAsNumber: true,
                  })}
                  type="number"
                  placeholder="Protein"
                  className="shadow-sm rounded-lg p-2 w-2/5 md:w-full disabled:bg-gray-300"
                  disabled={goalType !== "custom"}
                />

                <input
                  {...register("carbs", {
                    required:
                      goalType === "custom" ? "Carbs are required" : false,
                    valueAsNumber: true,
                  })}
                  type="number"
                  placeholder="Carbs"
                  className="shadow-sm rounded-lg p-2 w-2/5 md:w-full disabled:bg-gray-300"
                  disabled={goalType !== "custom"}
                />

                <input
                  {...register("fat", {
                    required: goalType === "custom" ? "Fat is required" : false,
                    valueAsNumber: true,
                  })}
                  type="number"
                  placeholder="Fat"
                  className="shadow-sm rounded-lg p-2 w-2/5 md:w-full disabled:bg-gray-300"
                  disabled={goalType !== "custom"}
                />
              </div>
            </div>
          </div>

          <AnimatePresence>
            {goalType !== "custom" && (
              <motion.div
                key="extended-form"
                className="flex flex-col gap-2 text-xs md:text-base bg-(--bg-secondary) px-6 py-4 rounded-b-2xl shadow-xs w-1/2 z-0"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Controller
                  name="activityLevel"
                  control={control}
                  rules={{
                    required: "Activity level is required",
                  }}
                  render={({ field }) => (
                    <div className="flex flex-row items-center gap-2">
                      <label className="text-[0.6rem] md:text-xs md:tracking-widest text-gray-400 uppercase">
                        Activity:
                      </label>
                      <Select
                        {...field}
                        options={activityOptions}
                        value={activityOptions.find(
                          (c) => c.value === field.value,
                        )}
                        onChange={(val) => field.onChange(val?.value)}
                        className="shadow-sm rounded-lg text-xs md:text-base"
                        placeholder="Sedentary"
                        styles={styles}
                      />
                    </div>
                  )}
                />
                <div className="flex flex-row flex-wrap justify-between md:flex-nowrap gap-2 w-full">
                  <input
                    {...register("weight", {
                      required: "Weight is required",
                      valueAsNumber: true,
                    })}
                    type="number"
                    placeholder="Weight"
                    className="shadow-sm rounded-lg font-bold p-2 md:w-full w-2/5"
                  />

                  <input
                    {...register("height", {
                      required: "Height is required",
                      valueAsNumber: true,
                    })}
                    type="number"
                    placeholder="Height"
                    className="shadow-sm rounded-lg font-bold p-2 md:w-full w-2/5"
                  />

                  <input
                    {...register("age", {
                      required: "Age is required",
                      valueAsNumber: true,
                    })}
                    type="number"
                    placeholder="Age"
                    className="shadow-sm rounded-lg font-bold p-2 md:w-full w-2/5"
                  />

                  <Controller
                    name="gender"
                    control={control}
                    rules={{
                      required: "Gender is required",
                    }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={genderOptions}
                        value={genderOptions.find(
                          (c) => c.value === field.value,
                        )}
                        onChange={(val) => field.onChange(val?.value)}
                        className="shadow-sm rounded-lg text-xs md:text-base w-2/5 md:w-full"
                        placeholder="Gender"
                        styles={styles}
                      />
                    )}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </motion.section>
    </AnimatePresence>
  );
};

export default SetGoalsForm;
