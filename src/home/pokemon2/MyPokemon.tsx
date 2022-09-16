import { useEffect, useState } from "react";
import styled from "styled-components";
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
    <>
      <h2>My Pokemon Box</h2>
      <Box>
        {myPokemonList.map((pokemon, index) => (
          <Pokemon key={index}>
            <div>
              <img
                src={
                  pokemon.shiny
                    ? pokemon.sprites.front_shiny
                    : pokemon.sprites.front_default
                }
              />
            </div>
            <div>
              <Name shiny={pokemon.shiny}>{pokemon.name}</Name>
              <span> {pokemon.level}LV</span>
            </div>
            <div>
              <button onClick={() => deletePokemon(index)}>bye</button>
            </div>
          </Pokemon>
        ))}
      </Box>
    </>
  );
};

export default MyPokemon;

const Box = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const Pokemon = styled.div`
  width: 120px;
  background-color: yellowgreen;
  margin: 10px;
`;
const Name = styled.span<{ shiny: boolean }>`
  color: ${(prop) => (prop.shiny ? "red" : "black")};
`;
