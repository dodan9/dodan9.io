import styled, { keyframes } from "styled-components";
import type { Card } from "..";
import {
  CARD_W,
  LIGHT_GREEN,
  RADIUS,
  LIGHT_TEXT,
  CARD_W_NUMBER,
} from "../constant";
import { CardBase } from "../styles";

interface CardGroupType {
  deck: Card[];
}

const CardGroup = ({ deck }: CardGroupType) => {
  return (
    <CardArea>
      {deck.map((card, index) => {
        if (!card.isForward)
          return (
            <PlayingCardWrap key={index} $isForward={card.isForward}>
              <PlayingCard $isForward={card.isForward} className="forward" />
              <PlayingCard $isForward={card.isForward} className="back" />
            </PlayingCardWrap>
          );
        return (
          <PlayingCardWrap
            key={index}
            $isForward={card.isForward}
            $isRed={["♥︎", "♦︎"].includes(card.symbol)}
          >
            <PlayingCard $isForward={card.isForward} className="forward">
              {card.isForward && (
                <>
                  <div className="card-symbol">{card.symbol}</div>
                  <div className="corner">
                    {card.symbol}
                    {card.string ? card.string : card.number}
                  </div>
                  <div className="corner">
                    {card.symbol}
                    {card.string ? card.string : card.number}
                  </div>
                </>
              )}
            </PlayingCard>
            <PlayingCard $isForward={card.isForward} className="back" />
          </PlayingCardWrap>
        );
      })}
    </CardArea>
  );
};

export default CardGroup;

const CardArea = styled.div`
  display: flex;
  min-width: 148px;
  max-width: ${CARD_W_NUMBER * 2.5}px;
  gap: 5px;

  perspective: 1000px;
  justify-content: center;
  height: max-content;
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

const PlayingCardWrap = styled.div<{
  $isForward: boolean;
  $isRed?: boolean;
}>`
  width: ${CARD_W};
  aspect-ratio: 1 / 1.618;
  color: ${({ $isRed }) => ($isRed ? "red" : "black")};
  animation: ${({ $isForward }) => ($isForward ? flip : backflip)}
    ${({ $isForward }) => ($isForward ? "0.5s" : "0")} linear;
  perspective-origin: center;
  transform-style: preserve-3d;
`;

const PlayingCard = styled(CardBase)<{
  $isForward: boolean;
}>`
  display: block;
  position: absolute;
  width: ${CARD_W};
  aspect-ratio: 1 / 1.618;
  border-radius: ${RADIUS};

  &.forward {
    background-color: ${({ $isForward }) =>
      $isForward ? LIGHT_TEXT : LIGHT_GREEN};
    border: 5px solid
      ${({ $isForward }) => (!$isForward ? LIGHT_TEXT : LIGHT_GREEN)};
    backface-visibility: hidden;
    z-index: 999;

    & > div {
      &.card-symbol {
        position: absolute;
        width: 3rem;
        font-size: 3rem;
        line-height: 3rem;
        top: calc(50% - 1.5rem);
        left: calc(50% - 1.5rem);
      }
      &.corner {
        padding: 8px;

        width: fit-content;
        &:last-child {
          transform: rotateZ(180deg);
          position: absolute;
          bottom: 0px;
          right: 0px;
        }
      }
    }
  }
  &.back {
    background-color: ${({ $isForward }) =>
      !$isForward ? LIGHT_TEXT : LIGHT_GREEN};
    border: 5px solid
      ${({ $isForward }) => ($isForward ? LIGHT_TEXT : LIGHT_GREEN)};
    z-index: 1;
  }
`;
