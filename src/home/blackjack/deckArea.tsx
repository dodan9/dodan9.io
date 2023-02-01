import styled from "styled-components";
import { Card } from ".";
import CardGroup from "./cardGroup";

interface Props {
  name: string;
  deck: Card[];
  score: number;
}

const DeckArea = ({ name, deck, score }: Props) => {
  return (
    <Area>
      <div>
        <div>{name} deck</div>
        {deck.findIndex((card) => card.isForward === false) === -1 && (
          <div>score: {score}</div>
        )}
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
