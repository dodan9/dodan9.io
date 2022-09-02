import React, { useEffect, useState } from "react";
import { InputBox } from ".";

const MinutesToHours = () => {
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
    <section>
      <h3>Time Converter</h3>
      <InputBox>
        <label htmlFor='minutes'>Minutes</label>
        <input
          id='minutes'
          placeholder='minutes'
          type='number'
          value={flipped ? (amount ? amount * 60 : "") : amount}
          onChange={onAmountChange}
          disabled={flipped}
        />
      </InputBox>

      <InputBox>
        <label htmlFor='hours'>Hours</label>
        <input
          id='hours'
          placeholder='hours'
          type='number'
          value={flipped ? amount : amount ? amount / 60 : ""}
          onChange={onAmountChange}
          disabled={!flipped}
        />
      </InputBox>

      <button onClick={reset}>reset</button>
      <button onClick={onFlip}>
        {flipped ? "Minutes to Hours" : "Hours to Minutes"}
      </button>
    </section>
  );
};

export default MinutesToHours;
