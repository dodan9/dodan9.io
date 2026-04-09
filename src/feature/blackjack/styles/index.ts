import styled from "styled-components";
import { CARD_W, LIGHT_GREEN, LIGHT_TEXT, RADIUS } from "../constant";

export const CardBase = styled.div`
  position: relative;
  margin: 5px;
  width: ${CARD_W};
  aspect-ratio: 1 / 1.618;
  background-color: ${LIGHT_TEXT};
  display: flex;
  align-items: center;
  border: 5px solid ${LIGHT_GREEN};
  border-radius: ${RADIUS};
`;
