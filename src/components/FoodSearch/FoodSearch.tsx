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
    <div className="w-3/4 mx-auto flex flex-col items-center gap-4 px-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for a product..."
        className="w-full rounded-2xl p-3 shadow-md bg-linear-to-b from-(--bg-secondary) to-(--bg-primary)"
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
  );
};

export default FoodSearch;
