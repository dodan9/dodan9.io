import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import Alert from "./Alert";

interface pokemonDataType {
  shiny: boolean;
  run: boolean;
  catch: boolean;
  catchCount: number;
  id: number;
  name: string;
  sprites: { front_default: string; front_shiny: string };
  stats: [base_stat: number, stat: [name: string]];
}

const Pokemon = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isRendered, setIsRendered] = useState<boolean>(false);
  const [randomId, setRandomId] = useState<number>(1);
  const [pokemonData, setPokemonData] = useState<pokemonDataType[]>([]);
  const [pokemonAmount, setPokemonAmount] = useState<number>(0);
  const [myPokemon, setMyPokemon] = useState<pokemonDataType[]>([]);
  const [showAlert, setShowAlert] = useState<string>("");
  const randomFunction = (max: number, min: number) => {
    const randomNumber = Math.floor(Math.random() * max - min + 1) + min;
    return randomNumber;
  };

  const makeRandomId = () => {
    if (pokemonAmount > 9) return null;
    else setRandomId(randomFunction(905, 1));
  };

  const getApi = axios({
    url: `https://pokeapi.co/api/v2/pokemon/${randomId}/`,
    method: "get",
  });

  const callApi = async () => {
    const response = await getApi;
    response.data.shiny = randomFunction(100, 1) > 90 ? true : false;
    response.data.run = false;
    response.data.catch = false;
    response.data.catchCount = randomFunction(100, 1);
    setPokemonData((current) => [...current, response.data]);
    setLoading(false);
    console.log(`get api, amount:${pokemonAmount}`);
  };

  const onCatch = (
    e: React.MouseEvent<HTMLButtonElement>,
    pokemon: pokemonDataType,
    index: number
  ) => {
    let newArr = [...pokemonData];
    if (randomFunction(100, 1) <= pokemon.catchCount) {
      setMyPokemon((current) => [...current, pokemon]);
      setShowAlert("catch");
      newArr[index].catch = true;
    } else {
      newArr[index].run = true;
      setShowAlert("run");
    }

    setPokemonData(
      newArr.filter(
        (pokemon) => pokemon.run === false && pokemon.catch === false
      )
    );
  };

  useEffect(() => {
    setIsRendered(true);
    return () => {
      setIsRendered(false);
    };
  }, []);

  useEffect(() => {
    makeRandomId();
    if (isRendered) callApi();
    setPokemonAmount((pokemonAmount) => pokemonAmount + 1);
  }, [randomId]);

  if (loading) return <h2>Loading...</h2>;
  return (
    <Container>
      {showAlert === "run" ? (
        <Alert state='run' setShowAlert={setShowAlert} />
      ) : null}
      {showAlert === "catch" ? (
        <Alert state='catch' setShowAlert={setShowAlert} />
      ) : null}
      <h2>Pokemon</h2>
      <p>refresh to meet random pokemon</p>

      <h3>Nature</h3>
      <PokemonBox>
        {pokemonData.map((pokemon, index) => {
          return (
            <PokemonCard key={index}>
              <Name shiny={pokemon.shiny}>
                {index} {pokemon.name}
              </Name>

              <img
                src={
                  pokemon.shiny
                    ? pokemon.sprites.front_shiny
                    : pokemon.sprites.front_default
                }
              />
              <Catch>
                <span>{pokemon.catchCount}%</span>
                <button
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    onCatch(e, pokemon, index);
                  }}
                >
                  catch!
                </button>
              </Catch>
            </PokemonCard>
          );
        })}
      </PokemonBox>

      <h3>My Pokemon</h3>
      <MyPokemonBox>
        {myPokemon.map((pokemon, index) => (
          <PokemonCard key={index}>
            <Name shiny={pokemon.shiny}>{pokemon.name}</Name>
            <img
              src={
                pokemon.shiny
                  ? pokemon.sprites.front_shiny
                  : pokemon.sprites.front_default
              }
            />
          </PokemonCard>
        ))}
      </MyPokemonBox>
    </Container>
  );
};

export default Pokemon;

const Container = styled.div`
  position: relative;
  & div {
    position: relative;
  }
  box-sizing: border-box;
  padding: 20px;
`;

const PokemonBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const PokemonCard = styled.div`
  margin: 10px;
  width: 200px;
  height: 140px;
  background-color: #b1c5f1;
  text-align: center;
  border-radius: 5px;
`;

const Name = styled.div<{ shiny: boolean }>`
  margin-top: 14px;
  color: ${(props) => (props.shiny ? "red" : "black")};
`;

const Catch = styled.span`
  position: absolute;
  bottom: 10px;
  right: 10px;
  & button {
    margin-left: 5px;
  }
`;

const MyPokemonBox = styled(PokemonBox)`
  & ${PokemonCard} {
    background-color: #f1e8b1;
  }
`;
