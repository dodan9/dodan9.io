import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./home";
import Drop from "./home/drop";
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
