export interface SearchResult {
  id: string;
  name: string;
  calories: number;
  carbs?: number;
  protein?: number;
  fat?: number;
  servingSize?: string;
  nutriscore?: string;
}
