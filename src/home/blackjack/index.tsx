import { useEffect, useState } from "react";
import styled from "styled-components";
import CardGroup from "./cardGroup";

export interface Card {
  id: number;
  simbol: string;
  number: number | string;
  isForward: boolean;
}
const Blackjack = () => {
  const [isGameStart, setIsGameStart] = useState<boolean>(false);
  const [publicDeck, setPublicDeck] = useState<Card[]>([]);
  const [dealerDeck, setDealerDeck] = useState<Card[]>([]);
  const [playerDeck, setPlayerDeck] = useState<Card[]>([]);
  const [dealerScore, setDealerScore] = useState<number>(0);
  const [playerScore, setPlayerScore] = useState<number>(0);
  const [isWin, setIsWin] = useState<boolean | null>(null);

  const makePublicDeck = () => {
    const simbols = ["♠︎", "♣︎", "♥︎", "♦︎"];
    simbols.forEach((simbol) => {
      setPublicDeck((deck) => [
        ...deck,
        { id: deck.length, simbol: simbol, number: "A", isForward: false },
      ]);
      for (let i = 2; i < 11; i++) {
        setPublicDeck((deck) => [
          ...deck,
          { id: deck.length, simbol: simbol, number: i, isForward: false },
        ]);
      }
      setPublicDeck((deck) => [
        ...deck,
        { id: deck.length, simbol: simbol, number: "J", isForward: false },
      ]);
      setPublicDeck((deck) => [
        ...deck,
        { id: deck.length, simbol: simbol, number: "Q", isForward: false },
      ]);
      setPublicDeck((deck) => [
        ...deck,
        { id: deck.length, simbol: simbol, number: "K", isForward: false },
      ]);
    });
  };

  const getRandomNumber = (max: number, min: number) => {
    if (max === min) return max;
    const randomNumber = Math.floor(Math.random() * max - min + 1) + min;
    return randomNumber;
  };

  const getRandomCard = (randomNum: number, isForward: boolean) => {
    let randomCard = publicDeck.find((card) => card.id === randomNum) as Card;
    randomCard.isForward = isForward;

    const updateDeck = publicDeck;
    updateDeck.splice(updateDeck.indexOf(randomCard), 1);
    setPublicDeck(updateDeck);

    return randomCard;
  };

  const selectCard = (who: string, isForward: boolean) => {
    const randomNum = getRandomNumber(51, 0);
    const remainNum: number[] = publicDeck.map((deck) => deck.id);

    if (remainNum.includes(randomNum)) {
      const card = getRandomCard(
        remainNum[remainNum.indexOf(randomNum)],
        isForward
      );
      console.log(card);
      if (who === "player") {
        setPlayerDeck((current) => [...current, card]);
      }
      if (who === "dealer") {
        setDealerDeck((current) => [...current, card]);
      }
    } else {
      console.log("duplicate!!");
      selectCard(who, isForward);
    }
  };

  const startGame = () => {
    setIsGameStart(true);
    selectCard("dealer", true);
    selectCard("player", true);
    selectCard("dealer", false);
    selectCard("player", true);
  };

  const resetGame = () => {
    setDealerDeck([]);
    setPlayerDeck([]);
    setPublicDeck([]);
    setDealerScore(0);
    setPlayerScore(0);
    setIsWin(null);
    makePublicDeck();
    setIsGameStart(false);
  };

  const hitCard = () => {
    selectCard("player", true);
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

      {isGameStart && (
        <>
          <DealerArea>
            dealer deck
            <CardGroup deck={dealerDeck} />
          </DealerArea>
          <PlayerArea>
            player deck
            <CardGroup deck={playerDeck} />
          </PlayerArea>
        </>
      )}
      <CommandArea>
        {isGameStart ? (
          <>
            <Command disabled={isWin === true} onClick={hitCard}>
              hit
            </Command>
            <Command disabled={isWin === true}>stand</Command>
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

const Command = styled.button`
  background-color: #afd3af;
  width: 100px;
  margin: 0 10px;
  border: none;
  :first-child {
    margin-left: 0;
  }
  :only-child {
    margin: 0;
  }
`;
