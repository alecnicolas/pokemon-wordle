import { useState, useEffect } from "react";
import type { PokemonRow } from "../../types";
import PokemonDataRow from "../PokemonDataCell/PokemonDataRow";

type Props = {
  data: PokemonRow[];
  secretPokemon: PokemonRow;
};
const PokemonTable = ({ data, secretPokemon }: Props) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 650);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full">
      {isMobile ? (
        <div className="space-y-4">
          {data.map((pokemon, index) => (
            <PokemonDataRow
              isMobile={isMobile}
              key={index}
              pokemon={pokemon}
              secretPokemon={secretPokemon}
            />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="w-full min-w-[500px] text-sm text-left table-auto">
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
                  isMobile={isMobile}
                  key={index}
                  pokemon={pokemon}
                  secretPokemon={secretPokemon}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default PokemonTable;