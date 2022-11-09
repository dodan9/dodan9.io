import styled from "styled-components";
import { Card } from ".";

interface CardGroupType {
  deck: Card[];
}

const CardGroup = ({ deck }: CardGroupType) => {
  return (
    <>
      {deck.map((card, index) => (
        <PlayingCard key={index}>
          {card.simbol}
          {card.string ? card.string : card.number}
          <br />
          {card.isForward ? "forward" : "behind"}
        </PlayingCard>
      ))}
    </>
  );
};

export default CardGroup;

const PlayingCard = styled.div`
  width: 64px;
  height: 89px;
  border-radius: 3px;
  background-color: white;
  margin: 5px;
`;
