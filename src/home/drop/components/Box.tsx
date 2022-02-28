import type { ReactNode } from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import styled from "styled-components";

interface BoxProps {
  id?: any;
  left: number;
  top: number;
  src?: string;
  backgroundColor?: string;
  children?: ReactNode;
}

export const Box = ({ id, left, top, backgroundColor, src }: BoxProps) => {
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

  return (
    <DragBox ref={drag} style={{ left, top }} isDragging={isDragging}>
      <BoxContent backgroundColor={backgroundColor}>
        {src && <img src={src} />}
        {id === "testText" && <>하이</>}
      </BoxContent>
    </DragBox>
  );
};

const DragBox = styled.div<{ isDragging: boolean }>`
  position: absolute;
  border-radius: 10px;
  background-color: #fff;
  cursor: move;
  & img {
    width: 100px;
    height: 100px;
    border-radius: 10px;
  }
  opacity: ${(props) => (props.isDragging ? 0 : 1)};
  z-index: 30;
  box-shadow: 5px 5px 8px 4px rgb(0 0 0 / 30%);
  padding: 20px;
`;

const BoxContent = styled.div<{ backgroundColor?: string }>`
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "#6a8baa"};
  border: 5px solid #666666;
  padding: 10px;
  min-width: 50px;
  text-align: center;
  color: #fff;
  font-weight: 900;
  font-size: 20px;
`;
