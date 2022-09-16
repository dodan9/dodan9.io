import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getRegionApi } from "./api";
const kanto = require("./region_img/kanto.png");

interface regionsType {
  name: string;
  url: string;
}

const Region = () => {
  const [regions, setRegions] = useState<regionsType[]>([]);
  const callApi = async () => {
    const response = await getRegionApi("");
    setRegions(response.data.results);
  };
  const [regionImgs, setRegionImgs] = useState<string[]>([]);

  const setRegionImgList = () => {
    if (regions) {
      regions.map((region) => {
        setRegionImgs((current) => [
          ...current,
          require(`./region_img/${region.name}.png`),
        ]);
      });
    }
  };

  useEffect(() => {
    callApi();
  }, []);
  useEffect(() => {
    setRegionImgList();
  }, [regions]);
  return (
    <RegionList>
      {regions.map((region, i) => {
        return (
          <Link to={`/dodan9.io/pokemon2/${region.name}`} key={i}>
            <RegionBox url={regionImgs[i]}>
              <p>{region.name}</p>
            </RegionBox>
          </Link>
        );
      })}
    </RegionList>
  );
};

export default Region;

const RegionList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 10px 0;
`;
const RegionBox = styled.div<{ url: string }>`
  position: relative;
  width: 320px;
  height: 200px;
  margin: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${(props) => props.url});
  background-color: rgba(0, 0, 0, 0.6);
  background-size: cover;
  background-position: center;
  background-blend-mode: darken;
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
    & p {
      text-decoration: underline;
    }
  }
  & p {
    position: relative;
    z-index: 1;
    color: white;
  }
`;
