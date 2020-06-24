import { ID, Order } from '@datorama/akita';
import { FILTER } from '../todo-filter/model';

export interface Todo {
  id: ID;
  title: string;
  completed: boolean;
}

export interface TodoUI {
  filter: FILTER;
  order: Order;
}

