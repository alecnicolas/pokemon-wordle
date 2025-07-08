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
  1: 151,
  2: 251,
  3: 386,
  4: 493,
  5: 649,
  6: 721,
  7: 809,
  8: 905,
  9: 1025
}

export type GenerationCapType = keyof typeof GenerationCap;