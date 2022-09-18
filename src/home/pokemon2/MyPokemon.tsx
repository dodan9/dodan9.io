import { useEffect, useState } from "react";
import styled from "styled-components";
import { pokemonDataType } from "./MeetModal";
import useMyPokemonState from "./useMyPokemonState";

const MyPokemon = () => {
  const { myPokemonList, setMyPokemonList } = useMyPokemonState();
  const [currentPokemonList, setCurrentPokemonList] = useState<
    pokemonDataType[]
  >([]);
  const [selectedPokemon, setSelectedPokemon] =
    useState<pokemonDataType | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [boxIndex, setBoxIndex] = useState<number>(1);
  const [maxIndex, setMaxIndex] = useState<number>(1);
  const [isNext, setIsNext] = useState<boolean>(false);
  const [isImgLoading, setIsImgLoading] = useState<boolean>(false);
  const boxSize = 24;

  const deletePokemon = (index: number) => {
    setMyPokemonList((current) => [
      ...current.slice(0, boxSize * (boxIndex - 1) + index),
      ...current.slice(boxSize * (boxIndex - 1) + index + 1, current.length),
    ]);
  };

  const onDelete = () => {
    deletePokemon(selectedIndex);
    setSelectedPokemon(null);
  };

  const BoxPagenation = () => {
    setCurrentPokemonList(
      myPokemonList.slice(boxSize * (boxIndex - 1), boxSize * boxIndex)
    );
  };

  const MovePage = (direction: number) => {
    if (boxIndex + direction <= 0) setBoxIndex(maxIndex);
    else setBoxIndex((current) => current + direction);
  };

  useEffect(() => {
    MovePage(0);
    if (boxIndex >= maxIndex) setIsNext(false);
    else setIsNext(true);
  }, [maxIndex]);

  useEffect(() => {
    BoxPagenation();
    if (boxIndex >= maxIndex) setIsNext(false);
    else setIsNext(true);
    setSelectedPokemon(null);
  }, [boxIndex]);

  useEffect(() => {
    localStorage.setItem("myPokemonList", JSON.stringify(myPokemonList));
    BoxPagenation();
    if (myPokemonList) setMaxIndex(Math.ceil(myPokemonList.length / boxSize));
  }, [myPokemonList]);

  return (
    <>
      <h2>My Pokemon Box</h2>
      <Container>
        <BoxContainer>
          <BoxPage>
            <BoxPageMove
              onClick={() => MovePage(-1)}
              canClick={maxIndex === 1 ? false : true}
            >
              prev
            </BoxPageMove>
            <BoxNumber>Box {boxIndex}</BoxNumber>
            <BoxPageMove
              onClick={() => (isNext ? MovePage(1) : null)}
              canClick={isNext}
            >
              next
            </BoxPageMove>
          </BoxPage>
          <PokemonBox>
            {currentPokemonList.map((pokemon, index) => (
              <Pokemon key={index} index={index} selectedIndex={selectedIndex}>
                <img
                  src={
                    pokemon.shiny
                      ? pokemon.sprites.front_shiny
                      : pokemon.sprites.front_default
                  }
                  onClick={() => {
                    setSelectedPokemon(pokemon);
                    setSelectedIndex(index);
                  }}
                />
              </Pokemon>
            ))}
          </PokemonBox>
        </BoxContainer>
        <PokemonStatus>
          {selectedPokemon ? (
            <StatusDetail>
              <Name shiny={selectedPokemon.shiny}>{selectedPokemon.name}</Name>
              <SelectImg>
                {/* {isImgLoading ? "Loading..." : null} */}
                <img
                  src={
                    selectedPokemon.shiny
                      ? selectedPokemon.sprites.other.home.front_shiny
                      : selectedPokemon.sprites.other.home.front_default
                  }
                />
              </SelectImg>
              <Level>Lv.{selectedPokemon.level}</Level>
              <TypeBox>
                {selectedPokemon.types.map((type, i) => (
                  <div key={i}>{type.type.name}</div>
                ))}
              </TypeBox>
              <div>
                <button
                  onClick={() => {
                    onDelete();
                  }}
                >
                  bye
                </button>
              </div>
            </StatusDetail>
          ) : null}
        </PokemonStatus>
      </Container>
    </>
  );
};

export default MyPokemon;

const Container = styled.div`
  display: flex;
  & div {
    box-sizing: border-box;
    position: relative;
  }
`;

const BoxContainer = styled.div`
  width: 630px;
  background-color: deepskyblue;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px;
`;

const BoxPage = styled.div`
  display: flex;
  justify-content: space-between;
  & div {
    padding: 20px 10px;
    background-color: lightgray;
    border: 5px solid #444;
    border-radius: 5px;
  }
  margin-bottom: 10px;
`;
const BoxPageMove = styled.div<{ canClick?: boolean }>`
  cursor: ${(prop) => (prop.canClick ? "pointer" : "default")};
`;
const BoxNumber = styled.div`
  text-align: center;
  color: white;
  font-size: 20px;
  text-shadow: 1.5px 1.5px #444;
  width: 300px;
  && {
    background-color: lightgreen;
  }
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    border: 3px solid #eee;
    display: block;
    width: calc(100% - 6px);
    height: calc(100% - 6px);
    border-radius: 3px;
  }
`;

const PokemonBox = styled.div`
  height: 420px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  background-color: lightgreen;
  border: 5px solid #444;
  border-radius: 8px;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    border-top: 5px solid rgba(255, 255, 255, 0.5);
    border-left: 5px solid rgba(255, 255, 255, 0.5);
    border-right: 5px solid rgba(0, 0, 0, 0.5);
    border-bottom: 5px solid rgba(0, 0, 0, 0.5);
    display: block;
    width: calc(100% - 10px);
    height: calc(100% - 10px);
    border-radius: 3px;
  }
`;
const Pokemon = styled.div<{ index: number; selectedIndex: number }>`
  width: 100px;
  height: 100px;
  & img {
    width: 100%;
    cursor: pointer;
  }
  & img:hover {
    width: calc(100% - 2px);
    border: 1px black dotted;
  }
  border: ${(prop) =>
    prop.index === prop.selectedIndex ? "1px black dotted" : "none"};
`;

const BorderDetail = styled.div`
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    border: 4px solid #aaa;
    display: block;
    width: calc(100% - 8px);
    height: calc(100% - 8px);
    border-radius: 5px;
  }
  border: 5px solid #444;
  border-radius: 10px;
  margin-bottom: 5px;
  text-shadow: 1.5px 1.5px #aaa;
`;

const PokemonStatus = styled.div`
  width: 350px;
  background-color: ivory;
`;

const StatusDetail = styled.div`
  padding: 5px;
`;

const Name = styled(BorderDetail)<{ shiny: boolean }>`
  padding: 14px;
  font-size: 20px;
  color: ${(prop) => (prop.shiny ? "red" : "black")};
  text-transform: capitalize;
`;

const SelectImg = styled(BorderDetail)`
  padding: 40px 60px;
  & img {
    width: 100%;
  }
`;

const Level = styled(BorderDetail)`
  padding: 10px;
`;

const TypeBox = styled(BorderDetail)`
  display: flex;
  justify-content: space-around;
  & div {
    padding: 5px;
  }
`;
