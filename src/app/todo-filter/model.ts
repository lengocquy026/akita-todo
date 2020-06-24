export enum FILTER {
  ALL = 'ALL',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED'
}

export interface TodoFilter {
  label: string;
  value: FILTER;
}

export const TodoFilters: TodoFilter[] = [
  { label: 'Show all tasks', value: FILTER.ALL },
  { label: 'Show active tasks', value: FILTER.ACTIVE },
  { label: 'Show completed tasks', value: FILTER.COMPLETED },
];


