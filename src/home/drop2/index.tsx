import { MouseEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Drop2 = () => {
  const targetRef = useRef(null);
  const boxRef = useRef(null);
  const [currentDragItem, setCurrentDragItem] =
    useState<HTMLDivElement | null>();

  const targetDragStart = (event: MouseEvent<HTMLDivElement>) => {
    setCurrentDragItem(event.currentTarget);
  };
  const targetDragEnd = () => {
    setCurrentDragItem(null);
  };

  const dragOverToBox = () => {
    if (boxRef.current) {
      const current = boxRef.current as HTMLDivElement;
      switch (currentDragItem?.id) {
        case "test1":
          current.classList.add("over1");
          break;
        case "test2":
          current.classList.add("over2");
          break;
        default:
          break;
      }
    }
  };
  const dropInBox = () => {
    if (boxRef.current) {
      const current = boxRef.current as HTMLDivElement;

      switch (currentDragItem?.id) {
        case "test1":
          current.classList.remove("over1");
          break;
        case "test2":
          current.classList.remove("over2");
          break;
        default:
          break;
      }
    }
  };

  return (
    <div>
      <Target
        ref={targetRef}
        id='test1'
        draggable
        onDragStart={targetDragStart}
        onDragEnd={targetDragEnd}
      >
        drag!
      </Target>
      <Target
        ref={targetRef}
        id='test2'
        draggable
        onDragStart={targetDragStart}
        onDragEnd={targetDragEnd}
      >
        drag?
      </Target>
      <DropBox
        ref={boxRef}
        onDragOver={dragOverToBox}
        onDrop={dropInBox}
        onDragLeave={dropInBox}
      ></DropBox>
    </div>
  );
};

export default Drop2;

const Target = styled.div`
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 48px;
  background-color: black;
  color: white;
`;

const DropBox = styled.div`
  width: 100px;
  height: 100px;
  border: 5px dashed black;
  &.over1 {
    border: 5px dashed red;
  }
  &.over2 {
    border: 5px dashed blue;
  }
`;
