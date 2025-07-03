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
  sprites: unknown;
  cries: unknown;
  species: unknown;
  stats: unknown[];
  types: unknown[];
};

export const GenerationCap = {
  Gen1: 151,
  Gen2: 251,
  Gen3: 386
}

export type GenerationCapType = keyof typeof GenerationCap;