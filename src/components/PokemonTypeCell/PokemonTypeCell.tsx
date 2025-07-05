import type { PokemonRow } from "../../types";
import { CheckIcon } from "@heroicons/react/24/solid";
import { capitalize } from "../../util";

type Props = {
  secretPokemon: PokemonRow;
  pokemon: PokemonRow;
}

const PokemonTypeCell = ({secretPokemon, pokemon}: Props) => {

  const secretTypes = new Set(secretPokemon.types.map(t => t.type.name));
  const guessTypes = pokemon.types.map(t => t.type.name);

  const matchingTypes = guessTypes.filter(type => secretTypes.has(type));
  const isPartialMatch = matchingTypes.length < secretTypes.size;

  return (
    <div className="flex flex-wrap gap-2">
      {guessTypes.map((typeName, i) => {
        const isMatch = matchingTypes.includes(typeName);

        let bgColor = "bg-blue-100 text-blue-800";
        let content = capitalize(typeName);
        let extra = null;

        if (isMatch) {
          if (isPartialMatch) {
            bgColor = "bg-orange-100 text-orange-800";
            content += " ~";
          } else {
            bgColor = "bg-green-100 text-green-800";
            extra = <CheckIcon className="h-4 w-4 ml-1" />;
          }
        }

        return (
          <span
            key={i}
            className={`${bgColor} text-sm font-medium px-2.5 py-0.5 rounded-full inline-flex items-center`}
          >
            {content}
            {extra}
          </span>
        );
      })}
    </div>
  )
}

export default PokemonTypeCell;