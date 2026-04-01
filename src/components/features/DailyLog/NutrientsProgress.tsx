import ProgressBar from "@ramonak/react-progress-bar";
import { useCalorieStore } from "../../lib/store";

const NutrientsProgress = () => {
  const { entries, goals, selectedDate } = useCalorieStore();

  const dailyEntries = entries.filter((entry) => entry.date === selectedDate);

  const currentProtein = dailyEntries.reduce(
    (acc, entry) => acc + entry.protein,
    0,
  );
  const currentCarbs = dailyEntries.reduce(
    (acc, entry) => acc + entry.carbs,
    0,
  );
  const currentFat = dailyEntries.reduce((acc, entry) => acc + entry.fat, 0);

  return (
    <div className="flex flex-row w-full justify-between gap-2 md:gap-4">
      <div className="flex flex-col gap-3 md:gap-4 flex-1 justify-around">
        <p className="text-sm md:text-base text-(--protein) font-bold">
          Protein
        </p>
        <p className="text-sm md:text-base text-(--carbs) font-bold">Carbs</p>
        <p className="text-sm md:text-base text-(--fat) font-bold">Fat</p>
      </div>

      <div className="flex flex-col gap-3 md:gap-4 flex-2 justify-around">
        <div className="w-full">
          <ProgressBar
            completed={Math.round((currentProtein / goals.protein) * 100)}
            bgColor="var(--protein)"
            baseBgColor="var(--bg-tertiary)"
            width="100%"
          />
        </div>
        <div className="w-full">
          <ProgressBar
            completed={Math.round((currentCarbs / goals.carbs) * 100)}
            bgColor="var(--carbs)"
            baseBgColor="var(--bg-tertiary)"
            width="100%"
          />
        </div>
        <div className="w-full">
          <ProgressBar
            completed={Math.round((currentFat / goals.fat) * 100)}
            bgColor="var(--fat)"
            baseBgColor="var(--bg-tertiary)"
            width="100%"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 md:gap-4 flex-1 justify-around text-right">
        <p className="text-sm md:text-base">
          {Math.round(currentProtein)}
          <span className="text-[0.7rem] tracking-wider">g</span>/{" "}
          {goals.protein}
          <span className="text-[0.7rem] tracking-wider">g</span>
        </p>
        <p className="text-sm md:text-base">
          {Math.round(currentCarbs)}
          <span className="text-[0.7rem] tracking-wider">g</span>/ {goals.carbs}
          <span className="text-[0.7rem] tracking-wider">g</span>
        </p>
        <p className="text-sm md:text-base">
          {Math.round(currentFat)}
          <span className="text-[0.7rem] tracking-wider">g</span>/ {goals.fat}
          <span className="text-[0.7rem] tracking-wider">g</span>
        </p>
      </div>
    </div>
  );
};

export default NutrientsProgress;
