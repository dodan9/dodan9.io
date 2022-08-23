import styled from "styled-components";

interface PropExampleProp {
  text: string;
}

const PropExample = ({ text }: PropExampleProp) => {
  return <Text>{text}</Text>;
};

const Text = styled.button`
  background-color: gray;
  color: white;
  padding: 10px 20px;
  border: 0;
  border-radius: 5px;
`;

export default PropExample;
