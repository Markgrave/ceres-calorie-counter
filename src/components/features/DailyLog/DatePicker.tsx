import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";
import { useState, useRef, useEffect } from "react";
import { format, subDays, addDays } from "date-fns";
import { FaLessThan } from "react-icons/fa6";
import { FaGreaterThan } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";

import { useCalorieStore } from "../../../lib/store";

const DatePicker = () => {
  const { selectedDate, setSelectedDate } = useCalorieStore();
  const defaultClassNames = getDefaultClassNames();
  const [show, setShow] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShow(false);
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show]);

  const handleSelect = (date: Date) => {
    if (date) {
      setSelectedDate(format(date, "yyyy-MM-dd"));
      setShow(false);
    }
  };

  let parsedDate = new Date(selectedDate);
  if (isNaN(parsedDate.getTime())) {
    parsedDate = new Date();
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        <button
          className="text-sm md:text-lg font-bold py-1 px-2 cursor-pointer"
          onClick={() =>
            setSelectedDate(format(subDays(parsedDate, 1), "yyyy-MM-dd"))
          }
        >
          <FaLessThan />
        </button>
        <button
          ref={buttonRef}
          onClick={() => setShow(!show)}
          className="text-sm md:text-base font-bold tracking-wider shadow-sm rounded-2xl py-1 px-2 cursor-pointer dark:bg-(--dark-bg-quaternary)"
        >
          {format(parsedDate, "E, do")} of {format(parsedDate, "MMMM")}
        </button>
        <button
          className="text-sm md:text-lg font-bold py-1 px-2 cursor-pointer"
          onClick={() =>
            setSelectedDate(format(addDays(parsedDate, 1), "yyyy-MM-dd"))
          }
        >
          <FaGreaterThan />
        </button>
      </div>
      {show && (
        <AnimatePresence>
          <motion.div
            ref={containerRef}
            className="w-fit h-fit flex items-center justify-center bg-(--bg-primary) dark:bg-(--dark-bg-quaternary) p-3 rounded-2xl shadow-2xl mb-2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.2 }}
          >
            <DayPicker
              mode="single"
              required
              selected={parsedDate}
              onSelect={handleSelect}
              classNames={{
                today: `${defaultClassNames.today} text-(--primary) dark:text-white`,
                selected: `${defaultClassNames.selected}`,
                root: `${defaultClassNames.root}`,
                chevron: ``,
              }}
            />
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default DatePicker;
