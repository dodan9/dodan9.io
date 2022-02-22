import { CSSProperties, FC, useCallback, useState } from "react";
import { useDrop, XYCoord } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import { Box } from "./Box";
import update from "react-addons-update";
import type { DragItem } from "./interfaces";
import styled from "styled-components";
const blaburm = require("../images/blaburm.png");
const diaruga = require("../images/diaruga.png");

interface StateProps {
  [key: string]: { top: number; left: number; src: string };
}

export const Container = () => {
  const [boxes, setBoxes] = useState<StateProps>({
    blaburm: { top: 40, left: 40, src: blaburm },
    diaruga: { top: 140, left: 40, src: diaruga },
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
      {Object.keys(boxes).map((key) => {
        const { left, top, src } = boxes[key];
        return (
          <>
            {key == "blaburm" && (
              <Box key={key} id={key} left={left} top={top} src={src} />
            )}
            {key == "diaruga" && (
              <Box key={key} id={key} left={left} top={top} src={src} />
            )}
          </>
        );
      })}
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 300px;
  height: 300px;
  border: 1px solid black;
  position: "relative";
  background-color: black;
`;
