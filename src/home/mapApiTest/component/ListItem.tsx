import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import FavoritesStore, { UPDATE } from "../store/store";

interface props {
  data: kakao.maps.services.PlacesSearchResultItem;
  name?: string;
}

const ListItem = ({ data, name }: props) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [saveName, setSaveName] = useState<string>("");

  const updateFavorite = () => {
    if (FavoritesStore.getState().find((e) => e.favoriteName === saveName)) {
      alert("이미 해당 이름의 즐겨찾기가 존재합니다.");
    } else {
      dispatch({
        type: UPDATE,
        payload: {
          favorite: data,
          favoriteName: name,
          newName: saveName,
        },
      });
    }
    setIsModalOpen(false);
    setSaveName("");
  };

  return (
    <>
      {name && (
        <PlaceName>
          {name}{" "}
          <ModalBtn
            onClick={(event) => {
              event.stopPropagation();
              setIsModalOpen(true);
            }}
          >
            수정
          </ModalBtn>
        </PlaceName>
      )}
      {isModalOpen && (
        <ModalContainer>
          <Modal onClick={(event) => event.stopPropagation()}>
            <input
              id='name'
              value={saveName}
              onChange={(event) => {
                setSaveName(event.target.value);
              }}
              placeholder='수정할 이름'
            />
            <ModalBtn onClick={updateFavorite}>수정</ModalBtn>
            <ModalBtn
              onClick={() => {
                setIsModalOpen(false);
                setSaveName("");
              }}
            >
              취소
            </ModalBtn>
          </Modal>
        </ModalContainer>
      )}
      <InfoBox>
        <PlaceName>
          {data.place_name} <span>{data.category_group_name}</span>
          <br />
          <span> {data.distance}m</span>
        </PlaceName>
        <div>
          <PlaceInfo>
            {data.address_name}
            <br />
            {data.road_address_name}
          </PlaceInfo>
        </div>
      </InfoBox>
    </>
  );
};

export default ListItem;

export const ModalContainer = styled.div`
  position: fixed;
  width: 900px;
  height: 600px;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.3);
`;
export const Modal = styled.div`
  position: absolute;
  width: 200px;
  height: 120px;
  margin: auto auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: white;
  padding: 5px;
  border: 1px solid black;
  & input {
    width: 160px;
  }
`;
const ModalBtn = styled.button`
  && {
    position: relative;
    right: 0;
    top: 0;
  }
`;

const PlaceName = styled.div`
  & span {
    font-size: smaller;
  }
`;

export const PlaceInfo = styled.div`
  font-size: smaller;
`;
const InfoBox = styled.div`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
