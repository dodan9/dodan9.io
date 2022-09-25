import { createStore } from "redux";

interface FavoritesState {
  favorite: kakao.maps.services.PlacesSearchResultItem;
  favoriteName: string;
}

interface FavoriteAction {
  type: string;
  payload?: any;
}

export const ADD = "ADD";
export const DELETE = "DELETE";

const FavoritesReducer = (
  state: FavoritesState[] = [],
  action: FavoriteAction
) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];

    case "DELETE":
      return state.filter((data) => data !== action.payload);

    default:
      return state;
  }
};

const FavoritesStore = createStore(FavoritesReducer);

export default FavoritesStore;
