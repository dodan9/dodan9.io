import React, { useEffect, useState } from "react";
import { createGlobalStyle } from "styled-components";

const Todo = () => {
  const [count, setCount] = useState<number>(0);
  const upCount = () => {
    setCount((count) => count + 1);
  };
  const downCount = () => {
    setCount((count) => count - 1);
  };

  const [amount, setAmount] = useState<number | "">("");

  const reset = () => {
    setAmount("");
  };

  const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value)
      setAmount((amounts) => (amounts = parseFloat(e.target.value)));
    else reset();
  };

  const [flipped, setFlipped] = useState<boolean>(false);
  const onFlip = () => {
    setFlipped((flipped) => (flipped = !flipped));
  };

  useEffect(() => {
    if (amount) {
      if (flipped) {
        setAmount((amount) => (amount ? (amount = amount / 60) : 0));
      } else {
        setAmount((amount) => (amount ? (amount = amount * 60) : 0));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flipped]);

  return (
    <div>
      <GlobalStyle />

      <section>
        <button onClick={upCount}>count up</button>
        <button onClick={downCount}>count down</button>
        <span>{count}</span>
      </section>

      <section>
        <h3>Converter</h3>
        <label htmlFor="minutes">Minutes</label>
        <input
          id="minutes"
          placeholder="minutes"
          type="number"
          value={flipped ? (amount ? amount * 60 : "") : amount}
          onChange={onAmountChange}
          disabled={flipped}
        />
        <br />
        <label htmlFor="hours">Hours</label>
        <input
          id="hours"
          placeholder="hours"
          type="number"
          value={flipped ? amount : amount ? amount / 60 : ""}
          onChange={onAmountChange}
          disabled={!flipped}
        />
        <br />
        <button onClick={reset}>reset</button>
        <button onClick={onFlip}>flip</button>
      </section>
    </div>
  );
};

export default Todo;

const GlobalStyle = createGlobalStyle`
box-sizing: border-box;
section{
  padding: 40px;
}
`;
