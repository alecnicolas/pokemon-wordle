import { CheckIcon } from '@heroicons/react/24/outline';
import type { PokemonRow } from '../../types';
import { capitalize } from '../../util';
import PokemonTypeCell from '../PokemonTypeCell/PokemonTypeCell';
import { ChevronDoubleDownIcon, ChevronDoubleUpIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

type RowProps = {
  pokemon: PokemonRow;
  secretPokemon: PokemonRow;
  isMobile: boolean;
};

const PokemonDataRow = ({ pokemon, secretPokemon, isMobile }: RowProps) => {
  const isMatch = (secretAttribute: string | number, attribute: string | number): boolean => secretAttribute == attribute;
  const isNearMiss = (secretAttribute: number, attribute: number, margin: number): boolean =>
    Math.abs(secretAttribute - attribute) <= margin;

  const nameMatch = isMatch(secretPokemon.name, pokemon.name);
  const heightMatch = isMatch(secretPokemon.height, pokemon.height);
  const weightMatch = isMatch(secretPokemon.weight, pokemon.weight);
  const generationMatch = isMatch(secretPokemon.generation, pokemon.generation);

  const heightNearMiss = isNearMiss(secretPokemon.height, pokemon.height, 100);
  const weightNearMiss = isNearMiss(secretPokemon.weight, pokemon.weight, 100);

  const extractGenNumber = (genStr: string) => {
    const match = genStr.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  const guessGen = extractGenNumber(pokemon.generation);
  const targetGen = extractGenNumber(secretPokemon.generation);
  const genNearMiss = isNearMiss(targetGen, guessGen, 1);

  const getComparisonIcon = (guess: number, target: number, nearMiss?: boolean) => {
    if (guess === target) return <CheckIcon className="h-4 w-4 text-green-800" />;
    if (guess < target) {
      return nearMiss ? (
        <ChevronUpIcon className="h-4 w-4 text-orange-600" />
      ) : (
        <ChevronDoubleUpIcon className="h-4 w-4 text-blue-600" />
      );
    }
    return nearMiss ? (
      <ChevronDownIcon className="h-4 w-4 text-orange-600" />
    ) : (
      <ChevronDoubleDownIcon className="h-4 w-4 text-blue-600" />
    );
  };

  const formatHeight = (heightDecimeters: number) => {
    const meters = heightDecimeters / 10;
    const inchesTotal = meters * 39.37;
    const feet = Math.floor(inchesTotal / 12);
    const inches = Math.floor(inchesTotal % 12);
    return `${meters.toFixed(1)}m (${feet ? feet + "'" : ""}${inches}")`;
  };

  const formatWeight = (weightHectograms: number) => {
    const kg = weightHectograms / 10;
    const lbs = kg * 2.20462;
    return `${kg.toFixed(1)}kg (${lbs.toFixed(1)} lbs)`;
  };

  // Desktop cell renderer
  const renderCell = (match: boolean, content: React.ReactNode, icon?: React.ReactNode, nearMiss?: boolean) => (
    <td className={`px-4 py-2 font-medium text-black ${match ? 'text-green-800' : nearMiss ? 'text-orange-600' : ''}`}>
      <div className="inline-flex items-center gap-1">
        {content}
        {icon}
      </div>
    </td>
  );

  if (isMobile) {
    // Mobile card layout
    return (
      <div
        className={`border rounded-lg p-4 mb-4 shadow bg-white ${secretPokemon.name === pokemon.name ? 'border-green-600 bg-green-50' : ''
          }`}
      >
        <div className="flex justify-between items-center mb-2">
          <span className={`font-bold text-lg ${nameMatch ? 'text-green-800' : 'text-gray-900'}`}>{capitalize(pokemon.name)}</span>
          {nameMatch && <CheckIcon className="h-5 w-5 text-green-800" />}
        </div>
        <div className="mb-1">
          <span className="font-semibold">Type: </span>
          <PokemonTypeCell secretPokemon={secretPokemon} pokemon={pokemon} />
        </div>
        <div className={`mb-1 flex items-center gap-1 ${heightMatch ? 'text-green-800' : heightNearMiss ? 'text-orange-600' : ''}`}>
          <span className="font-semibold">Height:</span>
          <span>{formatHeight(pokemon.height)}</span>
          {getComparisonIcon(pokemon.height, secretPokemon.height, heightNearMiss)}
        </div>
        <div className={`mb-1 flex items-center gap-1 ${weightMatch ? 'text-green-800' : weightNearMiss ? 'text-orange-600' : ''}`}>
          <span className="font-semibold">Weight:</span>
          <span>{formatWeight(pokemon.weight)}</span>
          {getComparisonIcon(pokemon.weight, secretPokemon.weight, weightNearMiss)}
        </div>
        <div className={`flex items-center gap-1 ${generationMatch ? 'text-green-800' : genNearMiss ? 'text-orange-600' : ''}`}>
          <span className="font-semibold">Generation:</span>
          <span>{pokemon.generation}</span>
          {getComparisonIcon(guessGen, targetGen, genNearMiss)}
        </div>
      </div>
    );
  }

  // Desktop table row
  return (
    <tr className={`${secretPokemon.name === pokemon.name ? 'bg-green-100' : 'hover:bg-gray-50'}`}>
      {renderCell(nameMatch, capitalize(pokemon.name), nameMatch && <CheckIcon className="h-4 w-4 text-green-800" />)}
      <td className="px-4 py-2">
        <PokemonTypeCell secretPokemon={secretPokemon} pokemon={pokemon} />
      </td>
      {renderCell(heightMatch, formatHeight(pokemon.height), getComparisonIcon(pokemon.height, secretPokemon.height, heightNearMiss), heightNearMiss)}
      {renderCell(weightMatch, formatWeight(pokemon.weight), getComparisonIcon(pokemon.weight, secretPokemon.weight, weightNearMiss), weightNearMiss)}
      {renderCell(generationMatch, pokemon.generation, getComparisonIcon(guessGen, targetGen, genNearMiss), genNearMiss)}
    </tr>
  );
};

export default PokemonDataRow;
