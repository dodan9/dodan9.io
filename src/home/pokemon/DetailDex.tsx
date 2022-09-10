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
    <Container>
      {dexData ? (
        <>
          <h2>
            No.{dexData.id} {dexData.name}
          </h2>
          <DetailContainer>
            <MainImg src={dexData.sprites.other.home.front_default} />
            <div>
              <AbilityList>
                <h4>Abilities</h4>
                {dexData.abilities.map((ability, index) => {
                  return (
                    <Ability key={index} is_hidden={ability.is_hidden}>
                      {ability.ability.name}
                      {ability.is_hidden ? " (hidden)" : null}
                    </Ability>
                  );
                })}
              </AbilityList>
              <Sprites>
                <p>default</p>
                <img src={dexData.sprites.front_default} />
                <img src={dexData.sprites.back_default} />
                <br />
                <p>shiny</p>
                <img src={dexData.sprites.front_shiny} />
                <img src={dexData.sprites.back_shiny} />
              </Sprites>
            </div>
          </DetailContainer>
        </>
      ) : (
        <h2>Loading...</h2>
      )}
    </Container>
  );
};

export default DetailDex;

const Container = styled.div`
  padding: 20px;
`;

const DetailContainer = styled.div`
  display: flex;
`;

const MainImg = styled.img`
  display: block;
`;

const AbilityList = styled.ul`
  padding: 0;
  & h4 {
    margin-bottom: 5px;
  }
`;
const Ability = styled.li<{ is_hidden: boolean }>`
  margin-left: 15px;
  color: ${(props) => (props.is_hidden ? "red" : "black")};
`;

const Sprites = styled.div`
  & img {
    width: 160px;
  }
  & p {
    margin-bottom: 0;
  }
`;
