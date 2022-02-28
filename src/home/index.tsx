import styled, { createGlobalStyle } from "styled-components";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Container>
        <div>
          <Link to="/dodan9.io/room">room</Link>
        </div>
        <div>
          <Link to="/dodan9.io/drag_n_drop">drag & drop</Link>
        </div>
      </Container>
    </>
  );
}

export default Home;

const Container = styled.div`
  position: relative;
`;
