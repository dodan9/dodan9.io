import styled from "styled-components";

interface propType {
  state: string;
  setShowAlert: (s: string) => void;
}
const Alert = ({ state, setShowAlert }: propType) => {
  return (
    <MessageBox state={state}>
      <span>
        {state === "run" ? "pokemon is run..." : null}
        {state === "catch" ? "catch pokemon!" : null}
      </span>
      <button
        onClick={() => {
          setShowAlert("");
        }}
      >
        x
      </button>
    </MessageBox>
  );
};

export default Alert;

const MessageBox = styled.p<{ state: string }>`
  box-sizing: border-box;
  position: absolute;
  color: white;
  background-color: ${(props) => (props.state === "run" ? "orange" : "green")};
  width: 200px;
  padding: 10px;
  top: 20px;
  right: 20px;
  border-radius: 5px;
  & span {
    margin-top: 2px;
    display: block;
    float: left;
  }
  & button {
    display: block;
    float: right;
  }
`;
