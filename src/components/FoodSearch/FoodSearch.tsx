import { useDebounce } from "../../hooks/useDebounce";
import { useState, useEffect } from "react";
import { searchProducts } from "../../lib/api";
import type { SearchResult } from "../../types";
import NutrientCard from "../NutrientCard/NutrientCard";

const FoodSearch = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchSuggestions = async () => {
      if (debouncedSearchTerm.length < 3) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const products = await searchProducts(debouncedSearchTerm);
        setResults(products);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();

    return () => controller.abort();
  }, [debouncedSearchTerm]);

  return (
    <div className="w-full md:w-1/2 h-fit bg-(--bg-secondary) dark:bg-(--dark-bg-secondary) rounded-2xl p-3 shadow-md">
      <div className="flex flex-col justify-start items-start h-full bg-(--bg-secondary) dark:bg-(--dark-bg-tertiary) border-2 border-gray-100 dark:border-gray-700 rounded-2xl px-6 py-6 shadow-md gap-1">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a product..."
          className="w-full rounded-2xl p-3 shadow-md bg-(--bg-secondary) dark:bg-(--dark-bg-quaternary) mb-6"
        />
        {loading && <p>Loading...</p>}
        <ul className="flex flex-col gap-2 w-full">
          {results.map((result) => (
            <li key={result.id} className="text-sm w-full">
              <NutrientCard result={result} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FoodSearch;
