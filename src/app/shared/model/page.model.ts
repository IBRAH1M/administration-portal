interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  first: boolean;
  numberOfElements: number;
  number: number;
  sort: Sort;
  empty: boolean;
}
