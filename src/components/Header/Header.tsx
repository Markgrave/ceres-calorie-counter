import { IoSettingsOutline } from "react-icons/io5";
import { IoMoon } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";

import { useCalorieStore } from "../../lib/store";
import { motion } from "framer-motion";

interface HeaderProps {
  setGoalsOpen: (value: boolean) => void;
}

const Header = ({ setGoalsOpen }: HeaderProps) => {
  const { toggleTheme, theme } = useCalorieStore();
  return (
    <section className="flex justify-between align-center w-full bg-(--bg-secondary) dark:bg-(--dark-bg-secondary) rounded-2xl py-4 px-6 shadow-md text-shadow-sm">
      <h1 className="text-2xl font-bold">Ceres</h1>

      <div className="flex flex-row gap-6">
        <IoSettingsOutline
          size={24}
          className="hover:cursor-pointer"
          onClick={() => setGoalsOpen(true)}
        />
        <button
          className={`w-12 h-6 px-1 flex items-center rounded-full bg-(--bg-secondary) dark:bg-(--dark-bg-tertiary) shadow-sm hover:cursor-pointer ${theme === "dark" ? "justify-end" : "justify-start"}`}
          onClick={toggleTheme}
        >
          <motion.div
            className="w-4 h-4 rounded-full bg-(--bg-tertiary) flex items-center justify-center"
            layout
            transition={{ duration: 0.2 }}
          >
            {theme === "dark" ? (
              <IoMoon className="text-xs" />
            ) : (
              <IoSunny className="text-xs" />
            )}
          </motion.div>
        </button>
      </div>
    </section>
  );
};

export default Header;
