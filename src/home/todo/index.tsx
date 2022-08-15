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

  const [minutes, setMinutes] = useState<number | "">("");
  const [hours, setHours] = useState<number | "">("");

  const reset = () => {
    setMinutes("");
    setHours("");
  };

  const onMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value)
      setMinutes((minutes) => (minutes = parseFloat(e.target.value)));
    else reset();
  };
  const onHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value)
      setHours((minutes) => (minutes = parseFloat(e.target.value)));
    else reset();
  };
  useEffect(() => {
    if (minutes) setHours((hours) => (hours = minutes / 60));
  }, [minutes]);
  useEffect(() => {
    if (hours) setMinutes((minutes) => (minutes = hours * 60));
  }, [hours]);

  const [flipped, setFlipped] = useState<boolean>(false);
  const onFlip = () => {
    setFlipped((flipped) => (flipped = !flipped));
    console.log(flipped);
  };

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
          value={minutes}
          onChange={onMinuteChange}
          disabled={flipped}
        />
        <br />
        <label htmlFor="hours">Hours</label>
        <input
          id="hours"
          placeholder="hours"
          type="number"
          value={hours}
          onChange={onHourChange}
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
