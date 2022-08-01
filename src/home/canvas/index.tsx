import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface DrawProps {
  startX: number;
  startY: number;
  startDepth: number;
  angle: number;
  branchWidth: number;
}

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [treeCount, setTreeCount] = useState<number>(0);
  const ctx = canvasRef.current?.getContext("2d");

  const random = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const draw = (
    {startX,
    startY,
    startDepth,
    angle,
    branchWidth}:DrawProps
  ) => {
    const depth = 11;
    if (ctx) {
      if (startDepth === depth) {
        return;
      }

      ctx.beginPath();

      let len =
        startDepth === 0
          ? random(4, 12)
          : startDepth < 2
          ? random(4, 9)
          : random(0, 8);
      const endX =
        startDepth === 0
          ? startX +
            Math.cos((angle / 180) * Math.PI) * len * (depth - startDepth)
          : startX +
            Math.cos((angle / 180) * random(3, Math.PI)) *
              len *
              (depth - startDepth);
      const endY =
        startY +
        Math.sin((angle / 180) * random(3, Math.PI)) *
          len *
          (depth - startDepth);
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);

      if (branchWidth < 0.8) {
        branchWidth = random(2, 4);
        ctx.strokeStyle = `rgb(${random(200, 255)},${random(100, 150)},${random(
          150,
          200
        )})`;
      } else {
        const alpha =
          (depth - startDepth) / 5 > 1 ? 1 : (depth - startDepth) / 5;
        ctx.strokeStyle = `rgba(${random(100, 120)},${random(50, 80)},${random(
          50,
          100
        )},${alpha})`;
      }
      ctx.lineWidth = branchWidth;
      ctx.stroke();

      
      // 재귀 함수 호출
      draw(
        {startX:endX,
          startY:endY,
          startDepth:(startDepth + 1),
          angle:(angle - random(27, 29)),
          branchWidth:(branchWidth * 0.75)}
      );
      draw(
        {startX:endX,
          startY:endY,
          startDepth:(startDepth + 1),
          angle:(angle + random(27, 29)),
          branchWidth:(branchWidth * 0.75)}
      );
    }
  };
  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const { clientX } = event;
    let randomNumber = clientX;
    if (canvasRef.current) {
      for (let i = 0; i < treeCount; i++) {
        if (treeCount === 4) randomNumber = clientX + random(-200, 200);
        if (treeCount === 100)
          randomNumber = random(0, canvasRef.current.width);
        draw(
          {startX:randomNumber,
          startY:canvasRef.current.height,
          startDepth:0,
          angle:random(-85, -95),
          branchWidth:random(11, 14)}
        );
      }
    }
  };

  const refresh = () => {
    if (canvasRef.current) {
      ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    }
  };

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    }

    window.addEventListener("resize", refresh);
  }, []);

  return (
    <Container>
      <Title>Click to Grow</Title>
      <Selects>
        <Select
          treeCount={treeCount === 1 ? true : false}
          onClick={() => {
            setTreeCount(1);
          }}
        >
          1 tree
        </Select>
        <Select
          treeCount={treeCount === 4 ? true : false}
          onClick={() => {
            setTreeCount(4);
          }}
        >
          4 tree
        </Select>
        <Select
          treeCount={treeCount === 100 ? true : false}
          onClick={() => {
            setTreeCount(100);
          }}
        >
          100 tree
        </Select>
      </Selects>
      <Refresh treeCount={false} onClick={refresh}>
        refresh
      </Refresh>
      <StyledCanvas ref={canvasRef} onClick={handleClick}></StyledCanvas>
    </Container>
  );
};

export default Canvas;
const Container = styled.div`
  overflow: hidden;
`
const Title = styled.div`
  position: absolute;
  text-align: center;
  font-size: 60px;
  width: 100%;
  margin-top: 50px;
  background-image: linear-gradient(-20deg, #6e45e2 0%, #88d3ce 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
const Selects = styled.div`
  position: absolute;
  top: 200px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Select = styled.div<{ treeCount: Boolean }>`
  width: 200px;
  padding: 10px;
  margin: 10px;
  text-align: center;
  border-radius: 5px;
  border: ${(props) => (props.treeCount ? "3px solid transparent" : "none")};
  background-image: linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%);
  color: ${(props) => (props.treeCount ? "white" : "whitesmoke")};
  cursor: pointer;
  &:hover {
    color: yellow;
    background-image: linear-gradient(-45deg, #93a5cf 0%, #e4efe9 100%);
  }
`;
const Refresh = styled(Select)`
  position: absolute;
  left: calc(50% - 120px);
  top: 300px;
`;
const StyledCanvas = styled.canvas`
  background-image: linear-gradient(to Bottom, #a1c4fd 0%, #c2e9fb 100%);
`;
