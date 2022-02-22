import React from "react";
import Room from "./room";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Container>
      <div>
        <Link to="/dodan9.io/room">room</Link>
      </div>
      <div>
        <Link to="/dodan9.io/drop">drop</Link>
      </div>
    </Container>
  );
}

export default Home;

const Container = styled.div`
  position: relative;
`;
