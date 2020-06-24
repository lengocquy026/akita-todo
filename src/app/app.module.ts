import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TodoPageComponent } from './todo-page/todo-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { TodoQuery } from './todos/query';
import { TodoStore } from './todos/store';
import { TodoService } from './todos/service';
import { TodoFilterComponent } from './todo-filter/todo-filter.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TodoPageComponent,
    TodoFilterComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    AngularFontAwesomeModule,
    HttpClientModule
  ],
  providers: [
    TodoQuery, TodoStore, TodoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
