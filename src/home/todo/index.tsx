import React, { useState } from "react";
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
  const onMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value)
      setMinutes((minutes) => (minutes = parseFloat(e.target.value)));
    else setMinutes("");
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
        />
        <br />
        <label htmlFor="hours">Hours</label>
        <input
          id="hours"
          placeholder="hours"
          type="number"
          value={minutes ? minutes / 60 : ""}
          readOnly
        />
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
