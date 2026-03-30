import DailyLog from "./components/DailyLog/DailyLog.tsx";
import Header from "./components/Header/Header.tsx";
import Meals from "./components/Meals/Meals.tsx";
import FoodSearch from "./components/FoodSearch/FoodSearch.tsx";
import SetGoalsForm from "./components/SetGoalsForm/SetGoalsForm.tsx";
import WeekChart from "./components/WeekChart/WeekChart.tsx";
import { useCalorieStore } from "./lib/store";

import { useState } from "react";

const App = () => {
  const [goalsOpen, setGoalsOpen] = useState(false);
  const { theme } = useCalorieStore();

  return (
    <main
      className={`flex align-center justify-start flex-col gap-4 p-6 w-full ${goalsOpen ? "h-screen overflow-hidden" : "h-auto"} ${theme === "dark" ? "dark" : "light"} bg-(--bg-primary) dark:bg-(--dark-bg-primary) dark:text-[#f8f9fa]`}
    >
      <Header setGoalsOpen={setGoalsOpen} />

      <section className="flex flex-col md:flex-row gap-4 w-full h-1/2">
        <DailyLog />
        <WeekChart />
      </section>

      <section className="flex flex-col md:flex-row gap-4 w-full h-1/2">
        <Meals />
        <FoodSearch />
      </section>

      {goalsOpen && <SetGoalsForm setGoalsOpen={setGoalsOpen} />}
    </main>
  );
};

export default App;
