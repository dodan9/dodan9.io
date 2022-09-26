import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import FavoritesStore, { ADD } from "../store/store";
import { Modal, PlaceInfo } from "./ListItem";

interface props {
  selectedPlace: kakao.maps.services.PlacesSearchResultItem;
}

const SelectedPlace = ({ selectedPlace }: props) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [saveName, setSaveName] = useState<string>(selectedPlace.place_name);
  const addFavorite = () => {
    if (FavoritesStore.getState().find((e) => e.favoriteName === saveName)) {
      alert("이미 해당 이름의 즐겨찾기가 존재합니다.");
    } else {
      dispatch({
        type: ADD,
        payload: {
          favorite: selectedPlace,
          favoriteName: saveName,
        },
      });
    }
    setIsModalOpen(false);
    alert("추가되었습니다.");
  };

  useEffect(() => {
    setIsModalOpen(false);
  }, [selectedPlace]);
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
          setIsModalOpen(true);
        }}
      >
        즐겨찾기에 추가
      </button>
      {isModalOpen && (
        <Modal>
          <label htmlFor='name'>이름</label>
          <input
            id='name'
            value={saveName}
            onChange={(event) => {
              setSaveName(event.target.value);
            }}
            placeholder='즐겨찾기에 저장할 이름'
          />
          <button onClick={addFavorite}>추가</button>
          <button
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            닫기
          </button>
        </Modal>
      )}
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
