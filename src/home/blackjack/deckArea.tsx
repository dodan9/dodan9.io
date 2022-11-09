import { useEffect, useState } from "react";
import styled from "styled-components";
import { Card } from ".";
import CardGroup from "./cardGroup";

const DeckArea = ({ name, deck }: { name: string; deck: Card[] }) => {
  const [score, setScore] = useState<number>(0);

  const countScore = () => {
    let score = 0;
    deck.forEach((card) => {
      score += card.number;
      if (card.number === 11 && score > 21) score -= 10;
    });
    setScore(score);
  };

  useEffect(() => {
    countScore();
  }, [deck]);
  return (
    <Area>
      <div>
        <div>{name} deck</div>
        <div>score: {score}</div>
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
