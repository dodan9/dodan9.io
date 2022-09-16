import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Location from "./Location";
import LocationArea from "./LocationArea";
import Region from "./Region";
import styled, { createGlobalStyle } from "styled-components";
import MyPokemon from "./MyPokemon";

const Pokemon2 = () => {
  return (
    <Container>
      <GlobalStyle />
      <Header>
        <h2>
          <Link to='/dodan9.io/pokemon2/'>Pokemon2</Link>
        </h2>
        <h2>
          <Link to='/dodan9.io/pokemon2/mypokemon'>My Pokemon</Link>
        </h2>
      </Header>
      <Routes>
        <Route path='/mypokemon' element={<MyPokemon />} />
        <Route path='/' element={<Region />} />
        <Route path='/:region' element={<Location />} />
        <Route path='/:region/:location' element={<LocationArea />} />
      </Routes>
    </Container>
  );
};

export default Pokemon2;

const GlobalStyle = createGlobalStyle`
/* a{
  color: black;
}
  a:visited{
    color:black;
  }
  a:hover{
    text-decoration: underline;
    color: blue;
  } */
`;
const Container = styled.div`
  position: relative;
  width: 1080px;
  margin: 0 auto;
  padding: 10px;
`;
const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  & h2 {
    margin: 0;
  }
`;
