import { BrowserRouter } from "react-router-dom";
import { GlobalStyle } from "./styles/globalStyle";
import MainRoutes from "./routes";

function App() {
  return (
    <BrowserRouter basename="/dodan9.io">
      <GlobalStyle />
      <MainRoutes />
    </BrowserRouter>
  );
}

export default App;
