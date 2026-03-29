import CircularProgress from "../CircularProgress/CircularProgress.tsx";
import NutrientsProgress from "../NutrientsProgress/NutrientsProgress.tsx";
import DatePicker from "../DatePicker/DatePicker.tsx";
import { useCalorieStore } from "../../lib/store.ts";

const DailyLog = () => {
  const { entries, goals, selectedDate } = useCalorieStore();

  const dailyEntries = entries.filter((entry) => entry.date === selectedDate);

  return (
    <div className="w-full md:w-3/5 h-full bg-(--bg-secondary) dark:bg-(--dark-bg-secondary) rounded-2xl p-3 shadow-md">
      <div className="flex flex-col justify-between items-center h-full bg-(--bg-secondary) dark:bg-(--dark-bg-tertiary) border-2 border-gray-100 dark:border-gray-700 rounded-2xl p-6 md:p-10 shadow-md relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2">
          <DatePicker />
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full h-full">
          <CircularProgress />

          <div className="flex flex-1 flex-col justify-center gap-6 w-full">
            <div className="flex flex-col items-center md:items-start gap-2 w-full">
              <h2>
                Goal:{" "}
                <span className="font-bold underline">
                  {goals.calories}
                  <span className="text-[0.7rem] tracking-wider">kcal</span>
                </span>
              </h2>
              <h2>
                Remaining:{" "}
                <span className="text-(--danger) font-bold">
                  {dailyEntries.reduce(
                    (acc, entry) => acc + entry.calories,
                    0,
                  ) <= goals.calories
                    ? goals.calories -
                      dailyEntries.reduce(
                        (acc, entry) => acc + entry.calories,
                        0,
                      )
                    : 0}
                  <span className="text-[0.7rem] tracking-wider">kcal</span>
                </span>
              </h2>
              <h2>
                Consumed:{" "}
                <span className="text-(--primary) font-bold">
                  {dailyEntries.reduce((acc, entry) => acc + entry.calories, 0)}
                  <span className="text-[0.7rem] tracking-wider">kcal</span>
                </span>
              </h2>
            </div>

            <NutrientsProgress />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyLog;
