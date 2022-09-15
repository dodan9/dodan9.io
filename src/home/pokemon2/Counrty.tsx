import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRegionApi } from "./api";

interface regionsType {
  name: string;
  url: string;
}

const Country = () => {
  const [regions, setRegions] = useState<regionsType[]>([]);
  const callApi = async () => {
    const response = await getRegionApi("");
    setRegions(response.data.results);
  };

  useEffect(() => {
    callApi();
  }, []);
  return (
    <div>
      {regions.map((region, i) => {
        return (
          <div key={i}>
            <Link to={`/dodan9.io/pokemon2/${region.name}`}>
              <p>{region.name}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Country;