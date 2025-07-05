export type PokemonRow = {
  name: string;
  types: any[];
  height: number;
  weight: number;
  generation: string;
};

export type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: unknown[];
  forms: unknown[];
  game_indices: unknown[];
  held_items: unknown[];
  location_area_encounters: string;
  moves: unknown[];
  past_types: unknown[];
  past_abilities: unknown[];
  sprites: {
    front_default: string;
  };
  cries: unknown;
  species: unknown;
  stats: unknown[];
  types: unknown[];
};

export const GenerationCap = {
  Gen1: 151,
  Gen2: 251,
  Gen3: 386,
  Gen4: 493,
  Gen5: 649,
  Gen6: 721,
  Gen7: 809,
  Gen8: 905,
  Gen9: 1025
}

export type GenerationCapType = keyof typeof GenerationCap;