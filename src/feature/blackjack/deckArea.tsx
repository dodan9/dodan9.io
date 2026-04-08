import styled from "styled-components";
import type { Card } from ".";
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
  display: flex;
  margin: 10px;
  color: #afd3af;
  display: flex;
  align-items: center;
  height: 99px;
`;
