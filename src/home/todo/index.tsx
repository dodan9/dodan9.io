import React, { ChangeEvent, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Counter from "./Counter";
import KmToMiles from "./KmToMiles";
import MinutesToHours from "./MinutesToHours";

const Todo = () => {
  const [selection, setSelection] = React.useState<string>("Counter");
  const onSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelection((selection) => (selection = e.target.value));
  };
  return (
    <Container>
      <GlobalStyle />

      <select onChange={onSelect}>
        <option value='Counter'>Counter</option>
        <option value='MinutesToHours'>Minutes & Hours</option>
        <option value='KmToMiles'>Km & Miles</option>
      </select>

      <hr />

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
