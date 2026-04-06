import styled from "styled-components";

export const ModalContainer = styled.div`
  position: fixed;
  width: 900px;
  height: 600px;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.3);
`;
export const Modal = styled.div`
  position: absolute;
  width: 200px;
  height: 120px;
  margin: auto 0;
  right: 50px;
  top: 0;
  bottom: 0;
  background-color: white;
  padding: 5px;
  border: 1px solid black;
  & input {
    width: 160px;
  }
`;
export const PlaceInfo = styled.div`
  font-size: smaller;
`;
