import { useDebounce } from "../../hooks/useDebounce";
import { useState, useEffect } from "react";
import { searchProducts } from "../../lib/api";
import axios from "axios";
import type { SearchResult } from "../../types";
import NutrientCard from "../NutrientCard/NutrientCard";
import { TailSpin } from "react-loader-spinner";

const FoodSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchSuggestions = async () => {
      if (debouncedSearchTerm.length < 3) {
        setResults([]);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const products = await searchProducts(
          debouncedSearchTerm,
          controller.signal,
        );
        setResults(products);
      } catch (err) {
        if (axios.isCancel(err)) {
          return;
        }
        console.error(err);
        setError("Failed to fetch products. Please try again.");
        setResults([]);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchSuggestions();

    return () => controller.abort();
  }, [debouncedSearchTerm]);

  return (
    <div className="w-full md:w-1/2 h-fit bg-(--bg-secondary) dark:bg-(--dark-bg-secondary) rounded-2xl p-3 shadow-md">
      <div className="flex flex-col justify-start items-center h-full bg-(--bg-secondary) dark:bg-(--dark-bg-tertiary) border-2 border-gray-100 dark:border-gray-700 rounded-2xl px-6 py-6 shadow-md gap-1">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a product..."
          className="w-full rounded-2xl p-3 shadow-md bg-(--bg-secondary) dark:bg-(--dark-bg-quaternary) mb-6"
        />
        {error && (
          <div className="w-full text-(--danger) bg-red-100 dark:bg-red-900/30 p-3 rounded-xl mb-4 text-sm text-center border-2 border-red-200 dark:border-red-800">
            {error}
          </div>
        )}
        {loading && (
          <TailSpin
            visible={true}
            height="50"
            width="50"
            color="oklch(27.9% 0.041 260.031)"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
          />
        )}
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
