import { useState } from "react";
import { pokemonDataType } from "./MeetModal";
import useMyPokemonState from "./useMyPokemonState";

const MyPokemon = () => {
  const { myPokemonList } = useMyPokemonState();
  return (
    <div>
      <h2>My Pokemon Box</h2>
      {myPokemonList.map((pokemon, index) => (
        <div key={index}>
          {pokemon.name} {pokemon.level}LV
        </div>
      ))}
    </div>
  );
};

export default MyPokemon;
