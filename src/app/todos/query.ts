import { EntityUIQuery, Order, QueryConfig, QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { TodoState, TodoStore, TodoUIState } from './store';
import { Todo, TodoUI } from './model';
import { combineLatest, Observable } from 'rxjs';
import { FILTER } from '../todo-filter/model';
import { switchMap } from 'rxjs/operators';

@Injectable()
@QueryConfig({
  sortBy: 'title',
  sortByOrder: Order.ASC
})
export class TodoQuery extends QueryEntity<TodoState, Todo> {
  ui: EntityUIQuery<TodoUIState, TodoUI>;

  constructor(protected store: TodoStore) {
    super(store);
    this.createUIQuery();
  }

  selectCurrentFilter$: Observable<FILTER> = this.select(state => state.filter);
  selectCurrentOrder$: Observable<Order> = this.select(state => state.order);

  selectVisibleTodos$: Observable<Todo[]> = combineLatest(
    this.selectCurrentOrder$.pipe(
      switchMap(order => this.selectAll({ sortByOrder: order }))
    ),
    this.selectCurrentFilter$,
    (todos, filter) => {
      switch (filter) {
        case FILTER.ACTIVE:
          return todos.filter(todo => !todo.completed);
        case FILTER.COMPLETED:
          return todos.filter(todo => todo.completed);
      }

      return todos;
    }
  );

}
