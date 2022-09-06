import styled from "styled-components";

interface propType {
  state: string;
  setShowAlert: (s: string) => void;
}
const Alert = ({ state, setShowAlert }: propType) => {
  return (
    <MessageBox state={state}>
      {state === "run" ? "pokemon is run..." : null}
      {state === "catch" ? "catch pokemon!" : null}
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

const MessageBox = styled.div<{ state: string }>`
  position: absolute;
  background-color: ${(props) => (props.state === "run" ? "orange" : "green")};
  width: 100%;
  height: 50px;
  top: calc(50% - 50%);
  left: calc(50% - 25px);
`;
