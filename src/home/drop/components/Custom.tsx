import { XYCoord, useDragLayer } from "react-dnd";
import { Box } from "./Box";
import styled from "styled-components";

function getItemStyles(
  initialOffset: XYCoord | null,
  currentOffset: XYCoord | null
) {
  if (!initialOffset || !currentOffset) {
    return {
      display: "none",
    };
  }

  let { x, y } = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}

export const Custom = () => {
  const { isDragging, item, initialOffset, currentOffset } = useDragLayer(
    (monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    })
  );

  if (!isDragging) {
    return null;
  }
  return (
    <Wrap>
      <div style={getItemStyles(initialOffset, currentOffset)}>
        {item.src && (
          <Box
            key={item.key}
            id={item.key}
            left={0}
            top={0}
            src={item.src}
            backgroundColor="#7e7e7e"
          />
        )}
        {!item.src && (
          <Box
            key={item.key}
            id={item.key}
            left={0}
            top={0}
            backgroundColor="#7e7e7e"
          >
            {item.children}
          </Box>
        )}
      </div>
    </Wrap>
  );
};

const Wrap = styled.div`
  position: fixed;
  pointer-events: none;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  color: #fff;
  & h1 {
    width: fit-content;
    padding: 10px;
    margin: 0;
  }
  & a {
    color: black;
  }
`;
