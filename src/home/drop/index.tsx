import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Container } from "./components/Container";
import { Custom } from "./components/Custom";

const Drop = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Container />
      <Custom />
    </DndProvider>
  );
};

export default Drop;
