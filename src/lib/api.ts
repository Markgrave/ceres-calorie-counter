import axios from "axios";
import type { SearchResult } from "../types";

const axiosInstance = axios.create({
  baseURL: "https://world.openfoodfacts.net/",
  timeout: 3000,
});

export const searchProducts = async (
  searchQuery: string,
): Promise<SearchResult[]> => {
  const response = await axiosInstance.get(
    `cgi/search.pl?search_terms=${searchQuery}&search_simple=1&page_size=10&json=1`,
  );

  const products = response.data.products.map((product: any) => ({
    id: product.code || product._id,
    name: product.product_name,
    calories: Math.round(product.nutriments?.["energy-kcal_100g"] || 0),
    carbs: Math.round(product.nutriments?.["carbohydrates_100g"] || 0),
    protein: Math.round(product.nutriments?.["protein_100g"] || 0),
    fat: Math.round(product.nutriments?.["fat_100g"] || 0),
    servingSize: product.serving_size || "Not specified",
    nutriscore: product.nutrition_grades?.toUpperCase() || "Not specified",
  }));

  return products.filter(
    (product: { name: any; nutriscore: any }) =>
      product.name && product.nutriscore,
  );
};
