import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ITodo } from '../../../app.component';

export interface IUpdateTodo {
  title: string | null;
  description: string | null;
  isDone: boolean | null;
  id: number | null;
  dueDate: string | null;
  priority: string | null;
}

@Component({
  selector: 'app-update-todo-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-todo-modal.component.html',
  styleUrl: './update-todo-modal.component.css',
})
export class UpdateTodoModalComponent implements OnInit {
  public isEditing = false;

  @Input() public selectedTodo: ITodo | null = null;

  @Output() sendcloseModal = new EventEmitter<void>();
  @Output() sendDeleteTodo = new EventEmitter<number>();
  @Output() sendTodoUpdate = new EventEmitter<IUpdateTodo>();

  public todoUpdateForm = new FormGroup({
    id: new FormControl<number | null>(null),
    title: new FormControl(''),
    description: new FormControl(''),
    isDone: new FormControl(false),
    dueDate: new FormControl(new Date().toISOString().split('T')[0]),
    priority: new FormControl(''),
  });

  ngOnInit(): void {
    this.todoUpdateForm.disable();
    this.selectTodo(this.selectedTodo as ITodo);
  }

  closeModal() {
    this.sendcloseModal.emit();
  }

  onTodoUpdate() {
    this.todoUpdateForm.controls.id.setValue(this.selectedTodo?.id as number);
    this.sendTodoUpdate.emit(this.todoUpdateForm.getRawValue());
  }

  onCancelUpdate() {
    this.isEditing = false;
    this.todoUpdateForm.disable();

    if (this.selectedTodo) this.selectTodo(this.selectedTodo);
  }

  selectTodo(todo: ITodo) {
    this.selectedTodo = todo;

    this.todoUpdateForm.controls.id.setValue(todo.id);
    this.todoUpdateForm.controls.title.setValue(todo.title);
    this.todoUpdateForm.controls.description.setValue(todo.description);
    this.todoUpdateForm.controls.isDone.setValue(todo.isDone);
    this.todoUpdateForm.controls.dueDate.setValue(todo.dueDate);
    this.todoUpdateForm.controls.priority.setValue(todo.priority);

    this.todoUpdateForm.disable();
  }

  onDeleteTodo() {
    this.sendDeleteTodo.emit(this.selectedTodo?.id);
  }

  onEditTodo() {
    this.isEditing = true;
    this.todoUpdateForm.enable();
  }
}
