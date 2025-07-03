import type { Pokemon, PokemonRow } from "../../types";

type Props = {
  data: PokemonRow[];
  secretPokemon: Pokemon;
};

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

export default function PokemonTable({ data, secretPokemon }: Props) {
  return (
    <div className="w-full overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full table-auto text-sm text-left">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-bold">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Type</th>
            <th className="px-4 py-3">Height</th>
            <th className="px-4 py-3">Weight</th>
            <th className="px-4 py-3">Generation</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((pokemon, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-2 font-medium text-black">{capitalize(pokemon.name)}</td>
              <td className="px-4 py-2">
                <div className="flex flex-wrap gap-2">
                  {(pokemon.types as { type: { name: string } }[]).map((t, i) => {
                    if (secretPokemon.types.some(type => type.name === t.type.name)) {
                      return (
                        <span
                          key={i}
                          className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full"
                        >
                          {capitalize(t.type.name)}
                        </span>

                      )
                    } else {
                      return (
                        <span
                          key={i}
                          className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full"
                        >
                          {capitalize(t.type.name)}
                        </span>

                      )
                    }
                  })}
                </div>
              </td>
              <td className="px-4 py-2 text-black">{pokemon.height * 10}cm</td>
              <td className="px-4 py-2 text-black">{pokemon.weight / 10}kg</td>
              <td className="px-4 py-2 text-black">{pokemon.generation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}