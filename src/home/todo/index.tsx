import React, { ChangeEvent, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Counter from "./Counter";
import KmToMiles from "./KmToMiles";
import MinutesToHours from "./MinutesToHours";
import PropBtn from "./PropBtn";

const Todo = () => {
  const [selection, setSelection] = React.useState<string>("props");
  const onSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelection((selection) => (selection = e.target.value));
  };

  const [text, setText] = useState<string>("hi");
  const textChange = () => {
    setText((text) => (text = "bye"));
  };
  const MemoBtn = React.memo(PropBtn);
  return (
    <Container>
      <GlobalStyle />
      <select onChange={onSelect}>
        <option value='props'>props</option>
        <option value='Counter'>Counter</option>
        <option value='MinutesToHours'>Minutes & Hours</option>
        <option value='KmToMiles'>Km & Miles</option>
      </select>
      <hr />
      {selection === "props" ? (
        <>
          <PropBtn textChange={textChange} text={text} />
          <MemoBtn text='hello' />
        </>
      ) : null}
      {selection === "Counter" ? <Counter /> : null}
      {selection === "MinutesToHours" ? <MinutesToHours /> : null}
      {selection === "KmToMiles" ? <KmToMiles /> : null}
    </Container>
  );
};

export default Todo;

const GlobalStyle = createGlobalStyle`
  box-sizing: border-box;
  section{
    padding: 20px;
  }
  button{
    margin: 5px 5px 5px 0;
  }
`;

const Container = styled.div`
  padding: 20px;
`;

export const InputBox = styled.div`
  margin-bottom: 5px;
  & label {
    display: inline-block;
    width: 70px;
  }
`;
