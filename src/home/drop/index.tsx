import { Link } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Container } from "./components/Container";
import { CustomDragLayer } from "./components/CustumDragLayer";

const Drop = () => {
  return (
    <div>
      <h1>Drop Test</h1>
      <Link to="/dodan9.io">to home</Link>
      <DndProvider backend={HTML5Backend}>
        <Container />
        <CustomDragLayer />
      </DndProvider>
    </div>
  );
};

export default Drop;
