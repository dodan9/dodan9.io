import styled from "styled-components";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Container>
        <h1>&lt;Dodan9&gt;</h1>
        <div>
          <h2>
            <Link to='/dodan9.io/drag_n_drop2'>&lt;Drag & drop 2 /&gt;</Link>
          </h2>
          <h2>
            <Link to='/dodan9.io/mapapitest/'>&lt;Map /&gt;</Link>
          </h2>
          <h2>
            {/* <Link to='/dodan9.io/pokemon'>&lt;Pokemon /&gt;</Link> */}
          </h2>
          <h2>
            <Link to='/dodan9.io/pokemon2/'>&lt;Pokemon /&gt;</Link>
          </h2>
          <h2>
            <Link to='/dodan9.io/room'>&lt;Room /&gt;</Link>
          </h2>
          <h2>
            <Link to='/dodan9.io/drag_n_drop'>&lt;Drag & drop /&gt;</Link>
          </h2>
          <h2>{/* <Link to="/dodan9.io/mix">&lt;Mix /&gt;</Link> */}</h2>
          <h2>
            <Link to='/dodan9.io/canvas'>&lt;Canvas /&gt;</Link>
          </h2>
          <h2>
            <Link to='/dodan9.io/practice'>&lt;Practice /&gt;</Link>
          </h2>
        </div>
        <h1>&lt;/Dodan9&gt;</h1>
      </Container>
    </>
  );
}

export default Home;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: calc(100vw - 40px);
  height: calc(100vh - 40px);
  background-color: black;
  padding: 20px;
  text-align: center;
  color: white;
  & a {
    color: white;
  }
  & a:hover {
    color: lightsteelblue;
  }
  & h1 {
    font-size: 45px;
    margin: 40px 0;
  }
  & h2 {
    font-size: 30px;
  }
`;
