import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./home";
import Drop from "./home/drop";
import Ocean from "./home/ocean";
import Room from "./home/room";
import useMouse from "@react-hook/mouse-position";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const App = () => {
  const [xPosition, setXPosition] = useState<number>(0);
  const [yPosition, setYPosition] = useState<number>(0);

  const ref = useRef(null);
  const mouse = useMouse(ref, { enterDelay: 0, leaveDelay: 0 });

  useEffect(() => {
    if (mouse.x) setXPosition(mouse.x + 20);
    if (mouse.y) setYPosition(mouse.y + 20);
  }, [mouse.x, mouse.y]);

  return (
    <Container ref={ref}>
      <BrowserRouter>
        <Routes>
          <Route path="/dodan9.io" element={<Home />} />
          <Route path="/dodan9.io/drop" element={<Drop />} />
          <Route path="/dodan9.io/room" element={<Room />} />
          <Route path="/dodan9.io/ocean" element={<Ocean />} />
        </Routes>
      </BrowserRouter>
      {mouse.x && mouse.y && (
        <FollowCursor x={xPosition} y={yPosition}>
          is follow?
        </FollowCursor>
      )}
    </Container>
  );
};

export default App;

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

const FollowCursor = styled.div<{ x: any; y: any }>`
  position: fixed;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
  transition: 0.1s ease-out;
`;
