import { createStore } from "redux";

export interface FavoritesState {
  favorite: kakao.maps.services.PlacesSearchResultItem;
  favoriteName: string;
  newName?: string;
}

interface FavoriteAction {
  type: string;
  payload: FavoritesState;
}

export const ADD = "ADD";
export const DELETE = "DELETE";
export const UPDATE = "UPDATE";

const FavoritesReducer = (
  state: FavoritesState[] = [],
  action: FavoriteAction
) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];

    case "DELETE":
      return [
        ...state.filter(
          (data) => data.favoriteName !== action.payload.favoriteName
        ),
      ];

    case "UPDATE":
      const updateIndex = state.findIndex(
        (data) => data.favoriteName === action.payload.favoriteName
      );
      if (action.payload.newName)
        state[updateIndex] = {
          favorite: action.payload.favorite,
          favoriteName: action.payload.newName,
        };
      return [...state];

    default:
      return state;
  }
};

const FavoritesStore = createStore(FavoritesReducer);

export default FavoritesStore;
