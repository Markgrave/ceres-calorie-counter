import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useCalorieStore } from "../../lib/store";
import { subDays, format } from "date-fns";
import { useEffect, useState } from "react";

const WeekChart = () => {
  const { entries, selectedDate } = useCalorieStore();
  const [data, setData] = useState<Array<{ name: string; value: number }>>([]);

  useEffect(() => {
    const today = new Date(selectedDate);

    const data = Array.from({ length: 7 }, (_, i) => {
      const day = subDays(today, 6 - i);
      const dayStr = format(day, "yyyy-MM-dd");
      const totalCalories = entries
        .filter((entry) => entry.date === dayStr)
        .reduce((sum, entry) => sum + entry.calories, 0);

      return {
        name: format(day, "E, do"),
        value: totalCalories,
      };
    });

    setData(data);
  }, [entries, selectedDate]);

  return (
    <section className="w-full md:w-2/5 h-full bg-(--bg-secondary) dark:bg-(--dark-bg-secondary) rounded-2xl shadow-md p-4">
      <div className="bg-(--bg-secondary) dark:bg-(--dark-bg-tertiary) border-2 border-gray-100 dark:border-gray-700 rounded-2xl p-3 md:p-6 shadow-md aspect-video">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="oklch(27.9% 0.041 260.031)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default WeekChart;
