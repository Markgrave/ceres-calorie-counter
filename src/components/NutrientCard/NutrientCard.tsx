import type { SearchResult } from "../../types";

const NutrientCard = ({ result }: { result: SearchResult }) => {
  return (
    <div className="flex flex-row justify-between items-center gap-3 w-full p-4 bg-(--bg-secondary) rounded-2xl shadow-md text-xs">
      <div className="flex flex-col flex-1 min-w-0 text-left">
        <span className="text-gray-400 text-xs">name</span>
        <h2 className="truncate font-medium" title={result.name}>
          {result.name}
        </h2>
      </div>
      <div className="flex flex-col text-center shrink-0">
        <span className="text-gray-400 text-[0.6rem]">calories</span>
        <p>{result.calories}kcal</p>
      </div>
      <div className="flex flex-col text-center shrink-0">
        <span className="text-gray-400 text-[0.6rem]">carbs</span>
        <p>{result.carbs}g</p>
      </div>
      <div className="flex flex-col text-center shrink-0">
        <span className="text-gray-400 text-[0.6rem]">protein</span>
        <p>{result.protein}g</p>
      </div>
      <div className="flex flex-col text-center shrink-0">
        <span className="text-gray-400 text-[0.6rem]">fat</span>
        <p>{result.fat}g</p>
      </div>
      <div className="flex flex-col text-center shrink-0">
        <span className="text-gray-400 text-[0.6rem]">serving</span>
        <p
          className="truncate w-full inline-block"
          title={result.servingSize || ""}
        >
          {result.servingSize || "-"}
        </p>
      </div>
      <div className="flex items-center justify-center flex-col text-center shrink-0 min-w-[80px]">
        <span className="text-gray-400 text-[0.6rem]">nutriscore</span>
        <p
          className={`w-fit px-2 py-1 text-gray-50 rounded-md ${
            result.nutriscore === "A"
              ? "bg-green-600"
              : result.nutriscore === "B"
                ? "bg-green-400"
                : result.nutriscore === "C"
                  ? "bg-yellow-400"
                  : result.nutriscore === "D"
                    ? "bg-orange-400"
                    : "bg-red-400"
          }`}
        >
          {result.nutriscore}
        </p>
      </div>
    </div>
  );
};

export default NutrientCard;
