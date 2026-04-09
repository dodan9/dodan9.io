import styled from "styled-components";
import type { Card } from "..";
import CardGroup from "./cardGroup";
import { CARD_W_NUMBER, LIGHT_GREEN, LIGHT_TEXT } from "../constant";

interface Props {
  name: string;
  deck: Card[];
  score: number;
  isWin?: number;
}

const DeckArea = ({ name, deck, score, isWin }: Props) => {
  return (
    <Area>
      <div>
        <div className="name">{name} deck</div>
        {name === "player" && <div>score: {score}</div>}
        {name === "dealer" && isWin
          ? isWin > 0 && <div>score: {score}</div>
          : null}
      </div>
      <CardGroup deck={deck} />
    </Area>
  );
};

export default DeckArea;

const Area = styled.div`
  & > div {
    color: ${LIGHT_TEXT};
  }
  margin: 10px;
  color: ${LIGHT_GREEN};
  height: ${CARD_W_NUMBER * 2}px;
`;
