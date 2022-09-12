import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Region from "./Region";
import Location from "./Location";
import Country from "./Counrty";

const Pokemon2 = () => {
  return (
    <div>
      <h2>Pokemon2</h2>
      <Routes>
        <Route path='/' element={<Country />} />
        <Route path='/:region' element={<Region />} />
        <Route path='/:region/:location' element={<Location />} />
      </Routes>
    </div>
  );
};

export default Pokemon2;
