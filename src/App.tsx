import { useState, useEffect, useRef } from 'react'
import './App.css'
import PokemonTable from './components/PokemonTable/PokemonTable';
import { GenerationCap, type GenerationCapType, type Pokemon, type PokemonRow } from './types';
import { capitalize } from './util';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';
import GenerationSelectionSlider from './components/GenerationSelectionSlider/GenerationSelectionSlider';
import pokeball from './assets/8bit-pokeball.png';

const App = () => {
  const [count, setCount] = useState(0);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState<any[]>([]);
  const [selectedGen, setGen] = useState(5);

  const allowedAttempts = 8;

  useEffect(() => {
    console.log('Pokemon changed:', pokemon);
  }, [pokemon]);

  const getNewPokemon = () => {
    const generatedNumber = generatePokeId(selectedGen as GenerationCapType);

    fetch(`https://pokeapi.co/api/v2/pokemon/${generatedNumber}`)
      .then(response => response.json())
      .then(data => {
        setPokemon(data);
      })
      .catch(err => console.error(err));
  }

  const getGuessedPokemon = (guess: string) => {
    const alreadyGuessed = guesses.some(g => g.name.toLocaleLowerCase() === guess.toLocaleLowerCase());

    if (alreadyGuessed) {
      console.log("You already guessed that Pokémon!");
      return;
    } else {
      fetch(`https://pokeapi.co/api/v2/pokemon/${guess}`)
        .then(response => response.json())
        .then(data => {
          if (data.id > GenerationCap[selectedGen as GenerationCapType]) {
            console.log('Outside of generation')
            return;
          }
          setGuesses(prev => [...prev, data]);
          setCount(prev => prev + 1);
        })
        .catch(err => console.error(err));
    }

  }

  // Utils
  const generatePokeId = (cap: GenerationCapType) => {
    const min = 1;
    const max = GenerationCap[cap];

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const extractGeneration = (pokemon: any): string => {
    const version = pokemon.game_indices[0].version;
    if (!version) return "Unknown";

    const gen = version.name;

    const gameToGen: Record<string, number> = {
      // Gen 1
      "red": 1,
      "blue": 1,
      "yellow": 1,

      // Gen 2
      "gold": 2,
      "silver": 2,
      "crystal": 2,

      // Gen 3
      "ruby": 3,
      "sapphire": 3,
      "emerald": 3,
      "firered": 3,
      "leafgreen": 3,

      // Gen 4
      "diamond": 4,
      "pearl": 4,
      "platinum": 4,
      "heartgold": 4,
      "soulsilver": 4,

      // Gen 5
      "black": 5,
      "white": 5,
      "black-2": 5,
      "white-2": 5,

      // Gen 6
      "x": 6,
      "y": 6,
      "omegaruby": 6,
      "alphasapphire": 6,

      // Gen 7
      "sun": 7,
      "moon": 7,
      "ultra-sun": 7,
      "ultra-moon": 7,
      "lets-go-pikachu": 7,
      "lets-go-eevee": 7,

      // Gen 8
      "sword": 8,
      "shield": 8,
      "brilliant-diamond": 8,
      "shining-pearl": 8,
      "legends-arceus": 8,

      // Gen 9
      "scarlet": 9,
      "violet": 9,
    };

    const genNumber = gameToGen[gen];
    return genNumber ? `Generation ${genNumber}` : "Unknown";
  }

  const resetGame = () => {
    getNewPokemon();
    setGuesses([]);
    setCount(0);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    getGuessedPokemon(currentGuess);
    setCurrentGuess("");
  }

  const toPokemonRow = (pokemon: Pokemon): PokemonRow => {

    return {
      name: pokemon.name,
      types: pokemon.types,
      height: pokemon.height,
      weight: pokemon.weight,
      generation: extractGeneration(pokemon),
    };
  }


  const getHeader = () => {
    if (isLastGuessCorrect) {
      return (
        <h1 className="text-3xl font-bold mb-6 text-green-600 flex items-center justify-center gap-2">
          {capitalize(pokemon.name)}
          <CheckIcon className="size-6" />
        </h1>
      );
    }

    if (outOfGuesses) {
      return (
        <h1 className="text-3xl font-bold mb-6 text-red-500 flex items-center justify-center gap-2">
          {capitalize(pokemon.name)}
          <XMarkIcon className="size-6" />
        </h1>
      );
    }

    return (
      <h1 className="text-3xl font-bold mb-6">
        Guess the Pokémon!
      </h1>
    );
  };

  const lastGuess = guesses[guesses.length - 1];
  const isLastGuessCorrect = !!pokemon && !!lastGuess && pokemon.name === lastGuess.name;
  const outOfGuesses = pokemon && !isLastGuessCorrect && count >= allowedAttempts;

  const inGame = !isLastGuessCorrect && !outOfGuesses && pokemon

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-900 p-4">
      <div className="text-center">
        {getHeader()}
      <div className="flex justify-center mb-4">
        {isLastGuessCorrect ? (
          <img
            src={pokemon.sprites.front_default}
            alt={capitalize(pokemon.name)}
            className="w-40 h-40 object-contain rounded-md border border-green-600 shadow"
          />
        ) : outOfGuesses ? (
          <img
            src={pokemon.sprites.front_default}
            alt={capitalize(pokemon.name)}
            className="w-40 h-40 object-contain rounded-md border border-red-500 shadow"
          />
        ) : pokemon ? (
          <img
            src={pokeball}
            alt="pokeball"
            className="w-40 h-40 object-contain rounded-md border border-gray-600 shadow"
          />
        ) : <></>
      }
      </div>
        <GenerationSelectionSlider
          selectedGen={selectedGen}
          onChange={setGen}
          disabled={!!inGame}
        />
        {!pokemon &&
          <button
            type="submit"
            className="px-4 py-2 mb-4 bg-green-800 text-white rounded-lg hover:bg-green-600 transition"
            onClick={getNewPokemon}
          >
            Start Game
          </button>
        }
        {isLastGuessCorrect &&
          <button
            type="submit"
            className="px-4 py-2 mb-4 bg-green-800 text-white rounded-lg hover:bg-green-600 transition"
            onClick={resetGame}
          >
            Play again?
          </button>
        }
        {outOfGuesses &&
          <button
            type="submit"
            className="px-4 py-2 mb-4 bg-red-500 text-white rounded-lg hover:bg-red-400 transition"
            onClick={resetGame}
          >
            Try again?
          </button>
        }
        <form
          onSubmit={handleSubmit}
          className="flex justify-center items-center gap-2 mb-4"
        >
          <input
            type="text"
            value={currentGuess}
            disabled={!inGame}
            onChange={(e) => setCurrentGuess(e.target.value)}
            placeholder="Enter Pokémon name"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={!inGame}
            className="px-4 py-2 bg-violet-800 text-white rounded-lg hover:bg-violet-600 transition disabled:bg-gray-500"
          >
            Submit
          </button>
        </form>

        <p className="text-lg text-gray-300 font-medium mb-4">
          Guesses Used: <span className="font-bold">{count}/{allowedAttempts}</span>
        </p>
        {pokemon && <PokemonTable data={guesses.map(toPokemonRow)} secretPokemon={toPokemonRow(pokemon)}></PokemonTable>}
      </div>
    </div>
  )
}

export default App
