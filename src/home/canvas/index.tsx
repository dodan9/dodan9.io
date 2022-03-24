import React, { useEffect, useRef } from "react";
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

  const random = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const draw = (
    startX: number,
    startY: number,
    startDepth: number,
    angle: number,
    branchWidth: number
  ) => {
    const ctx = canvasRef.current?.getContext("2d");
    const depth = 11;
    if (ctx) {
      if (startDepth === depth) {
        return;
      }

      ctx.beginPath();

      let len = startDepth === 0 ? random(6, 12) : random(0, 9);
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

      const nextAngleL = depth - startDepth < 8 ? angle : angle - 5;
      const nextAngleR = depth - startDepth < 8 ? angle : angle + 5;
      // 재귀 함수 호출
      draw(
        endX,
        endY,
        startDepth + 1,
        nextAngleR - random(27, 30),
        branchWidth * 0.75
      );
      draw(
        endX,
        endY,
        startDepth + 1,
        nextAngleL + random(27, 30),
        branchWidth * 0.75
      );
    }
  };
  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const { clientX } = event;
    if (canvasRef.current)
      draw(
        clientX,
        canvasRef.current.height,
        0,
        random(-88, -92),
        random(11, 14)
      );
  };
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    }
  });
  return (
    <div>
      <StyledCanvas ref={canvasRef} onClick={handleClick}></StyledCanvas>
    </div>
  );
};

export default Canvas;

const StyledCanvas = styled.canvas`
  background-image: linear-gradient(to Bottom, #a1c4fd 0%, #c2e9fb 100%);
`;
