import useMouse from "@react-hook/mouse-position";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

function Mix() {
  const [xPosition, setXPosition] = useState<number>(0);
  const [yPosition, setYPosition] = useState<number>(0);
  const ref = useRef(null);
  const mouse = useMouse(ref, { enterDelay: 0, leaveDelay: 0 });

  useEffect(() => {
    if (mouse.x) setXPosition(mouse.x + 10);
    if (mouse.y) setYPosition(mouse.y + 10);
  }, [mouse.x, mouse.y]);
  return (
    <Content ref={ref}>
      <Container>
        <h2>
          <Link to="/dodan9.io/">home</Link>
        </h2>
        <Slide>
          <div>text</div>
          <div>text</div>
          <div>text</div>
          <div>text</div>
          <div>text</div>
          <div>text</div>
          <div>text</div>
          <div>text</div>
          <div>text</div>
          <div>text</div>
        </Slide>
        <Slide2>
          <div>
            text1
            <br />
            text2
            <br />
            text3
            <br />
            text4
            <br />
            text5
          </div>
        </Slide2>
        <Star />
        {mouse.x && mouse.y ? (
          <FollowCursor x={xPosition} y={yPosition}></FollowCursor>
        ) : null}
      </Container>
    </Content>
  );
}

export default Mix;

const Content = styled.div`
  width: 100vw;
  height: 100vh;
`;
const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  height: 100vh;
  padding: 20px;
  background-color: yellowgreen;
  h2 {
    margin: 0;
    font-weight: 900;
    font-size: 50px;
    a {
      color: darkgreen;
    }
    a:hover {
      color: transparent;
      -webkit-text-stroke: 1.2px green;
    }
  }
`;

const Slide = styled.div`
  @keyframes slide {
    0% {
      left: 0;
    }
    100% {
      left: -50%;
    }
  }
  position: fixed;
  overflow: hidden;
  width: 200%;
  top: 100px;
  left: 0;
  display: flex;
  justify-content: space-around;
  mix-blend-mode: screen;
  & div {
    position: relative;
    color: red;
    font-size: 40px;
    animation: slide 6s linear infinite;
  }
`;

const Slide2 = styled.div`
  @keyframes slide2 {
    0% {
      top: 0;
    }
    20% {
      top: -30px;
    }
    40% {
      top: -60px;
    }
    60% {
      top: -90px;
    }
    80% {
      top: -120px;
    }
    100% {
      top: 0;
    }
  }
  height: 30px;
  line-height: 30px;
  overflow: hidden;
  position: relative;
  & div {
    position: relative;
    animation: slide2 6s infinite;
  }
`;

const Star = styled.div`
  @keyframes x {
    to {
      left: calc(100% + 40px);
    }
  }
  @keyframes y {
    to {
      top: 49.9%;
    }
  }
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: radial-gradient(at 30% 30%, #0000, #000a) red;
  left: -40px;
  top: 50%;
  animation: x 5s linear infinite alternate,
    y 2s infinite cubic-bezier(0.5, 400, 0.5, -400);
  z-index: 100;
`;

const FollowCursor = styled.div<{ x: number; y: number }>`
  position: fixed;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
  transition: 0.1s ease-out;
  background-color: red;
  mix-blend-mode: exclusion;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: -27px;
  margin-top: -27px;
  z-index: 100;
  pointer-events: none;
`;
