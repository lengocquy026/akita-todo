import { TodoStore } from './store';
import { guid, ID, Order } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { timer, Observable } from 'rxjs';
import { mapTo, take } from 'rxjs/operators';
import { Todo } from './model';
import { FILTER } from '../todo-filter/model';
import { TodoQuery } from './query';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class TodoService {
  private readonly baseUrl = `${environment.baseUrl}/todos`;

  constructor(private store: TodoStore, private todoQuery: TodoQuery,
              private http: HttpClient) {
  }

  add(title: string): Observable<Todo> {
    return this.http.post<Todo>(this.baseUrl, {title}).pipe(
      tap(value => {
        this.store.add([value]);
      })
    )
  }

  delete(todoId: string):Observable<Todo> {
    return this.http.delete<Todo>(`${this.baseUrl}/${todoId}`).pipe(
      tap(result => {
        this.store.remove(todoId);
      })
    );
  }

  complete(id: ID, completed: boolean) {
    this.store.update(id, { completed });
  }

  updateCurrentFilter(filter: FILTER) {
    this.store.update({ filter });
  }

  getTasks(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.baseUrl).pipe(
      tap(result => {
        this.store.set(result);
      })
    )
  }

  toggle() {
    this.store.update(null, todo => ({
      completed: !todo.completed
    }));
  }

  updateOrder(order: Order) {
    this.store.update({ order });
  }

  toggleOrder() {
    this.todoQuery.selectCurrentOrder$
      .pipe(take(1))
      .subscribe(order => this.updateOrder(order === Order.ASC ? Order.DESC : Order.ASC));
  }
}
