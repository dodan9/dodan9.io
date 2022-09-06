import React, { ChangeEvent, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import CoinTracker from "./CoinTracker";
import Counter from "./Counter";
import KmToMiles from "./KmToMiles";
import MinutesToHours from "./MinutesToHours";
import Movies from "./Movies";
import Props from "./Props";
import ToDo from "./ToDo";

const Practice = () => {
  const [selection, setSelection] = useState<string>("Movies");
  const onSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelection((selection) => (selection = e.target.value));
  };

  return (
    <Container>
      <GlobalStyle />
      <select onChange={onSelect}>
        <option value='movies'>Movie</option>
        <option value='ToDo'>To Do</option>
        <option value='CoinTracker'>Coin Tracker</option>
        <option value='Props'>Props</option>
        <option value='Counter'>Counter</option>
        <option value='MinutesToHours'>Minutes & Hours</option>
        <option value='KmToMiles'>Km & Miles</option>
      </select>
      <hr />
      {selection === "Movies" ? <Movies /> : null}
      {selection === "ToDo" ? <ToDo /> : null}
      {selection === "CoinTracker" ? <CoinTracker /> : null}
      {selection === "Props" ? <Props /> : null}
      {selection === "Counter" ? <Counter /> : null}
      {selection === "MinutesToHours" ? <MinutesToHours /> : null}
      {selection === "KmToMiles" ? <KmToMiles /> : null}
    </Container>
  );
};

export default Practice;

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
