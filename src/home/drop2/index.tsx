import { Children, MouseEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";

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
      if (currentDragItem) current.classList.add(currentDragItem.id);
    }
  };
  const dropInBox = (event: MouseEvent) => {
    event.preventDefault();
    if (boxRef.current) {
      const current = boxRef.current as HTMLDivElement;
      if (currentDragItem) {
        current.classList.remove(currentDragItem.id);
        setAdditionalItems((currentList) => [
          ...currentList,
          currentDragItem.id,
        ]);
      }
    }
  };

  const onClear = () => {
    setAdditionalItems([]);
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
      <DropBox ref={boxRef} onDragOver={dragOverToBox} onDrop={dropInBox}>
        Drop here
        {additionalItems &&
          additionalItems.map((item, index) => <div key={index}>{item}</div>)}
      </DropBox>
      <div onClick={onClear}>clear</div>
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
  &.test1 {
    border: 5px dashed red;
  }
  &.test2 {
    border: 5px dashed blue;
  }
`;
