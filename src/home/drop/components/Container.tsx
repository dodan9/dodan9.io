import { useCallback, useState } from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import { Box } from "./Box";
import update from "react-addons-update";
import type { DragItem } from "./interfaces";
import styled from "styled-components";
import { Link } from "react-router-dom";
const blaburm = require("../images/blaburm.png");
const diaruga = require("../images/diaruga.png");

interface StateProps {
  [key: string]: {
    top: number;
    left: number;
    src?: string;
    backgroundColor?: string;
  };
}

export const Container = () => {
  const [boxes, setBoxes] = useState<StateProps>({
    blaburm: { top: 150, left: 30, src: blaburm, backgroundColor: "#fea" },
    diaruga: { top: 360, left: 70, src: diaruga },
    testText: { top: 50, left: 200, backgroundColor: "#6BAA6A" },
  });

  const moveBox = useCallback(
    (id: string, left: number, top: number) => {
      setBoxes(
        update(boxes, {
          [id]: { $merge: { left, top } },
        })
      );
    },
    [boxes, setBoxes]
  );

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop(item: DragItem, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as {
          x: number;
          y: number;
        };
        const left = item.left + delta.x;
        const top = item.top + delta.y;
        moveBox(item.id, left, top);
        return undefined;
      },
    }),
    [moveBox]
  );

  return (
    <Wrap ref={drop}>
      <h1>Drag & Drop Test</h1>
      <Link to="/dodan9.io">to home</Link>
      {Object.keys(boxes).map((key) => {
        const { left, top, src, backgroundColor } = boxes[key];
        return (
          <>
            {src ? (
              <Box
                key={key}
                id={key}
                left={left}
                top={top}
                src={src}
                backgroundColor={backgroundColor}
              />
            ) : (
              <Box
                key={key}
                id={key}
                left={left}
                top={top}
                backgroundColor={backgroundColor}
              />
            )}
          </>
        );
      })}
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  position: "relative";
  background-color: #ababab;
  & h1 {
    margin-top: 0;
  }
`;
