import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { ITodo } from '../../../app.component';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

export interface ICreateTodo {
  title: string | null;
  description: string | null;
  dueDate: string | null;
  priority: string | null;
}

@Component({
  selector: 'app-create-todo-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-todo-modal.component.html',
  styleUrl: './create-todo-modal.component.css',
})
export class CreateTodoModalComponent {
  public todoCreateForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    dueDate: new FormControl(new Date().toISOString().split('T')[0]),
    priority: new FormControl('low'),
  });

  @Input() public creatingNewTodo = false;

  @Output() sendcloseModal = new EventEmitter<void>();
  @Output() sendCreateTodo = new EventEmitter<ICreateTodo>();

  closeModal() {
    this.sendcloseModal.emit();
  }

  onCreateTodo() {
    this.sendCreateTodo.emit(this.todoCreateForm.getRawValue());

    this.todoCreateForm.disable();
    this.todoCreateForm.reset();
  }
}
