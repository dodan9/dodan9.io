import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { getRegionApi } from "./api";
const ball = require("./location_icon/ball.png");
const city = require("./location_icon/city.png");
const route = require("./location_icon/route.png");
const forest = require("./location_icon/forest.png");

interface RegionType {
  id: number;
  locations: [{ name: string; url: string }];
  name: string;
}

const Location = () => {
  const { region } = useParams();
  const [regionData, setRegionData] = useState<RegionType>();
  const [loading, setLoading] = useState<boolean>(true);

  const callApi = async () => {
    const response = await getRegionApi(region as string);
    setRegionData(response.data);
    setLoading(false);
  };

  useEffect(() => {
    callApi();
  }, []);

  if (loading) return <h2>Loading...</h2>;
  return (
    <>
      <h2>{regionData?.name}</h2>
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
    </>
  );
};

export default Location;

const Locations = styled.ul`
  list-style: none;
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
