import { Component, EventEmitter, Output } from '@angular/core';

export interface IFilters {
  low: boolean;
  moderate: boolean;
  high: boolean;
  pending: boolean;
  completed: boolean;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Output() openNewTodoModal = new EventEmitter<void>();
  @Output() sendFilters = new EventEmitter<IFilters>();

  filters: IFilters = {
    low: true,
    moderate: true,
    high: true,
    pending: true,
    completed: true,
  };

  newTodoModal() {
    this.openNewTodoModal.emit();
  }

  toggleFilterLow() {
    this.filters.low = !this.filters.low;
    this.sendFilters.emit(this.filters);
  }

  toggleFilterModerate() {
    this.filters.moderate = !this.filters.moderate;
    this.sendFilters.emit(this.filters);
  }

  toggleFilterHigh() {
    this.filters.high = !this.filters.high;
    this.sendFilters.emit(this.filters);
  }

  toggleFilterPending() {
    this.filters.pending = !this.filters.pending;
    this.sendFilters.emit(this.filters);
  }

  toggleFilterCompleted() {
    this.filters.completed = !this.filters.completed;
    this.sendFilters.emit(this.filters);
  }
}
