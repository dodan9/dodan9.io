import { useState } from "react";
import { pokemonDataType } from "./MeetModal";

const MyPokemon = () => {
  const [myPokemonList, setMyPokemonList] = useState<pokemonDataType[]>([]);
  return (
    <div>
      <h2>My Pokemon Box</h2>
      {myPokemonList.map((pokemon) => (
        <div>
          {pokemon.name} {pokemon.level}LV
        </div>
      ))}
    </div>
  );
};

export default MyPokemon;
