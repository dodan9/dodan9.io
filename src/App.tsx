import { BrowserRouter } from "react-router-dom";
import { GlobalStyle } from "./styles/globalStyle";
import MainRoutes from "./routes";

function App() {
  return (
    <BrowserRouter basename="/">
      <GlobalStyle />
      <MainRoutes />
    </BrowserRouter>
  );
}

export default App;
