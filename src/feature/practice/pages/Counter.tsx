import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState<number>(0);
  const upCount = () => {
    setCount((count) => count + 1);
  };
  const downCount = () => {
    setCount((count) => count - 1);
  };
  return (
    <section>
      <span>{count}</span>
      <button onClick={upCount}>count up</button>
      <button onClick={downCount}>count down</button>
    </section>
  );
};

export default Counter;
