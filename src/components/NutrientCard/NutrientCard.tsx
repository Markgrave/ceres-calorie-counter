import { useState } from "react";
import { IoIosAdd } from "react-icons/io";

import type { SearchResult } from "../../types";
import AddToMealForm from "../AddToMealForm/AddToMealForm";

const NutrientCard = ({ result }: { result: SearchResult }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between gap-3 w-full p-4 bg-(--bg-secondary) dark:bg-(--dark-bg-quaternary) rounded-2xl shadow-md text-xs">
        <div className="flex flex-row justify-between items-center w-full md:w-auto md:flex-1 min-w-0">
          <div className="flex flex-row items-center gap-2 flex-1 min-w-0 mr-2">
            <button
              onClick={() => setShowForm(true)}
              className="shrink-0 bg-gray-200 dark:bg-(--dark-bg-secondary) hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors rounded-md h-full p-[2px] cursor-pointer"
            >
              <IoIosAdd className="text-black dark:text-white text-base" />
            </button>
            <div className="flex flex-col flex-1 min-w-0 text-left">
              <span className="text-gray-400 text-[0.6rem] uppercase tracking-wider">
                Name
              </span>
              <h2
                className="font-medium text-xs md:text-sm line-clamp-2 md:line-clamp-1"
                title={result.name}
              >
                {result.name}
              </h2>
            </div>
          </div>
          <div className="md:hidden flex items-center justify-center flex-col text-center shrink-0">
            <span className="text-gray-400 text-[0.6rem] uppercase tracking-wider mb-[2px]">
              Score
            </span>
            <p
              className={`w-fit px-2 py-[2px] text-gray-50 rounded-md font-bold ${
                result.nutriscore?.toUpperCase() === "A"
                  ? "bg-green-600"
                  : result.nutriscore?.toUpperCase() === "B"
                    ? "bg-green-400"
                    : result.nutriscore?.toUpperCase() === "C"
                      ? "bg-yellow-400"
                      : result.nutriscore?.toUpperCase() === "D"
                        ? "bg-orange-400"
                        : result.nutriscore
                          ? "bg-red-400"
                          : "bg-gray-400"
              }`}
            >
              {result.nutriscore?.toUpperCase() || "?"}
            </p>
          </div>
        </div>

        <div className="flex flex-row flex-wrap md:flex-nowrap items-center justify-between gap-y-3 gap-x-2 md:gap-3 w-full md:w-auto">
          <div className="flex flex-col text-center shrink-0 min-w-12">
            <span className="text-gray-400 text-[0.6rem] uppercase tracking-wider">
              Cals
            </span>
            <p className="font-semibold">{result.calories}</p>
          </div>
          <div className="flex flex-col text-center shrink-0 min-w-12">
            <span className="text-gray-400 text-[0.6rem] uppercase tracking-wider">
              Carbs
            </span>
            <p className="font-semibold">{result.carbs}g</p>
          </div>
          <div className="flex flex-col text-center shrink-0 min-w-12">
            <span className="text-gray-400 text-[0.6rem] uppercase tracking-wider">
              Prot
            </span>
            <p className="font-semibold">{result.protein}g</p>
          </div>
          <div className="flex flex-col text-center shrink-0 min-w-12">
            <span className="text-gray-400 text-[0.6rem] uppercase tracking-wider">
              Fat
            </span>
            <p className="font-semibold">{result.fat}g</p>
          </div>
          <div className="flex flex-col text-center shrink-0 min-w-12 max-w-20">
            <span className="text-gray-400 text-[0.6rem] uppercase tracking-wider">
              Serv
            </span>
            <p
              className="truncate w-full inline-block font-semibold"
              title={result.servingSize || ""}
            >
              {result.servingSize || "-"}
            </p>
          </div>

          <div className="hidden md:flex items-center justify-center flex-col text-center shrink-0 min-w-[60px]">
            <span className="text-gray-400 text-[0.6rem] uppercase tracking-wider mb-[2px]">
              Score
            </span>
            <p
              className={`w-fit px-2 py-[2px] text-gray-50 rounded-md font-bold ${
                result.nutriscore?.toUpperCase() === "A"
                  ? "bg-green-600"
                  : result.nutriscore?.toUpperCase() === "B"
                    ? "bg-green-400"
                    : result.nutriscore?.toUpperCase() === "C"
                      ? "bg-yellow-400"
                      : result.nutriscore?.toUpperCase() === "D"
                        ? "bg-orange-400"
                        : result.nutriscore
                          ? "bg-red-400"
                          : "bg-gray-400"
              }`}
            >
              {result.nutriscore?.toUpperCase() || "?"}
            </p>
          </div>
        </div>
      </div>

      {showForm && (
        <AddToMealForm result={result} onClose={() => setShowForm(false)} />
      )}
    </>
  );
};

export default NutrientCard;
