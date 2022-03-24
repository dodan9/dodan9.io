import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import Home from "./home";
import Drop from "./home/drop";
import Room from "./home/room";
import Mix from "./home/mix";
import Canvas from "./home/canvas";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/dodan9.io" element={<Home />} />
        <Route path="/dodan9.io/drag_n_drop" element={<Drop />} />
        <Route path="/dodan9.io/room" element={<Room />} />
        <Route path="/dodan9.io/mix" element={<Mix />} />
        <Route path="/dodan9.io/canvas" element={<Canvas />} />
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
