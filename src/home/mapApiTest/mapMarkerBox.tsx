import { useState } from "react";
import { CustomOverlayMap, MapMarker, MapProps } from "react-kakao-maps-sdk";
import styled from "styled-components";

interface MapMarkerBoxProps {
  location?: MapProps;
  searchData?: kakao.maps.services.PlacesSearchResultItem;
  type?: string;
}
const MapMarkerBox = ({ location, searchData, type }: MapMarkerBoxProps) => {
  const [isInfoWindowOpen, setIsWindowOpen] = useState<boolean>(false);
  if (location) return <MapMarker position={location.center}>{type}</MapMarker>;
  if (searchData) {
    const searchPosition = {
      lng: parseFloat(searchData.x),
      lat: parseFloat(searchData.y),
    };
    return (
      <MapMarker
        position={searchPosition}
        onClick={() => {
          setIsWindowOpen((current) => !current);
        }}
      >
        {isInfoWindowOpen && (
          <CustomInfoWindow position={searchPosition}>
            {searchData.place_name}
          </CustomInfoWindow>
        )}
      </MapMarker>
    );
  }
  return <></>;
};

export default MapMarkerBox;

const CustomInfoWindow = styled(CustomOverlayMap)`
  border-radius: 5px;
`;
