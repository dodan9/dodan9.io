import { useEffect, useState } from "react";
import styled from "styled-components";
import CardGroup from "./cardGroup";

export interface Card {
  simbol: string;
  number: number | string;
  isForward: boolean;
}
const Blackjack = () => {
  const simbols = ["♠︎", "♣︎", "♥︎", "♦︎"];
  const [isGameStart, setIsGameStart] = useState<boolean>(false);
  const [publicDeck, setPublicDeck] = useState<Card[]>([]);
  const [dealerDeck, setDealerDeck] = useState<Card[]>([]);
  const [playerDeck, setPlayerDeck] = useState<Card[]>([]);

  const getRandomNumber = (max: number, min: number) => {
    if (max === min) return max;
    const randomNumber = Math.floor(Math.random() * max - min + 1) + min;
    return randomNumber;
  };
  const getRandomCard = (isForward: boolean) => {
    const randomNum = getRandomNumber(publicDeck.length, 1) - 1;
    let randomCard: Card = publicDeck[randomNum];
    randomCard.isForward = isForward;
    console.log(randomCard);
    setPublicDeck((current) => [
      ...current.slice(0, randomNum),
      ...current.slice(randomNum + 1, current.length),
    ]);
    return randomCard;
  };

  const makePublicDeck = () => {
    simbols.forEach((simbol) => {
      setPublicDeck((deck) => [
        ...deck,
        { simbol: simbol, number: "A", isForward: false },
      ]);
      for (let i = 2; i < 11; i++) {
        setPublicDeck((deck) => [
          ...deck,
          { simbol: simbol, number: i, isForward: false },
        ]);
      }
      setPublicDeck((deck) => [
        ...deck,
        { simbol: simbol, number: "J", isForward: false },
      ]);
      setPublicDeck((deck) => [
        ...deck,
        { simbol: simbol, number: "Q", isForward: false },
      ]);
      setPublicDeck((deck) => [
        ...deck,
        { simbol: simbol, number: "K", isForward: false },
      ]);
    });
  };

  const selectCard = (who: string, isForward: boolean) => {
    if (who === "player")
      setPlayerDeck((current) => [...current, getRandomCard(isForward)]);
    if (who === "dealer")
      setDealerDeck((current) => [...current, getRandomCard(isForward)]);
  };

  const startGame = async () => {
    await selectCard("dealer", true);
    await selectCard("player", true);
    await selectCard("dealer", false);
    await selectCard("player", true);
    setIsGameStart(true);
  };

  const resetGame = () => {
    setDealerDeck([]);
    setPlayerDeck([]);
    setPublicDeck([]);
    makePublicDeck();
    setIsGameStart(false);
  };

  useEffect(() => {
    makePublicDeck();
  }, []);

  return (
    <Container>
      <Title>Blackjack</Title>
      <Deck
        onClick={() => {
          console.log(publicDeck);
        }}
      >
        public deck
      </Deck>
      <DealerArea>
        dealer deck
        <CardGroup deck={dealerDeck} />
      </DealerArea>

      <PlayerArea>
        player deck
        <CardGroup deck={playerDeck} />
      </PlayerArea>
      <CommandArea>
        {isGameStart ? (
          <>
            <Command>hit</Command>
            <Command>stand</Command>
            <Command onClick={resetGame}>reset</Command>
          </>
        ) : (
          <Command onClick={startGame}>start</Command>
        )}
      </CommandArea>
    </Container>
  );
};

export default Blackjack;

const Container = styled.div`
  width: 1012px;
  height: 100vh;
  box-sizing: border-box;
  margin: 0 auto;
  padding: 10px;
  background-color: #486548;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1``;

const Deck = styled.div`
  width: 64px;
  height: 89px;
  border-radius: 3px;
  background-color: white;
`;

const Area = styled.div`
  display: flex;
  margin: 10px;
`;
const DealerArea = styled(Area)``;
const PlayerArea = styled(Area)``;
const CommandArea = styled(Area)``;

const Command = styled.div`
  background-color: #afd3af;
  width: 100px;
  margin: 0 10px;
  :first-child {
    margin-left: 0;
  }
`;
