import styled, { keyframes } from "styled-components";
import type { Card } from ".";

interface CardGroupType {
  deck: Card[];
}

const CardGroup = ({ deck }: CardGroupType) => {
  return (
    <CardArea>
      {deck.map((card, index) => {
        if (!card.isForward)
          return (
            <PlayingCard key={index} $isForward={card.isForward}>
              <div className="forward" />
              <div className="back" />
            </PlayingCard>
          );
        return (
          <PlayingCard
            key={index}
            $isForward={card.isForward}
            $isRed={["♥︎", "♦︎"].includes(card.symbol)}
            $isOverFour={deck.length > 4}
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
        );
      })}
    </CardArea>
  );
};

export default CardGroup;

const CardArea = styled.div`
  display: flex;
  min-width: 148px;
  max-width: 180px;
  perspective: 1000px;

  & div:last-of-type {
    div {
      padding-right: 0;
    }
  }
`;

const flip = keyframes`
  from{
    transform: rotateY(180deg);
  }
  to {
    transform: rotateY(0deg);
  }
`;
const backflip = keyframes`
  from{
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(180deg);
  }
`;

const PlayingCard = styled.div<{
  $isForward: boolean;
  $isRed?: boolean;
  $isOverFour?: boolean;
}>`
  position: relative;
  width: 64px;
  height: 89px;
  border-radius: 3px;
  margin: 5px;
  color: ${({ $isRed }) => ($isRed ? "red" : "black")};
  animation: ${({ $isForward }) => ($isForward ? flip : backflip)}
    ${({ $isForward }) => ($isForward ? "0.5s" : "0")} linear;
  perspective-origin: center;
  transform-style: preserve-3d;

  div {
    display: flex;
    justify-content: center;
    padding-right: ${({ $isOverFour }) => ($isOverFour ? "20px" : "0")};
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
