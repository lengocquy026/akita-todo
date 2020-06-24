import { Component, OnInit } from '@angular/core';
import { Todo } from '../todos/model';
import { TodoQuery } from '../todos/query';
import { Observable } from 'rxjs';
import { TodoService } from '../todos/service';
import { FILTER, TodoFilters } from '../todo-filter/model';
import { take, takeLast } from 'rxjs/operators';
import { Order } from '@datorama/akita';


@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.css']
})
export class TodoPageComponent implements OnInit {
  list$ = this.todoQuery.selectVisibleTodos$;
  isLoading$: Observable<boolean> = this.todoQuery.selectLoading();
  currentFilter$ = this.todoQuery.selectCurrentFilter$;
  currentOrder$ = this.todoQuery.selectCurrentOrder$;
  count$ = this.todoQuery.selectCount();
  completedCount$ = this.todoQuery.selectCount(todo => todo.completed);
  filters = TodoFilters;
  text: string;

  constructor(private todoService: TodoService, private todoQuery: TodoQuery) {
  }

  ngOnInit() {
    this.todoService.getTasks().subscribe(
      result => {
        console.log(result);
      }
    );
  }

  add(title: string) {
    this.todoService.add(title).subscribe(
      result => {
        console.log(result);
      }
    );
  }

  delete(todoId: string) {
    this.todoService.delete(todoId).subscribe(
      result => {
        console.log(result);
      }
    );
  }

  complete(todo: Todo) {
    this.todoService.complete(todo.id, !todo.completed);
  }

  onChangeFilter(filter: FILTER) {
    this.todoService.updateCurrentFilter(filter);
  }

  trackByFn(index, item) {
    return item.id;
  }

  toggle() {
    this.todoService.toggle();
  }

  toggleOrder() {
    this.todoService.toggleOrder();
  }
}
