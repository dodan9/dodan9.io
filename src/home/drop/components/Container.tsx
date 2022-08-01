import { useCallback, useState } from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import { Box } from "./Box";
import update from "react-addons-update";
import type { DragItem } from "./interfaces";
import styled from "styled-components";
import { Link } from "react-router-dom";

const brown = require("../images/brown_h.png");
const sunflower = require("../images/sunflower.png");
const bear_chair = require("../images/bear_chair.png");

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
    title: { top: 20, left: 20, backgroundColor: "#2faa2f" },
    link: { top: 100, left: 380, backgroundColor: "yellow" },
    brown: { top: 150, left: 30, src: brown, backgroundColor: "#fea" },
    sunflower: { top: 360, left: 70, src: sunflower },
    hi: { top: 180, left: 220, backgroundColor: "#6BAA6A" },
    bear_chair: { top: 270, left: 270, src: bear_chair },
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
        const { left, top, src, backgroundColor } = boxes[key];
        return (
          <>
            {src && (
              <Box
                key={key}
                id={key}
                left={left}
                top={top}
                src={src}
                backgroundColor={backgroundColor}
              />
            )}
            {!src && (
              <Box
                key={key}
                id={key}
                left={left}
                top={top}
                backgroundColor={backgroundColor}
              >
                {key === "title" && <h1>Drag & Drop</h1>}
                {key === "link" && <Link to="/dodan9.io">to home</Link>}
                {key === "hi" && <>하이</>}
              </Box>
            )}
          </>
        );
      })}
    </Wrap>
  );
};

const Wrap = styled.div`
  width: calc(100vw - 40px);
  height: calc(100vh - 40px);
  padding: 20px;
  position: relative;
  background-color: #ababab;
  color: #fff;
  & h1 {
    width: fit-content;
    padding: 10px;
    margin: 0;
  }
  & a {
    color: black;
  }
  & a:hover {
    color: #ababab;
  }
`;
