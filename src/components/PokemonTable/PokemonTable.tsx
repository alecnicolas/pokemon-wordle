import type { PokemonRow } from "../../types";
import PokemonDataRow from "../PokemonDataCell/PokemonDataRow";

type Props = {
  data: PokemonRow[];
  secretPokemon: PokemonRow;
};
const PokemonTable = ({ data, secretPokemon }: Props) => {

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
            <PokemonDataRow
              key={index}
              pokemon={pokemon}
              secretPokemon={secretPokemon}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PokemonTable;