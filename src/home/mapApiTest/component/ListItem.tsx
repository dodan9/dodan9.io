import styled from "styled-components";

const ListItem = ({
  data,
}: {
  data: kakao.maps.services.PlacesSearchResultItem;
}) => {
  return (
    <>
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
    </>
  );
};

export default ListItem;

const PlaceName = styled.div`
  & span {
    font-size: smaller;
  }
`;

export const PlaceInfo = styled.div`
  font-size: smaller;
`;
