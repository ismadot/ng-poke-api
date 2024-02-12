export type paginationGeneric<T> = {
  count: 1302;
  next: string | null;
  previous: string | null;
  results: T;
};

export type PokemonResponseBaseType = {
  name: string;
  url: string;
};

export type PokemonListResponseType = paginationGeneric<
  PokemonResponseBaseType[]
>;

export type PokemonItemType = PokemonResponseBaseType & {
  id: number;
  data?: PokemonByIdType;
};

export type RequesBaseType<T = any, E = any> = {
  data: T | null;
  loading: boolean;
  error: E | null;
};

export type PokemonByIdType = {
  sprites: { front_default: string };
  types: { slot: number; type: { name: string; url: string } }[];
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
  weight: number;
  species: PokemonResponseBaseType;
  dataSpecies?: PokemonSpeciesByIdType;
};

export type PokemonSpeciesByIdType = {
  base_happiness: number;
  color: {
    name: string;
    url: string;
  };
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
      url: string;
    };
    version: {
      name: string;
      url: string;
    };
  }[];
};
