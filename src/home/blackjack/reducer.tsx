import { Card } from ".";

interface ActionType {
  type: string;
  randomNum?: number;
  initialDeck?: Card[];
}

const reducer = (state: any, action: ActionType) => {
  switch (action.type) {
    case "RESET":
      return action.initialDeck;
    case "SELECT":
      return [...state.filter((value: Card) => value.id !== action.randomNum)];
    default:
      return state;
  }
};
export default reducer;
