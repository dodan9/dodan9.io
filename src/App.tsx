import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./home";
import Drop from "./home/drop";
import Room from "./home/room";
import { createGlobalStyle } from "styled-components";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/drag_n_drop" element={<Drop />} />
        <Route path="/room" element={<Room />} />
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
