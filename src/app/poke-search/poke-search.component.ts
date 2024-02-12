import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-poke-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './poke-search.component.html',
  styleUrl: './poke-search.component.scss',
})
export class PokeSearchComponent {
  @Output() searchEvent = new EventEmitter<string>();
  inputText: string = '';

  handleInput(searchValue: Event) {
    const target = searchValue.target as HTMLInputElement;
    this.inputText = target.value;
    this.searchEvent.emit(this.inputText);
  }
}
