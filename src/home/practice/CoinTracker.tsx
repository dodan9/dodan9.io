import axios from "axios";
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

  const getApi = axios({
    url: "https://api.coinpaprika.com/v1/tickers?limit=10",
    method: "get",
  }).then((response) => {
    setCoinData(response.data);
    setLoading(false);
  });

  const callApi = async () => {
    try {
      await getApi;
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  };
  useEffect(() => {
    callApi();
    console.log("call api");
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
