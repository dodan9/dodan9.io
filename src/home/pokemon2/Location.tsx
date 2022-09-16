import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { getRegionApi } from "./api";
const city = require("./location_icon/city.png");
const route = require("./location_icon/route.png");

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
        {regionData?.locations.map((location, index) => (
          <LocationItem
            key={index}
            icon={
              location.name.includes("city")
                ? city
                : location.name.includes("route")
                ? route
                : null
            }
          >
            <Link to={`/dodan9.io/pokemon2/${region}/${location.name}`}>
              {location.name}
            </Link>
          </LocationItem>
        ))}
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
  }
`;
