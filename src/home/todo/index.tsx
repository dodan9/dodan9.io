import { useState } from "react";

const Todo = () => {
  const [count, setCount] = useState<number>(0);
  const upCount = () => {
    setCount((count) => count + 1);
  };
  return (
    <div>
      <button onClick={upCount}>click</button>
      <span>{count}</span>
    </div>
  );
};

export default Todo;
