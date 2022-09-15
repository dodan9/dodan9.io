import { useEffect, useState } from "react";
import useMyPokemonState from "./useMyPokemonState";

const MyPokemon = () => {
  const { myPokemonList, setMyPokemonList } = useMyPokemonState();
  const [isRender, setIsRender] = useState<boolean>(false);
  const deletePokemon = (index: number) => {
    setMyPokemonList((current) => [
      ...current.slice(0, index),
      ...current.slice(index + 1, current.length),
    ]);
  };

  useEffect(() => {
    setIsRender(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("myPokemonList", JSON.stringify(myPokemonList));
  }, [myPokemonList]);

  return (
    <div>
      <h2>My Pokemon Box</h2>
      {myPokemonList.map((pokemon, index) => (
        <div key={index}>
          {pokemon.name} {pokemon.level}LV
          <button onClick={() => deletePokemon(index)}>bye</button>
        </div>
      ))}
    </div>
  );
};

export default MyPokemon;
