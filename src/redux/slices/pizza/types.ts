export type SearchPizzaParams = {
  category: string;
  sortBy: string;
  search: string;
  currentPage: string;
  order: string;
};

export type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface PizzaSliceState {
  pizzas: Pizza[];
  status: Status;
}
