import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./home";
import Drop from "./home/drop";
import Ocean from "./home/ocean";
import Room from "./home/room";
import styled, { createGlobalStyle } from "styled-components";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/dodan9.io" element={<Home />} />
        <Route path="/dodan9.io/drag_n_drop" element={<Drop />} />
        <Route path="/dodan9.io/room" element={<Room />} />
        <Route path="/dodan9.io/ocean" element={<Ocean />} />
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
