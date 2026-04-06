import { useEffect, useEffectEvent, useState } from "react";
import type { pokemonDataType } from "./MeetModal";

const useMyPokemonState = () => {
  const [myPokemonList, setMyPokemonList] = useState<pokemonDataType[]>([]);
  const localList = localStorage.getItem("myPokemonList");

  const init = useEffectEvent(() => {
    if (localList) setMyPokemonList(JSON.parse(localList));
  });
  useEffect(() => {
    init();
  }, []);

  return { myPokemonList, setMyPokemonList };
};

export default useMyPokemonState;
