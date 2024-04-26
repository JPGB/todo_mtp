import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { ITodo } from '../../../app.component';
import { FormGroup, FormControl } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IFilters } from '../header/header.component';

@Component({
  selector: 'app-list-todo',
  standalone: true,
  imports: [],
  templateUrl: './list-todo.component.html',
  styleUrl: './list-todo.component.css',
})
export class ListTodoComponent {
  @Input() public todos: ITodo[] = [];
  @Input() public filters!: IFilters;

  @Output() sendToggleIsDone = new EventEmitter<ITodo>();
  @Output() sendSelectedTodo = new EventEmitter<ITodo>();

  public selectedTodo: ITodo | null = null;

  public isEditing = false;
  public creatingNewTodo = false;

  public todoUpdateForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    isDone: new FormControl(false),
    id: new FormControl(),
    dueDate: new FormControl(new Date().toISOString().slice(0, -1)),
    priority: new FormControl(''),
  });

  public todoCreateForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    dueDate: new FormControl(new Date().toISOString().split('T')[0]),
    priority: new FormControl('low'),
  });

  selectTodo(todo: ITodo) {
    this.selectedTodo = todo;

    this.todoUpdateForm.controls.description.setValue(todo.description);
    this.todoUpdateForm.controls.title.setValue(todo.title);
    this.todoUpdateForm.controls.isDone.setValue(todo.isDone);
    this.todoUpdateForm.controls.id.setValue(todo.id);

    this.todoUpdateForm.disable();

    this.sendSelectedTodo.emit(todo);
  }

  toggleIsDone(todo: ITodo) {
    this.sendToggleIsDone.emit(todo);
  }
}
