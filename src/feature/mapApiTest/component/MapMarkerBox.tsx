import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useEffectEvent,
  useState,
} from "react";
import { MapMarker, type MapProps } from "react-kakao-maps-sdk";
import styled from "styled-components";

interface MapMarkerBoxProps {
  location?: MapProps;
  markerData?: kakao.maps.services.PlacesSearchResultItem;
  type: string;
  setSelectedPlace?: Dispatch<
    SetStateAction<kakao.maps.services.PlacesSearchResultItem | undefined>
  >;
  close?: () => void;
  // isSelected?: boolean;
}
const MapMarkerBox = ({
  location,
  markerData,
  type,
  setSelectedPlace,
  close,
}: // isSelected,
MapMarkerBoxProps) => {
  const [isInfoWindowOpen, setIsWindowOpen] = useState<boolean>(false);

  const init = useEffectEvent(() => {
    if (type === "favorite") setIsWindowOpen(true);
  });
  useEffect(() => {
    init();
    // if (isSelected) setIsWindowOpen(true);
  }, []);

  if (location) {
    switch (type) {
      case "click":
        return (
          <MapMarker position={location.center} onClick={close}>
            <InfoWindow>클릭한 지점입니다.</InfoWindow>
          </MapMarker>
        );
      case "geo":
        return (
          <MapMarker position={location.center}>
            <InfoWindow>현재 위치입니다.</InfoWindow>
          </MapMarker>
        );
    }
  } else if (markerData) {
    switch (type) {
      case "search": {
        const searchPosition = {
          lng: parseFloat(markerData.x),
          lat: parseFloat(markerData.y),
        };
        const onClickMaker = () => {
          setIsWindowOpen((current) => !current);
          if (setSelectedPlace) setSelectedPlace(markerData);
        };
        return (
          <MapMarker position={searchPosition} onClick={onClickMaker}>
            {isInfoWindowOpen && (
              <InfoWindow>{markerData.place_name}</InfoWindow>
            )}
          </MapMarker>
        );
      }

      case "favorite": {
        const favoritePosition = {
          lng: parseFloat(markerData.x),
          lat: parseFloat(markerData.y),
        };

        return (
          <MapMarker
            position={favoritePosition}
            onClick={() => {
              setIsWindowOpen((current) => !current);
            }}
          >
            {isInfoWindowOpen && (
              <InfoWindow>{markerData.place_name}</InfoWindow>
            )}
          </MapMarker>
        );
      }
    }
  }

  return <></>;
};

export default MapMarkerBox;

const InfoWindow = styled.div`
  padding: 5px;
`;
