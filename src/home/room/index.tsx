import useMouse from "@react-hook/mouse-position";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Room = () => {
  const [xPosition, setXPosition] = useState<number>(0);
  const [yPosition, setYPosition] = useState<number>(0);

  const ref = useRef(null);
  const mouse = useMouse(ref, { enterDelay: 0, leaveDelay: 0 });

  useEffect(() => {
    if (mouse.x) setXPosition(mouse.x + 30);
    if (mouse.y) setYPosition(mouse.y + 30);
  }, [mouse.x, mouse.y]);
  return (
    <Container ref={ref}>
      <Title>room</Title>
      {/* <Link to="/dodan9.io/ocean">to ocean</Link> */}
      {mouse.x && mouse.y && (
        <FollowCursor x={xPosition} y={yPosition}>
          room?
        </FollowCursor>
      )}
    </Container>
  );
};

export default Room;

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;
const Title = styled.div``;

const FollowCursor = styled.div<{ x: any; y: any }>`
  position: fixed;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
  transition: 0.1s ease-out;
`;
