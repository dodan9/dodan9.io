import styled from "styled-components";
import { Card } from ".";
import CardGroup from "./cardGroup";

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
        <div>{name} deck</div>
        {/* {deck.findIndex((card) => card.isForward === false) === -1 && ( */}
        {name === "player" && <div>score: {score}</div>}
        {name === "dealer" && isWin
          ? isWin > 0 && <div>score: {score}</div>
          : null}
        {/* )} */}
      </div>
      <CardGroup deck={deck} />
    </Area>
  );
};

export default DeckArea;

const Area = styled.div`
  display: flex;
  margin: 10px;
`;
