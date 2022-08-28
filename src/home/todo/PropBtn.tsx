import { useEffect } from "react";
import styled from "styled-components";

interface PropBtnProp {
  text: string;
  textChange?: () => void;
}

const PropBtn = ({ text, textChange }: PropBtnProp) => {
  useEffect(() => {
    console.log(`${text} render`);
  }, []);

  return (
    <>
      <Text onClick={textChange}>{text}</Text>
    </>
  );
};

const Text = styled.button`
  background-color: gray;
  color: white;
  padding: 10px 20px;
  border: 0;
  border-radius: 5px;
`;

export default PropBtn;
