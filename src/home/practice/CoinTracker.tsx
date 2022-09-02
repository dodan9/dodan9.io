import { useEffect, useState } from "react";

const CoinTracker = () => {
  interface CoinDataType {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    quotes: {
      USD: {
        price: number;
      };
    };
  }

  const [loading, setLoading] = useState<boolean>(true);
  const [coinData, setCoinData] = useState<CoinDataType[]>([]);

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers?limit=10")
      .then((response) => response.json())
      .then((json) => {
        setCoinData(json);
        setLoading(false);
      });
  }, []);
  return (
    <section>
      <h3>Coins</h3>
      {loading ? <h4>loading...</h4> : null}
      <ul>
        {coinData.map((coin) => (
          <li key={coin.id}>
            {coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CoinTracker;
