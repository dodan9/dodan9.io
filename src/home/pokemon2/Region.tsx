import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getRegionApi } from "./api";

interface RegionType {
  id: number;
  locations: [{ name: string; url: string }];
  name: string;
}

const Region = () => {
  const { region } = useParams();
  const [regionData, setRegionData] = useState<RegionType>();
  const callApi = async () => {
    const response = await getRegionApi(region as string);
    setRegionData(response.data);
  };

  useEffect(() => {
    callApi();
  }, []);
  return (
    <>
      <h2>{regionData?.name}</h2>
      <ul>
        {regionData?.locations.map((location, index) => (
          <Link to={`/dodan9.io/pokemon2/${region}/${location.name}`}>
            <li key={index}>{location.name}</li>
          </Link>
        ))}
      </ul>
    </>
  );
};

export default Region;
