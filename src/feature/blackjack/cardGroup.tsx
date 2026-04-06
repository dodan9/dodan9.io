import styled, { keyframes } from "styled-components";
import type { Card } from ".";

interface CardGroupType {
  deck: Card[];
}

const CardGroup = ({ deck }: CardGroupType) => {
  return (
    <>
      {deck.map((card, index) => (
        <PlayingCard
          key={index}
          $isForward={card.isForward}
          $isRed={["♥︎", "♦︎"].includes(card.symbol)}
        >
          <div className="forward">
            {card.isForward && (
              <>
                {card.symbol}
                {card.string ? card.string : card.number}
              </>
            )}
          </div>
          <div className="back" />
        </PlayingCard>
      ))}
    </>
  );
};

export default CardGroup;

const flip = keyframes`
from{
transform: rotateY(180deg);
}
to {
  transform: rotateY(0deg);
}
`;
const PlayingCard = styled.div<{ $isForward: boolean; $isRed: boolean }>`
  position: relative;
  width: 64px;
  height: 89px;
  border-radius: 3px;
  margin: 5px;
  color: ${({ $isRed }) => ($isRed ? "red" : "black")};
  perspective: 1000px;
  animation: ${flip} ${({ $isForward }) => ($isForward ? "0.5s" : "0")} linear;
  perspective-origin: center;
  transform-style: preserve-3d;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 64px;
    height: 89px;
    border-radius: 3px;
    left: 0;
    top: 0;
  }

  .forward {
    background-color: ${({ $isForward }) => ($isForward ? "white" : "#afd3af")};
    border: 5px solid ${({ $isForward }) => (!$isForward ? "white" : "#afd3af")};
    backface-visibility: hidden;
    z-index: 999;
  }
  .back {
    background-color: ${({ $isForward }) =>
      !$isForward ? "white" : "#afd3af"};
    border: 5px solid ${({ $isForward }) => ($isForward ? "white" : "#afd3af")};
    z-index: 1;
  }
`;
