import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";

interface propsType {
  url: string;
  closeFunction: Dispatch<SetStateAction<boolean>>;
}
interface encounterDetailType {
  chance: number;
  max_level: number;
  min_level: number;
}
interface pokemonEncounterType {
  pokemon: {
    name: string;
    url: string;
  };
  version_details: [
    {
      encounter_details: encounterDetailType[];
    }
  ];
}
interface pokemonEncounterListType {
  name: string;
  pokemon_encounters: pokemonEncounterType[];
}
interface pokemonDataType {
  shiny: boolean;
  run: boolean;
  catch: boolean;
  id: number;
  name: string;
  sprites: { front_default: string; front_shiny: string };
  chance: number;
  level: number;
}

const MeetModal = ({ url, closeFunction }: propsType) => {
  const [pokemonEncounterList, setPokemonEncounterList] =
    useState<pokemonEncounterListType>();
  const [pokemonData, setPokemonData] = useState<pokemonDataType | null>(null);

  const getRandomNumber = (max: number, min: number) => {
    if (max == min) return 0;
    const randomNumber = Math.floor(Math.random() * max - min + 1) + min;
    return randomNumber;
  };

  const getLocationAreaApi = async () => {
    const response = await axios({
      url: `${url}`,
      method: "get",
    });
    setPokemonEncounterList(response.data);
  };

  const getRandomPokemon = async () => {
    if (pokemonEncounterList) {
      const pokemonList = pokemonEncounterList.pokemon_encounters;
      const randomPkm = pokemonList[getRandomNumber(pokemonList.length - 1, 0)];
      const randomPkmDetail =
        randomPkm.version_details[
          getRandomNumber(randomPkm.version_details.length - 1, 0)
        ];
      const randomPkmEncounterDetail = randomPkmDetail.encounter_details[0];
      const response = await axios({
        url: randomPkm.pokemon.url,
        method: "get",
      });
      response.data.shiny = getRandomNumber(100, 1) > 95 ? true : false;
      response.data.run = false;
      response.data.catch = false;
      response.data.chance = randomPkmEncounterDetail.chance;
      response.data.level = getRandomNumber(
        randomPkmEncounterDetail.max_level,
        randomPkmEncounterDetail.min_level
      );
      setPokemonData(response.data);
    }
  };

  const getWalk = () => {
    setPokemonData(null);
    getRandomPokemon();
  };

  useEffect(() => {
    getLocationAreaApi();
  }, []);

  return (
    <>
      <div>{pokemonEncounterList?.name}</div>
      <button onClick={getWalk}>walk</button>
      <Pokemon>
        {pokemonData ? (
          <>
            <Name shiny={pokemonData.shiny}>{pokemonData.name}</Name>

            <img
              src={
                pokemonData.shiny
                  ? pokemonData.sprites.front_shiny
                  : pokemonData.sprites.front_default
              }
            />
            <Detail>
              <span>{pokemonData.chance}%</span>
              <button>catch!</button>
            </Detail>
          </>
        ) : (
          <p>walk!</p>
        )}
      </Pokemon>
      <button
        onClick={() => {
          closeFunction(false);
        }}
      >
        close
      </button>
    </>
  );
};

export default MeetModal;

const Pokemon = styled.div`
  position: relative;
  margin: 10px;
  padding: 14px;
  width: 200px;
  height: 140px;
  background-color: #b1c5f1;
  text-align: center;
  border-radius: 5px;
  @media screen and (max-width: 500px) {
    width: 120px;
    height: 100px;
    margin: 5px;
    padding: 8px;
    & img {
      width: 70px;
    }
  }
  @media screen and (min-width: 500px) and (max-width: 800px) {
    width: 160px;
  }
`;

const Name = styled.div<{ shiny: boolean }>`
  color: ${(props) => (props.shiny ? "red" : "black")};
`;

const Detail = styled.span`
  position: absolute;
  bottom: 10px;
  right: 10px;
  & button {
    margin-left: 5px;
  }
`;
