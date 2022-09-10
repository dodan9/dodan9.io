import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

interface abilityType {
  ability: { name: string; url: string };
  is_hidden: boolean;
}
interface dexDataType {
  id: number;
  name: string;
  abilities: abilityType[];
  sprites: {
    front_default: string;
    back_default: string;
    front_shiny: string;
    back_shiny: string;
    other: {
      home: {
        front_default: string;
      };
    };
  };
  stats: [base_stat: number, stat: { name: string }];
  types: [
    type: {
      name: string;
    }
  ];
}

const DetailDex = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [dexData, setDexData] = useState<dexDataType>();

  const getApi = axios({
    url: `https://pokeapi.co/api/v2/pokemon/${id}/`,
    method: "get",
  });
  const callApi = async () => {
    try {
      const response = await getApi;
      setDexData(response.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    callApi();
  }, []);
  if (loading) return <h2>Loading...</h2>;
  return (
    <>
      {dexData ? (
        <>
          <h2>
            No.{dexData.id} {dexData.name}
          </h2>
          <img src={dexData.sprites.other.home.front_default} />
          {dexData.abilities.map((ability, index) => {
            return (
              <Ability key={index} is_hidden={ability.is_hidden}>
                {ability.ability.name}
              </Ability>
            );
          })}
          <img src={dexData.sprites.front_default} />
          <img src={dexData.sprites.back_default} />
          <img src={dexData.sprites.front_shiny} />
          <img src={dexData.sprites.back_shiny} />
        </>
      ) : (
        <h2>Loading...</h2>
      )}
    </>
  );
};

export default DetailDex;

const Ability = styled.p<{ is_hidden: boolean }>`
  color: ${(props) => (props.is_hidden ? "red" : "black")};
`;
