import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import Home from "./home";
import Drop from "./home/drop";
import Room from "./home/room";
import Mix from "./home/mix";
import Canvas from "./home/canvas";
import Practice from "./home/practice";
import Pokemon from "./home/pokemon";
import DetailDex from "./home/pokemon/DetailDex";
import MovieDetail from "./home/practice/MovieDetail";
import Pokemon2 from "./home/pokemon2";
import MapApiTest from "./home/mapApiTest";
import Drop2 from "./home/drop2";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path='/dodan9.io' element={<Home />} />
        <Route path='/dodan9.io/drag_n_drop' element={<Drop />} />
        <Route path='/dodan9.io/room' element={<Room />} />
        <Route path='/dodan9.io/mix' element={<Mix />} />
        <Route path='/dodan9.io/canvas' element={<Canvas />} />
        <Route path='/dodan9.io/practice' element={<Practice />} />
        <Route path='/dodan9.io/practice/:id' element={<MovieDetail />} />
        <Route path='/dodan9.io/pokemon' element={<Pokemon />} />
        <Route path='/dodan9.io/pokemon/:id' element={<DetailDex />} />
        <Route path='/dodan9.io/pokemon2/*' element={<Pokemon2 />} />
        <Route path='/dodan9.io/mapapitest' element={<MapApiTest />} />
        <Route path='/dodan9.io/drag_n_drop2' element={<Drop2 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

const GlobalStyle = createGlobalStyle`
  a{
    text-decoration: none;
  }
`;
