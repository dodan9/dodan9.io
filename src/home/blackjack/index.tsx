import { useEffect, useState } from "react";
import styled from "styled-components";
import CardGroup from "./cardGroup";
import DeckArea from "./deckArea";

export interface Card {
  id: number;
  simbol: string;
  number: number;
  isForward: boolean;
  string?: string;
}

const Blackjack = () => {
  const [isGameStart, setIsGameStart] = useState<boolean>(false);
  const [isWin, setIsWin] = useState<number>(0); // 0:notihing, 1:win, 2:lose
  const [publicDeck, setPublicDeck] = useState<Card[]>([]);
  const [dealerDeck, setDealerDeck] = useState<Card[]>([]);
  const [playerDeck, setPlayerDeck] = useState<Card[]>([]);
  const [playerScore, setPlayerScore] = useState<number>(0);
  const [dealerScore, setDealerScore] = useState<number>(0);

  const makePublicDeck = () => {
    const simbols = ["♠︎", "♣︎", "♥︎", "♦︎"];
    simbols.forEach((simbol) => {
      setPublicDeck((deck) => [
        ...deck,
        {
          id: deck.length,
          simbol: simbol,
          number: 11,
          isForward: false,
          string: "A",
        },
      ]);
      for (let i = 2; i < 11; i++) {
        setPublicDeck((deck) => [
          ...deck,
          { id: deck.length, simbol: simbol, number: i, isForward: false },
        ]);
      }
      setPublicDeck((deck) => [
        ...deck,
        {
          id: deck.length,
          simbol: simbol,
          number: 10,
          isForward: false,
          string: "J",
        },
      ]);
      setPublicDeck((deck) => [
        ...deck,
        {
          id: deck.length,
          simbol: simbol,
          number: 10,
          isForward: false,
          string: "Q",
        },
      ]);
      setPublicDeck((deck) => [
        ...deck,
        {
          id: deck.length,
          simbol: simbol,
          number: 10,
          isForward: false,
          string: "K",
        },
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
      if (who === "player") {
        setPlayerDeck((current) => [...current, card]);
      }
      if (who === "dealer") {
        setDealerDeck((current) => [...current, card]);
      }
    } else {
      selectCard(who, isForward);
    }
  };

  const countScore = (deck: Card[]) => {
    let score = 0;
    deck.forEach((card) => {
      score += card.number;
      if (card.number === 11 && score > 21) score -= 10;
    });
    return score;
  };

  const startGame = () => {
    setIsGameStart(true);
    selectCard("dealer", true);
    selectCard("player", true);
    selectCard("dealer", false);
    selectCard("player", true);
  };

  const restartGame = () => {
    setDealerDeck([]);
    setPlayerDeck([]);
    setIsWin(0);
    startGame();
  };

  const resetGame = () => {
    setDealerDeck([]);
    setPlayerDeck([]);
    setPublicDeck([]);
    setIsWin(0);
    makePublicDeck();
    setIsGameStart(false);
  };

  const hitCard = () => {
    selectCard("player", true);
  };

  const flipCard = () => {
    const copyArray = dealerDeck;
    const behindCardIndex = dealerDeck.findIndex(
      (card) => card.isForward === false
    );
    if (behindCardIndex != -1) copyArray[behindCardIndex].isForward = true;
    setDealerDeck(copyArray);
  };

  const dealerHit = () => {
    selectCard("dealer", true);
  };

  const dealerPlay = () => {
    if (dealerScore > playerScore) setIsWin(2);
    else {
      if (dealerScore < 16) {
        dealerHit();
        // } else if (dealerScore >= 16 && dealerScore <= 21) {
        //   playerStand();
      } else {
        if (dealerScore <= playerScore) setIsWin(1);
      }
    }
  };

  const playerStand = () => {
    flipCard();
    dealerPlay();
  };

  useEffect(() => {
    makePublicDeck();
  }, []);

  useEffect(() => {
    setDealerScore(countScore(dealerDeck));
  }, [dealerDeck]);

  useEffect(() => {
    setPlayerScore(countScore(playerDeck));
  }, [playerDeck]);

  useEffect(() => {
    if (playerScore > 21) {
      flipCard();
      setIsWin(2);
    }
  }, [playerScore]);

  useEffect(() => {
    if (dealerDeck.length > 0) {
      if (dealerScore > 21) setIsWin(1);
      else if (dealerDeck.length > 2) dealerPlay();
    }
  }, [dealerScore]);

  return (
    <Container>
      <Title>Blackjack</Title>
      <PublicDeck
        onClick={() => {
          console.log(publicDeck);
        }}
      >
        public deck
        <br />
        count:{publicDeck.length}
      </PublicDeck>

      {isGameStart && (
        <>
          <DeckArea
            name='dealer'
            deck={dealerDeck}
            score={dealerScore}
            isWin={isWin}
          />
          <DeckArea name='player' deck={playerDeck} score={playerScore} />
        </>
      )}
      <CommandArea>
        {isGameStart ? (
          <>
            {isWin === 0 && (
              <>
                <Command onClick={hitCard}>hit</Command>
                <Command onClick={playerStand}>stand</Command>
                <Command onClick={resetGame}>reset</Command>
              </>
            )}
            {isWin > 0 && (
              <>
                <WinOrLose>
                  {isWin === 1 && "Win!"}
                  {isWin === 2 && "Lose..."}
                </WinOrLose>
                {publicDeck.length > 6 && (
                  <Command onClick={restartGame}>restart</Command>
                )}
                <Command onClick={resetGame}>reset</Command>
              </>
            )}
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

const PublicDeck = styled.div`
  width: 64px;
  height: 89px;
  border-radius: 3px;
  background-color: white;
`;

const CommandArea = styled.div`
  display: flex;
  margin: 10px;
`;

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

const WinOrLose = styled.div`
  color: white;
`;
