import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpParamsOptions,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  PokemonByIdType,
  PokemonListResponseType,
  PokemonSpeciesByIdType,
  paginationGeneric,
} from './common/types';

type getPokemonListQueryType = {
  limit: number;
  offset?: number;
};

@Injectable({
  providedIn: 'root',
})
export class PocketMonsterService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getPokemonList(
    options: getPokemonListQueryType = { limit: 10 }
  ): Observable<PokemonListResponseType> {
    let params = new HttpParams({
      fromObject: { ...options },
    });

    const requestOptions = { params };
    return this.http.get<PokemonListResponseType>(
      `${this.apiUrl}`,
      requestOptions
    );
  }

  getPokemonById(id = 1): Observable<PokemonByIdType> {
    return this.http.get<PokemonByIdType>(`${this.apiUrl}/${id}`);
  }

  getPokemonSpeciesById(id = 1): Observable<PokemonSpeciesByIdType> {
    return this.http.get<PokemonSpeciesByIdType>(
      `${this.apiUrl}-species/${id}`
    );
  }
}
