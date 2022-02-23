import type { ReactNode } from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import styled from "styled-components";

interface BoxProps {
  id?: any;
  left: number;
  top: number;
  src?: string;
  children?: ReactNode;
  preview?: boolean;
}

export const Box = ({ id, left, top, src, preview }: BoxProps) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.BOX,
      item: { id, left, top },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top]
  );

  if (isDragging) {
    return <div ref={drag} />;
  }
  return (
    <DragBox
      ref={drag}
      style={{ left, top }}
      role={preview ? "BoxPreview" : "Box"}
    >
      <img src={src} />
    </DragBox>
  );
};

const DragBox = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0);
  cursor: move;
  & img {
    width: 100px;
    height: 100px;
  }
`;
