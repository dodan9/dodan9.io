import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Region from "./Region";
import Location from "./Location";
import Country from "./Counrty";
import styled from "styled-components";

const Pokemon2 = () => {
  return (
    <div>
      <Header>
        <div>Pokemon2</div>
        <div>My Pokemon</div>
      </Header>
      <Routes>
        <Route path='/' element={<Country />} />
        <Route path='/:region' element={<Region />} />
        <Route path='/:region/:location' element={<Location />} />
      </Routes>
    </div>
  );
};

export default Pokemon2;

const Header = styled.div`
  width: 100%;
  display: flex;
`;
