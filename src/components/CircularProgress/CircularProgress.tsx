import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useCalorieStore } from "../../lib/store";

const styles = buildStyles({
  pathColor: "black",
  textColor: "black",
  trailColor: "var(--bg-tertiary)",
  pathTransitionDuration: 0.5,
});

const CircularProgress = () => {
  const { entries, goals, selectedDate } = useCalorieStore();

  const dailyEntries = entries.filter((entry) => entry.date === selectedDate);

  return (
    <div className="w-40 h-40">
      <CircularProgressbar
        value={dailyEntries.reduce((acc, entry) => acc + entry.calories, 0)}
        maxValue={goals.calories}
        text={`${Math.round((dailyEntries.reduce((acc, entry) => acc + entry.calories, 0) / goals.calories) * 100)}%`}
        styles={styles}
      />
    </div>
  );
};

export default CircularProgress;
