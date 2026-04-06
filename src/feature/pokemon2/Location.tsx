import { useEffect, useEffectEvent, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { getRegionApi } from "./api";
import ball from "./img/location_icon/ball.png";
import city from "./img/location_icon/city.png";
import route from "./img/location_icon/route.png";
import forest from "./img/location_icon/forest.png";

interface RegionType {
  id: number;
  locations: [{ name: string; url: string }];
  name: string;
}

const Location = () => {
  const { region } = useParams();
  const [regionData, setRegionData] = useState<RegionType>();
  const [loading, setLoading] = useState<boolean>(true);

  const callApi = useEffectEvent(async () => {
    try {
      const response = await getRegionApi(region as string);
      setRegionData(response.data);
      setLoading(false);
    } catch {
      return <h2>Get Error</h2>;
    }
  });
  useEffect(() => {
    callApi();
  }, []);

  if (loading) return <h2>Loading...</h2>;
  return (
    <>
      <Header>
        <h2>{regionData?.name}</h2>
        <span>
          More Pokémon will appear at <img src={route} />
        </span>
      </Header>
      {regionData?.locations.length ? (
        <Locations>
          {regionData?.locations.map((location, index) => {
            let icon = ball;
            if (location.name.includes("city")) icon = city;
            if (location.name.includes("route")) icon = route;
            if (location.name.includes("forest")) icon = forest;
            return (
              <LocationItem key={index} icon={icon}>
                <Link to={`/dodan9.io/pokemon2/${region}/${location.name}`}>
                  {location.name}
                </Link>
              </LocationItem>
            );
          })}
        </Locations>
      ) : (
        <h3>No Location Data...</h3>
      )}
    </>
  );
};

export default Location;

const Header = styled.div`
  & span img {
    width: 16px;
  }
`;
const Locations = styled.ul`
  list-style: none;
  padding: 0;
`;

const LocationItem = styled.li<{ icon: string }>`
  &::before {
    content: "";
    display: inline-block;
    width: 16px;
    height: 14px;
    margin-right: 3px;
    background-image: url(${(props) => props.icon});
    background-size: cover;
    background-position: center;
  }
`;
