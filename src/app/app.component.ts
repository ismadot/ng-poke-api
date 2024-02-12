import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PocketMonsterListComponent } from './pocket-monster-list/pocket-monster-list.component';
import { PokeSearchComponent } from './poke-search/poke-search.component';
import { debounce } from './common/helper';
import { PaginationComponent } from './pagination/pagination.component';
import { CommonModule } from '@angular/common';
import { PokemonItemType } from './common/types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    PocketMonsterListComponent,
    PokeSearchComponent,
    PaginationComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ng-poke-api';
  pokemons = [];
  filteredPokemons = [];
  nameSuggList: PokemonItemType[] = [];
  debouncedSearch = debounce((searchValue: string) => {
    console.log('Debounced Search:', searchValue);
  }, 300);

  handleSearch(searchValue: string) {
    console.log('Search:', searchValue);
    this.debouncedSearch(searchValue);
  }
  setNameSuggList(list: PokemonItemType[]) {
    this.nameSuggList = list;
  }
}
