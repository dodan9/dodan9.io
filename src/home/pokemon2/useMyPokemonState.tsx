import { useEffect, useState } from "react";
import { pokemonDataType } from "./MeetModal";

const useMyPokemonState = () => {
  const [myPokemonList, setMyPokemonList] = useState<pokemonDataType[]>([]);
  const localList = localStorage.getItem("myPokemonList");
  useEffect(() => {
    if (localList) setMyPokemonList(JSON.parse(localList));
  }, []);

  return { myPokemonList, setMyPokemonList };
};

export default useMyPokemonState;
