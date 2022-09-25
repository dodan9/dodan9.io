import { useDispatch } from "react-redux";
import styled from "styled-components";
import { ADD } from "../store/store";
import { PlaceInfo } from "./ListItem";

interface props {
  selectedPlace: kakao.maps.services.PlacesSearchResultItem;
}

const SelectedPlace = ({ selectedPlace }: props) => {
  const dispatch = useDispatch();

  return (
    <Container>
      {selectedPlace.place_name} <span>{selectedPlace.distance}m</span>
      <PlaceInfo>
        {" "}
        {selectedPlace.category_name}
        <br />
        {selectedPlace.address_name}
        <br />
        {selectedPlace.road_address_name}
        {selectedPlace.phone}
      </PlaceInfo>
      <br />
      <button
        onClick={() => {
          dispatch({
            type: ADD,
            payload: {
              favorite: selectedPlace,
              favoriteName: "즐겨찾기",
            },
          });
        }}
      >
        즐겨찾기에 추가
      </button>
    </Container>
  );
};

export default SelectedPlace;

const Container = styled.div`
  box-sizing: border-box;
  width: 275px;
  height: 150px;
  border: 1px solid black;
  margin-top: 35px;
  background-color: white;
  padding: 10px;
`;
