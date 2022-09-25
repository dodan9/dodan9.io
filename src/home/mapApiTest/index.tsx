import { Provider } from "react-redux";
import { createGlobalStyle } from "styled-components";
import MapComponent from "./mapComponent";
import FavoritesStore from "./store";

const MapApiTest = () => {
  return (
    <>
      <GlobalStyle />
      <Provider store={FavoritesStore}>
        <MapComponent />
      </Provider>
    </>
  );
};

export default MapApiTest;

const GlobalStyle = createGlobalStyle`
  *{font-family: sans-serif;}
`;
