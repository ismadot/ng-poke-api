import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  @Input('page') page = 0;
  @Input('totalPages') totalPages = 0;
  @Output() pageEvent = new EventEmitter<string>();

  handleInput(event = 'next') {
    this.pageEvent.emit(event);
  }
}
