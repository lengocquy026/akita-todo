import { EntityState, EntityStore, EntityUIStore, Order, StoreConfig } from '@datorama/akita';
import { Todo, TodoUI } from './model';
import { Injectable } from '@angular/core';
import { FILTER } from '../todo-filter/model';


export interface TodoUIState extends EntityState<TodoUI> {
}

export interface TodoState extends EntityState<Todo> {
}

const initialState = {
  filter: FILTER.ALL,
  order: Order.ASC,
};

@Injectable()
@StoreConfig({ name: 'todo' })
export class TodoStore extends EntityStore<TodoState, Todo> {
  ui: EntityUIStore<TodoUIState, TodoUI>;

  constructor() {
    super(initialState);
    this.createUIStore();
  }

  createTodo({ id, title }: Partial<Todo>) {
    this.add({ id, title, completed: false });
  }
}
