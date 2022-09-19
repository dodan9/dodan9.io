import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useMyPokemonState from "./useMyPokemonState";

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
export interface pokemonDataType {
  shiny: boolean;
  id: number;
  name: string;
  sprites: {
    front_default: string;
    front_shiny: string;
    other: { home: { front_default: string; front_shiny: string } };
  };
  types: [{ type: { name: string } }];
  chance: number;
  level: number;
}

const MeetModal = ({ url, closeFunction }: propsType) => {
  const [pokemonEncounterList, setPokemonEncounterList] =
    useState<pokemonEncounterListType>();
  const [pokemonData, setPokemonData] = useState<pokemonDataType | null>(null);
  const [catchOrRun, setCatchOrRun] = useState<string>("");
  const { myPokemonList, setMyPokemonList } = useMyPokemonState();
  const [loading, setLoading] = useState<boolean>(true);
  const [isImgLoading, setIsImgLoading] = useState<boolean>(false);

  const getRandomNumber = (max: number, min: number) => {
    if (max === min) return max;
    const randomNumber = Math.floor(Math.random() * max - min + 1) + min;
    return randomNumber;
  };

  const getLocationAreaApi = async () => {
    try {
      const response = await axios({
        url: `${url}`,
        method: "get",
      });
      setPokemonEncounterList(response.data);
      setLoading(false);
    } catch {
      return <h2>Get Error</h2>;
    }
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
    setIsImgLoading(true);
    setCatchOrRun("");
  };
  const onCatch = (pokemon: pokemonDataType) => {
    if (getRandomNumber(100, 1) <= pokemon.chance) {
      setMyPokemonList((current) => [...current, pokemon]);
      setPokemonData(null);
      setCatchOrRun("catch");
    } else {
      setPokemonData(null);
      setCatchOrRun("run");
    }
    setIsImgLoading(false);
  };

  useEffect(() => {
    try {
      localStorage.setItem("myPokemonList", JSON.stringify(myPokemonList));
    } catch {
      setCatchOrRun("err");
    }
  }, [myPokemonList]);

  useEffect(() => {
    getLocationAreaApi();
  }, []);

  return (
    <Modal>
      <PokemonBox>
        <AreaName>
          {loading ? "Loading..." : pokemonEncounterList?.name}
        </AreaName>

        <Pokemon>
          {pokemonData ? (
            <>
              <Detail>
                <Name shiny={pokemonData.shiny}>
                  <span>{pokemonData.name}</span>
                  <span>Lv.{pokemonData.level}</span>
                </Name>
                <PokemonImgBox>
                  {isImgLoading ? "Loading..." : null}
                  <PokemonImg
                    src={
                      pokemonData.shiny
                        ? pokemonData.sprites.front_shiny
                        : pokemonData.sprites.front_default
                    }
                    onLoad={() => {
                      setIsImgLoading(false);
                    }}
                    isImgLoading
                  />
                </PokemonImgBox>
              </Detail>
              <CommandBox>
                <Command>
                  <CommandBtn
                    onClick={() => {
                      onCatch(pokemonData);
                    }}
                  >
                    catch!
                    <span>({pokemonData.chance}%)</span>
                  </CommandBtn>
                </Command>
                <Command>
                  <CommandBtn
                    onClick={() => {
                      setPokemonData(null);
                      setCatchOrRun("");
                    }}
                  >
                    run
                  </CommandBtn>
                </Command>
                <Command></Command>
                <Command>
                  <CommandBtn
                    onClick={() => {
                      closeFunction(false);
                    }}
                  >
                    close
                  </CommandBtn>
                </Command>
              </CommandBox>
            </>
          ) : (
            <DefaultBox>
              {catchOrRun ? (
                catchOrRun === "run" ? (
                  <p>pokemon is {catchOrRun}...</p>
                ) : catchOrRun === "catch" ? (
                  <p>
                    {catchOrRun} pokemon! check{" "}
                    <Link to='/dodan9.io/pokemon2/mypokemon'>
                      My Pokemon Box!
                    </Link>
                  </p>
                ) : (
                  <p>
                    can't catch more...
                    <br />
                    go to{" "}
                    <Link to='/dodan9.io/pokemon2/mypokemon'>
                      My Pokemon Box!
                    </Link>
                  </p>
                )
              ) : null}
              {isImgLoading ? (
                <h3>Loading...</h3>
              ) : (
                <DefaultCommandBox>
                  <CommandBtn onClick={getWalk}>walk</CommandBtn>
                  <CommandBtn
                    onClick={() => {
                      closeFunction(false);
                    }}
                  >
                    close
                  </CommandBtn>
                </DefaultCommandBox>
              )}
            </DefaultBox>
          )}
        </Pokemon>
      </PokemonBox>
    </Modal>
  );
};

export default MeetModal;

const Modal = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  box-sizing: border-box;
  border: 5px double black;
  border-radius: 5px;
`;

const ColumnFlexBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Btn = styled.button`
  box-sizing: border-box;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 18px;
  &:hover {
    &::before {
      content: "";
      height: 0;
      width: 0;
      border-color: transparent black;
      border-style: solid;
      border-width: 0.3em 0 0.3em 0.5em;
      position: relative;
      display: inline-block;
      left: -0.5em;
      top: 0.1em;
    }
  }
`;

const PokemonBox = styled(ColumnFlexBox)`
  width: 400px;
  height: 400px;
  padding: 10px;
  background-color: white;
  border-radius: 5px;
  border: 5px double black;
  justify-content: space-between;
`;

const AreaName = styled(Box)`
  position: relative;
  width: 100%;
  padding: 5px;
  font-size: 20px;
`;

const Pokemon = styled(ColumnFlexBox)`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  justify-content: center;
`;

const Detail = styled.div`
  & img {
    display: block;
  }
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
`;

const PokemonImgBox = styled.div`
  height: 180px;
`;

const PokemonImg = styled.img<{ isImgLoading?: boolean }>`
  width: 180px;
  display: ${(props) => (props.isImgLoading ? "none" : "block")};
`;

const Name = styled.div<{ shiny: boolean }>`
  width: 100%;
  text-transform: capitalize;
  height: fit-content;
  padding: 0 15px 5px 5px;
  border-radius: 6px 0 6px 0;
  font-size: 18px;
  border: 5px solid black;
  border-top: 0;
  border-right: 0;
  color: ${(props) => (props.shiny ? "red" : "black")};
  & span:nth-child(1) {
    float: left;
  }
  & span:nth-child(2) {
    float: right;
  }
`;

const CommandBox = styled(Box)`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const Command = styled.div`
  width: 50%;
  margin: 18px 0;
  text-align: center;
`;
const CommandBtn = styled(Btn)``;

const DefaultBox = styled.div`
  align-self: center;
  & a:hover {
    text-decoration: underline;
  }
`;

const DefaultCommandBox = styled(CommandBox)`
  width: 300px;
  justify-content: space-around;
  & ${CommandBtn} {
    width: 145px;
    padding: 18px 0;
  }
`;
