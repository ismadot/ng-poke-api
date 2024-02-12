import { Component, OnInit } from '@angular/core';
import { PocketMonsterService } from '../pocket-monster.service';
import { CommonModule } from '@angular/common';
import {
  PokemonItemType,
  PokemonResponseBaseType,
  PokemonListResponseType,
  RequesBaseType,
  PokemonByIdType,
  PokemonSpeciesByIdType,
} from '../common/types';
import { chunk, requestInit } from '../common/helper';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-pocket-monster-list',
  standalone: true,
  imports: [CommonModule, PaginationComponent],
  templateUrl: './pocket-monster-list.component.html',
  styleUrl: './pocket-monster-list.component.scss',
})
export class PocketMonsterListComponent implements OnInit {
  pocketMonsterList: PokemonItemType[] = [];
  pocketMonsterListPagination: PokemonItemType[][] = [];
  pocketMonsterAllItems: number = 0;
  pageLimit = 10;
  pageCurrent = 0;
  regex = /\/(\d+)\/$/;
  baseSrc = 'https://www.svgrepo.com/show/315521/pokemon.svg';
  pocketMonsterRequest: RequesBaseType<PokemonByIdType> = requestInit;
  pocketMonsterspeciesRequest: RequesBaseType<PokemonSpeciesByIdType> =
    requestInit;
  constructor(private pocketMonsterService: PocketMonsterService) {}

  ngOnInit(): void {
    this.allPocketMonsterBehavior();
  }

  allPocketMonsterBehavior() {
    this.pocketMonsterService.getPokemonList().subscribe((data) => {
      this.pocketMonsterAllItems = data.count;
      this.pocketMonsterService
        .getPokemonList({ limit: this.pocketMonsterAllItems })
        .subscribe((data) => {
          this.normalizeData(this.listAddId(data.results));
        });
    });
  }

  listAddId(listAddId: PokemonResponseBaseType[]): PokemonItemType[] {
    return listAddId.map((element) => {
      const find = element.url.match(this.regex);
      return {
        ...element,
        id: find ? parseInt(find[1], 10) : -1,
      };
    });
  }

  normalizeData(data: PokemonItemType[]) {
    const listSort = data.sort((a, b) => a.name.localeCompare(b.name));
    const listCleanNames = listSort.map((element) => ({
      ...element,
      name: element.name.replace(/[^a-zA-Z ]/, ' '),
    }));
    this.pocketMonsterList = listCleanNames;
    this.pocketMonsterListPagination = chunk(listCleanNames, this.pageLimit);
  }

  handlePageEvent(event: string) {
    event === 'next' ? this.pageCurrent++ : this.pageCurrent--;
  }

  handleItemClick(id: number) {
    this.pocketMonsterRequest = { ...requestInit, loading: true };
    this.pocketMonsterService.getPokemonById(id).subscribe({
      next: (data) => {
        this.pocketMonsterRequest = { ...requestInit, data };
        this.pocketMonsterInToList(id, data);
      },
      error: (error) => {
        this.pocketMonsterRequest = { ...requestInit, error };
      },
    });
  }

  handlePokemonById(id: number, data: PokemonByIdType) {
    this.pocketMonsterspeciesRequest = { ...requestInit, loading: true };
    this.pocketMonsterService.getPokemonSpeciesById(id).subscribe({
      next: (data) => {
        this.pocketMonsterspeciesRequest = { ...requestInit, data };
      },
      error: (error) => {
        this.pocketMonsterspeciesRequest = { ...requestInit, error };
      },
    });
  }

  pocketMonsterInToList(pokeId: number, data: PokemonByIdType) {
    const itemToPass = this.pocketMonsterList.map((item) => {
      return item.id !== pokeId ? item : { ...item, data };
    });
    this.normalizeData(itemToPass);
  }
}
