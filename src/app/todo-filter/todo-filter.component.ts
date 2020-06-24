import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { FILTER, TodoFilter } from './model';
import { FormControl } from '@angular/forms';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-todo-filter',
  templateUrl: './todo-filter.component.html',
  styleUrls: ['./todo-filter.component.css']
})
export class TodoFilterComponent implements OnInit, OnDestroy {
  @Input() state: FILTER;
  @Input() list: TodoFilter[];
  @Output() onChange = new EventEmitter<FILTER>();

  private control: FormControl;

  constructor() {
  }

  ngOnInit() {
    this.control = new FormControl(this.state);

    this.control.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(this.onChange);
  }

  ngOnDestroy(): void {
  }
}
