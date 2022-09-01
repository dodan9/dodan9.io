import { useState } from "react";
import PropBtn from "./PropBtn";

const Props = () => {
  const [isRender, setIsRender] = useState<boolean>(false);
  const [text, setText] = useState<string>("hi");
  const textChange = () => {
    setText((text) => (text = "bye"));
  };
  return (
    <>
      <button
        onClick={() => {
          setIsRender((isRender) => !isRender);
        }}
      >
        {isRender ? "show" : "hide"}
      </button>
      <PropBtn textChange={textChange} text={text} />

      {isRender ? <PropBtn text='hello' /> : null}
    </>
  );
};

export default Props;
