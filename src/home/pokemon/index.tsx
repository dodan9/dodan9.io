import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface pokemonDataType {
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

  const makeRandomId = () => {
    if (pokemonAmount > 9) return null;
    else setRandomId(Math.floor(Math.random() * 905) + 1);
  };

  const getApi = axios({
    url: `https://pokeapi.co/api/v2/pokemon/${randomId}/`,
    method: "get",
  });

  const callApi = async () => {
    const response = await getApi;
    setPokemonData((current) => [...current, response.data]);
    setLoading(false);
    console.log(`get api, amount:${pokemonAmount}`);
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
      <h2>Pokemon</h2>
      <p>refresh to meet random pokemon</p>
      <PokemonBox>
        {pokemonData.map((pokemon, index) => {
          let shiny = Math.floor(Math.random() * 100) + 1 > 90 ? true : false;

          return (
            <PokemonCard key={index}>
              <Name shiny={shiny}>{pokemon.name}</Name>

              <img
                src={
                  shiny
                    ? pokemon.sprites.front_shiny
                    : pokemon.sprites.front_default
                }
              />
            </PokemonCard>
          );
        })}
      </PokemonBox>
    </Container>
  );
};

export default Pokemon;

const Container = styled.div`
  box-sizing: border-box;
  padding: 20px;
`;

const PokemonBox = styled.div`
  display: flex;
`;

const PokemonCard = styled.div`
  margin: 10px;
  text-align: center;
`;

const Name = styled.div<{ shiny: boolean }>`
  color: ${(props) => (props.shiny ? "red" : "black")};
`;
