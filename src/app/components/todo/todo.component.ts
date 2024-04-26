import { Component, Input, OnInit } from '@angular/core';
import { ListTodoComponent } from './list-todo/list-todo.component';
import { IListTodosByDate, ITodo } from '../../app.component';
import { HeaderComponent, IFilters } from './header/header.component';
import {
  CreateTodoModalComponent,
  ICreateTodo,
} from './create-todo-modal/create-todo-modal.component';
import {
  IUpdateTodo,
  UpdateTodoModalComponent,
} from './update-todo-modal/update-todo-modal.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    ListTodoComponent,
    HeaderComponent,
    CreateTodoModalComponent,
    UpdateTodoModalComponent,
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent implements OnInit {
  public creatingNewTodo = false;

  todosByDate: IListTodosByDate = {
    late: [],
    today: [],
    tomorrow: [],
    soon: [],
  };

  public filters: IFilters = {
    low: true,
    moderate: true,
    high: true,
    pending: true,
    completed: true,
  };

  public selectedTodo: ITodo | null = null;

  constructor(private httpService: HttpClient) {}

  ngOnInit(): void {
    this.getTodos();
  }

  createTodo(todo: ICreateTodo) {
    this.httpService
      .post('https://localhost:7203/api/Todo', todo)
      .subscribe(() => {
        this.getTodos();
      });

    this.creatingNewTodo = false;
  }

  getTodos() {
    this.httpService
      .get<ITodo[]>('https://localhost:7203/api/Todo')
      .subscribe((data) => {
        const todos = data.reduce(
          (accumulator, todo) => {
            let [year, month, day] = todo.dueDate.split('-');
            const date = new Date(`${month}-${day}-${year}`);

            [year, month, day] = new Date()
              .toISOString()
              .split('T')[0]
              .split('-');
            const today = new Date(`${month}-${day}-${year}`);

            if (date < today) {
              accumulator['late'].push(todo);
            } else if (date.getTime() == today.getTime()) {
              accumulator['today'].push(todo);
            } else if (
              date.getTime() == new Date(today.getTime() + 8.64e7).getTime()
            ) {
              accumulator['tomorrow'].push(todo);
            } else {
              accumulator['soon'].push(todo);
            }
            return accumulator;
          },
          {
            late: [],
            today: [],
            tomorrow: [],
            soon: [],
          } as {
            late: ITodo[];
            today: ITodo[];
            tomorrow: ITodo[];
            soon: ITodo[];
          }
        );
        this.todosByDate = {
          late: todos.late
            .sort((a, b) => {
              if (a.priority == 'low') return -1;
              return 0;
            })
            .sort((a, b) => {
              if (a.priority == 'moderate') return -1;
              return 0;
            })
            .sort((a, b) => {
              if (a.priority == 'high') return -1;
              return 0;
            })
            .sort((a, b) => {
              if (!a.isDone) return -1;
              return 0;
            }),
          today: todos.today
            .sort((a, b) => {
              if (a.priority == 'low') return -1;
              return 0;
            })
            .sort((a, b) => {
              if (a.priority == 'moderate') return -1;
              return 0;
            })
            .sort((a, b) => {
              if (a.priority == 'high') return -1;
              return 0;
            })
            .sort((a, b) => {
              if (!a.isDone) return -1;
              return 0;
            }),
          tomorrow: todos.tomorrow
            .sort((a, b) => {
              if (a.priority == 'low') return -1;
              return 0;
            })
            .sort((a, b) => {
              if (a.priority == 'moderate') return -1;
              return 0;
            })
            .sort((a, b) => {
              if (a.priority == 'high') return -1;
              return 0;
            })
            .sort((a, b) => {
              if (!a.isDone) return -1;
              return 0;
            }),
          soon: todos.soon
            .sort((a, b) => {
              if (a.priority == 'low') return -1;
              return 0;
            })
            .sort((a, b) => {
              if (a.priority == 'moderate') return -1;
              return 0;
            })
            .sort((a, b) => {
              if (a.priority == 'high') return -1;
              return 0;
            })
            .sort((a, b) => {
              if (!a.isDone) return -1;
              return 0;
            }),
        };
      });
  }

  toggleIsDone(todo: ITodo) {
    this.httpService
      .put(`https://localhost:7203/api/Todo?id=${todo.id}`, {
        ...todo,
        isDone: !todo.isDone,
      })
      .subscribe(() => {
        this.getTodos();
      });
  }

  selectTodo(todo: ITodo) {
    this.selectedTodo = todo;
  }

  deleteTodo(id: number) {
    this.httpService
      .delete(`https://localhost:7203/api/Todo?id=${id}`)
      .subscribe(() => {
        this.getTodos();
        this.selectedTodo = null;
      });
  }

  updateTodo(todo: IUpdateTodo) {
    this.httpService
      .put(`https://localhost:7203/api/Todo?id=${todo.id}`, todo)
      .subscribe(() => {
        this.getTodos();
        this.selectedTodo = null;
      });
  }
}
