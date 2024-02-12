import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { startWith, map } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { Observable, of } from 'rxjs';
import { PokemonItemType } from '../common/types';
@Component({
  templateUrl: './poke-search.component.html',
  styleUrl: './poke-search.component.scss',
  selector: 'app-poke-search',
  standalone: true,
  imports: [FormsModule, MatAutocompleteModule, ReactiveFormsModule, AsyncPipe],
})
export class PokeSearchComponent implements OnChanges {
  @Output() searchEvent = new EventEmitter<string>();
  @Output() selectedEvent = new EventEmitter<PokemonItemType>();
  @Input() nameSuggList: PokemonItemType[] = [];
  nameList: string[] = [];
  inputText: string = '';
  control = new FormControl('');

  filteredStreets: Observable<string[]> = of([]);
  ngOnChanges(changes: SimpleChanges) {
    this.nameList = this.nameSuggList.map((elm) => elm.name);
    this.filteredStreets = this.control.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.nameList
      .filter((street) => this._normalizeValue(street).includes(filterValue))
      .slice(0, 6);
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  handleInput(searchValue: Event) {
    const target = searchValue.target as HTMLInputElement;
    this.inputText = target.value;
    this.searchEvent.emit(this.inputText);
  }

  handleSelected(event: MatAutocompleteSelectedEvent) {
    const value = event.option.value as string;
    this.handleInput({ target: { value } } as unknown as Event);
    return this.nameSuggList.filter((item) => item.name === value);
  }
}
