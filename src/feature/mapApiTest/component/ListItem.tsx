import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import FavoritesStore, { UPDATE } from "../store/store";
import { Modal, ModalContainer, PlaceInfo } from "../styles";

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
              id="name"
              value={saveName}
              onChange={(event) => {
                setSaveName(event.target.value);
              }}
              placeholder="수정할 이름"
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

const InfoBox = styled.div`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
