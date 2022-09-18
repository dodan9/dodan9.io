import { useEffect, useState } from "react";
import { getTypeApi } from "./api";

interface typeColorInterface {
  name: string;
  color: string;
}
const useTypeColor = () => {
  const [typeColor, setTypeColor] = useState<typeColorInterface[]>([]);

  const callApi = async () => {
    const response = (await getTypeApi()).data.results;
    response.map((item: typeColorInterface) => {
      switch (item.name) {
        case "normal":
          item.color = "#A9A878";
          break;
        case "fighting":
          item.color = "#C02F27";
          break;
        case "flying":
          item.color = "#A990F1";
          break;
        case "poison":
          item.color = "#A03FA1";
          break;
        case "ground":
          item.color = "#E2C168";
          break;
        case "rock":
          item.color = "#B89F38";
          break;
        case "bug":
          item.color = "#A8B820";
          break;
        case "ghost":
          item.color = "#6D529E";
          break;
        case "steel":
          item.color = "#B8B8D0";
          break;
        case "fire":
          item.color = "#F17F2E";
          break;
        case "water":
          item.color = "#6890F0";
          break;
        case "grass":
          item.color = "#78C850";
          break;
        case "electric":
          item.color = "#F9D130";
          break;
        case "psychic":
          item.color = "#FF558B";
          break;
        case "ice":
          item.color = "#98D9D9";
          break;
        case "dragon":
          item.color = "#7035FF";
          break;
        case "dark":
          item.color = "#6F5747";
          break;
        case "fairy":
          item.color = "#F288EB";
          break;
        default:
          item.color = "#fff";
      }
    });

    setTypeColor(response);
  };
  useEffect(() => {
    callApi();
  }, []);

  return { typeColor };
};

export default useTypeColor;
