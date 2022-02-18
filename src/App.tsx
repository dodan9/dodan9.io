import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./home";
import Ocean from "./home/ocean";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dodan9.io" element={<Home />} />
        <Route path="/dodan9.io/ocean" element={<Ocean />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
