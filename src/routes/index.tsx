import { Routes, Route } from "react-router-dom";
import Home from "@/feature/home";
import Blackjack from "@/feature/blackjack";
import Drop from "@/feature/drop";
import Room from "@/feature/room";
import Mix from "@/feature/mix";
import Canvas from "@/feature/canvas";
import Practice from "@/feature/practice";
import MovieDetail from "@/feature/practice/pages/MovieDetail";
import Pokemon from "@/feature/pokemon";
import DetailDex from "@/feature/pokemon/DetailDex";
import Pokemon2 from "@/feature/pokemon2";
import MapApiTest from "@/feature/mapApiTest";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/drag_n_drop" element={<Drop />} />
      <Route path="/room" element={<Room />} />
      <Route path="/mix" element={<Mix />} />
      <Route path="/canvas" element={<Canvas />} />
      <Route path="/practice" element={<Practice />} />
      <Route path="/practice/:id" element={<MovieDetail />} />
      <Route path="/pokemon" element={<Pokemon />} />
      <Route path="/pokemon/:id" element={<DetailDex />} />
      <Route path="/pokemon2/*" element={<Pokemon2 />} />
      <Route path="/mapapitest" element={<MapApiTest />} />
      <Route path="/blackjack" element={<Blackjack />} />
    </Routes>
  );
};

export default MainRoutes;
