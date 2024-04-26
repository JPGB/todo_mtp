import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';

export interface ITodo {
  id: number;
  title: string;
  description: string;
  isDone: boolean;
  dueDate: string;
  priority: 'high' | 'moderate' | 'low';
}

export interface IListTodosByDate {
  late: ITodo[];
  today: ITodo[];
  tomorrow: ITodo[];
  soon: ITodo[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
