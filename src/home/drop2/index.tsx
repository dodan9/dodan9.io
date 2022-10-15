import { MouseEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";
const glass = require("./img/glass.png");
const cocktail1 = require("./img/cocktail1.png");

const Drop2 = () => {
  const targetRef = useRef(null);
  const boxRef = useRef(null);
  const [currentDragItem, setCurrentDragItem] =
    useState<HTMLDivElement | null>();
  const [additionalItems, setAdditionalItems] = useState<string[]>([]);

  const targetDragStart = (event: MouseEvent<HTMLDivElement>) => {
    setCurrentDragItem(event.currentTarget);
  };
  const targetDragEnd = () => {
    setCurrentDragItem(null);
  };

  const dragOverToBox = (event: MouseEvent) => {
    event.preventDefault();
    if (boxRef.current) {
      const current = boxRef.current as HTMLDivElement;
      if (currentDragItem) {
        current.classList.add(currentDragItem.id);
      }
    }
  };
  const dropInBox = (event: MouseEvent) => {
    event.preventDefault();
    if (boxRef.current) {
      const current = boxRef.current as HTMLDivElement;
      if (currentDragItem) {
        current.classList.remove(currentDragItem.id);
        if (!additionalItems.includes(currentDragItem.id)) {
          setAdditionalItems((currentList) => [
            ...currentList,
            currentDragItem.id,
          ]);
        }
      }
    }
  };

  const onClear = () => {
    setAdditionalItems([]);
  };

  return (
    <Container>
      <Targets>
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
      </Targets>
      <DropBox ref={boxRef} onDragOver={dragOverToBox} onDrop={dropInBox}>
        Drop here
        <img src={additionalItems.includes("test1") ? cocktail1 : glass} />
        {additionalItems &&
          additionalItems.map((item, index) => (
            <AddedItem key={index}>{item}</AddedItem>
          ))}
      </DropBox>
      <ClearBtn onClick={onClear}>clear</ClearBtn>
    </Container>
  );
};

export default Drop2;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  color: white;
  background-color: #464646;
  & * {
    box-sizing: border-box;
    position: relative;
  }
`;

const Targets = styled.div`
  display: flex;
`;

const Target = styled.div`
  width: 50px;
  height: 50px;
  margin: 5px;
  text-align: center;
  line-height: 35px;
  border: 5px dashed white;
  cursor: grab;
`;

const DropBox = styled.div`
  width: 200px;
  margin: 5px;
  border: 5px dashed black;
  text-align: center;
  &.test1 {
    border: 5px dashed red;
  }
  &.test2 {
    border: 5px dashed blue;
  }
  & img {
    width: 130px;
  }
`;

const AddedItem = styled.div`
  margin: 2px 0;
`;

const ClearBtn = styled.span`
  cursor: pointer;
  display: inline-block;
  border: dashed darkgray 5px;
  margin: 5px;
`;
