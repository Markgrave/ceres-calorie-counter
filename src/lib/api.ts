import axios from "axios";
import type { SearchResult } from "../types";

interface OpenFoodFactsProduct {
  code?: string;
  _id?: string;
  product_name?: string;
  serving_size?: string;
  nutrition_grades?: string;
  nutriments?: {
    "energy-kcal_100g"?: number;
    carbohydrates_100g?: number;
    protein_100g?: number;
    fat_100g?: number;
  };
}

interface OpenFoodFactsResponse {
  products: OpenFoodFactsProduct[];
}

const axiosInstance = axios.create({
  baseURL: "https://world.openfoodfacts.net/",
  timeout: 3000,
});

export const searchProducts = async (
  searchQuery: string,
): Promise<SearchResult[]> => {
  const response = await axiosInstance.get<OpenFoodFactsResponse>(
    `cgi/search.pl?search_terms=${searchQuery}&search_simple=1&page_size=5&json=1`,
  );

  const products: SearchResult[] = response.data.products.map((product) => ({
    id: product.code || product._id || "",
    name: product.product_name || "",
    calories: Math.round(product.nutriments?.["energy-kcal_100g"] || 0),
    carbs: Math.round(product.nutriments?.["carbohydrates_100g"] || 0),
    protein: Math.round(product.nutriments?.["protein_100g"] || 0),
    fat: Math.round(product.nutriments?.["fat_100g"] || 0),
    servingSize: product.serving_size || "Not specified",
    nutriscore: product.nutrition_grades?.toUpperCase() || "Not specified",
  }));

  return products.filter((product) => product.name && product.nutriscore);
};
