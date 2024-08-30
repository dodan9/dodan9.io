import { useEffect, useRef, useState } from "react";
import { Map, MapProps } from "react-kakao-maps-sdk";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import MapMarkerBox from "./MapMarkerBox";
import FavoritesStore, { DELETE } from "../store/store";
import SelectedPlace from "./SelectedPlace";
import ListItem from "./ListItem";

const MapComponent = () => {
  const dispatch = useDispatch();

  const mapRef = useRef<kakao.maps.Map>(null);
  const startLocation = {
    center: { lat: 37.54457800768649, lng: 127.05605793868045 },
  };
  const [currentLocation, setCurrentLocation] =
    useState<MapProps>(startLocation);
  const [geoLocation, setGeoLocation] = useState<MapProps>(startLocation);
  const [clickLocation, setClickLocation] = useState<MapProps | null>();

  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [searchData, setSearchData] =
    useState<kakao.maps.services.PlacesSearchResult>([]);
  const [selectedPlace, setSelectedPlace] =
    useState<kakao.maps.services.PlacesSearchResultItem>();

  const [mapType, setMapType] = useState<kakao.maps.MapTypeId>(1);
  const [mapLevel, setMapLevel] = useState<number>(3);

  const [isFavoriteOpen, setIsFavoriteOpen] = useState<boolean>(false);
  const favoriteState = useSelector(() => FavoritesStore.getState());
  const [favoriteMarkerData, setFavoriteMarkerData] =
    useState<kakao.maps.services.PlacesSearchResultItem>();

  //사용자의 현재 휘치를 가져오는 함수
  const getCurrentGeoLocation = () => {
    navigator.geolocation.getCurrentPosition(
      //success callback
      (position) => {
        const loction = {
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        };
        setGeoLocation(loction);
        setCurrentLocation(loction);
      },
      //error callback
      () => {
        setGeoLocation(startLocation);
        setCurrentLocation(startLocation);
      }
    );
  };

  //클릭한 좌표 저장
  const onClickMap = (mouseEvent: kakao.maps.event.MouseEvent) => {
    const clickPoint = {
      center: {
        lat: mouseEvent.latLng.getLat(),
        lng: mouseEvent.latLng.getLng(),
      },
    };
    setClickLocation(clickPoint);
  };

  //키워드 검색 함수
  const onSearch = (searchLocation: MapProps) => {
    if (searchKeyword && "lat" in searchLocation.center) {
      const ps = new kakao.maps.services.Places();

      // 현재 위치 기반 검색
      const searchOptionLocation = new kakao.maps.LatLng(
        searchLocation.center.lat,
        searchLocation.center.lng
      );
      const searchOption: kakao.maps.services.PlacesSearchOptions = {
        location: searchOptionLocation,
        // radius: 5000,
      };

      ps.keywordSearch(
        searchKeyword,
        (data, status, _pagination) => {
          if (status === kakao.maps.services.Status.OK) {
            //거리순으로 정렬
            const searchDataList = data.sort((a, b) => {
              return parseFloat(a.distance) - parseFloat(b.distance);
            });
            //검색 결과 기반으로 지도 위치 변경
            const bounds = new kakao.maps.LatLngBounds();
            data.map((place) => {
              bounds.extend(
                new kakao.maps.LatLng(parseFloat(place.y), parseFloat(place.x))
              );
            });
            setSearchData(searchDataList);
            const map = mapRef.current;
            if (map) map.setBounds(bounds);
          } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
            alert("검색 결과가 존재하지 않습니다.");
            return;
          } else if (status === kakao.maps.services.Status.ERROR) {
            alert("검색 결과 중 오류가 발생했습니다.");
            return;
          }
        },
        searchOption
      );
    }
  };

  useEffect(() => {
    if (searchData) setSelectedPlace(searchData[0]);
  }, [searchData]);

  useEffect(() => {
    getCurrentGeoLocation();
  }, []);

  return (
    <Container>
      <MapContainer>
        <Map
          center={currentLocation.center}
          style={{ width: "600px", height: "600px" }}
          onClick={(map, mouseEvent) => onClickMap(mouseEvent)}
          mapTypeId={mapType}
          level={mapLevel}
          isPanto={true}
          onZoomChanged={(map) => setMapLevel(map.getLevel())}
          onDragEnd={(map) =>
            setCurrentLocation({
              center: {
                lat: map.getCenter().getLat(),
                lng: map.getCenter().getLng(),
              },
            })
          }
          ref={mapRef}
        >
          {clickLocation && (
            <MapMarkerBox
              location={clickLocation}
              type={"click"}
              close={() => setClickLocation(null)}
            />
          )}
          {geoLocation && <MapMarkerBox location={geoLocation} type={"geo"} />}
          {searchData &&
            searchData.map((data) => {
              return (
                <MapMarkerBox
                  key={data.id}
                  markerData={data}
                  setSelectedPlace={setSelectedPlace}
                  type={"search"}
                  // isSelected={data.address_name === selectedPlace?.address_name}
                />
              );
            })}
          {favoriteMarkerData && (
            <MapMarkerBox markerData={favoriteMarkerData} type={"favorite"} />
          )}
        </Map>

        <MapTypeController>
          <button onClick={() => setMapType(1)}>지도</button>
          <button onClick={() => setMapType(2)}>스카이뷰</button>{" "}
          <button onClick={() => setCurrentLocation(geoLocation)}>
            현재 위치로
          </button>
          <button onClick={() => getCurrentGeoLocation()}>
            현재 위치 다시 가져오기
          </button>
        </MapTypeController>

        <MapLevelController>
          <div onClick={() => setMapLevel((currentLevel) => currentLevel - 1)}>
            <img
              src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_plus.png"
              alt="확대"
            />
          </div>
          <div onClick={() => setMapLevel((currentLevel) => currentLevel + 1)}>
            <img
              src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_minus.png"
              alt="축소"
            />
          </div>
        </MapLevelController>
      </MapContainer>

      <SearchBox>
        <SearchBar>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              onSearch(geoLocation);
              setIsFavoriteOpen(false);
            }}
          >
            <input
              value={searchKeyword}
              onChange={(event) => {
                setSearchKeyword(event.target.value);
              }}
            />
            <button
              onClick={() => {
                onSearch(geoLocation);
                setIsFavoriteOpen(false);
              }}
            >
              🔎
            </button>
          </form>
          <div>
            <button
              onClick={() => {
                setIsFavoriteOpen((current) => !current);
              }}
            >
              즐겨찾기 {isFavoriteOpen ? "닫기" : "열기"}
            </button>
            <button onClick={() => onSearch(currentLocation)}>
              현재 지도 중심으로 검색하기
            </button>
          </div>
        </SearchBar>

        {isFavoriteOpen && (
          <FavoriteList>
            {favoriteState.length ? (
              favoriteState.map((favorite) => (
                <FavoriteItemBox key={favorite.favoriteName}>
                  <FavoriteItem
                    onClick={() => {
                      setFavoriteMarkerData(favorite.favorite);
                      setCurrentLocation({
                        center: {
                          lat: parseFloat(favorite.favorite.y),
                          lng: parseFloat(favorite.favorite.x),
                        },
                      });
                      setMapLevel(3);
                    }}
                  >
                    <ListItem
                      data={favorite.favorite}
                      name={favorite.favoriteName}
                    />
                  </FavoriteItem>
                  <button
                    onClick={() => {
                      dispatch({
                        type: DELETE,
                        payload: {
                          favorite: favorite.favorite,
                          favoriteName: favorite.favoriteName,
                        },
                      });
                    }}
                  >
                    삭제하기
                  </button>
                </FavoriteItemBox>
              ))
            ) : (
              <div>즐겨찾기에 추가한 장소가 없습니다.</div>
            )}
          </FavoriteList>
        )}

        {searchData && !isFavoriteOpen && (
          <>
            {selectedPlace && <SelectedPlace selectedPlace={selectedPlace} />}

            <SearchList>
              {searchData.map((data) => {
                return (
                  <SearchItem
                    key={data.id}
                    onClick={() => {
                      setSelectedPlace(data);
                      setCurrentLocation({
                        center: {
                          lat: parseFloat(data.y),
                          lng: parseFloat(data.x),
                        },
                      });
                      setMapLevel(2);
                    }}
                  >
                    <ListItem data={data} />
                  </SearchItem>
                );
              })}
            </SearchList>
          </>
        )}
      </SearchBox>
    </Container>
  );
};

export default MapComponent;

const Container = styled.div`
  position: relative;
  width: 900px;
  display: flex;
`;

const MapContainer = styled.div`
  position: relative;
  width: 600px;
`;
const MapTypeController = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 11;
`;
const MapLevelController = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 10;
  background-color: white;
  width: fit-content;
  border-radius: 5px;
  border: 1px solid black;
  & img {
    width: 20px;
  }
  & div {
    height: 20px;
    padding: 10px;
    cursor: pointer;
  }
  & div:first-child {
    border-bottom: 1px solid black;
  }
`;

const SearchBox = styled.div`
  box-sizing: border-box;
  width: 300px;
  height: 600px;
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: beige;
`;

const SearchBar = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 285px;
  height: 80px;
  background-color: beige;
  padding: 5px;
  & form {
    box-sizing: border-box;
    border: 1px solid black;
    height: fit-content;
    display: flex;
    border-radius: 3px;
    & button {
      padding: 0;
      text-align: center;
      width: 40px;
      height: 40px;
      box-sizing: border-box;
      border: none;
      background-color: white;
      color: gray;
      cursor: pointer;
    }
    & input {
      box-sizing: border-box;
      width: 235px;
      height: 40px;
      font-size: 16px;
      padding: 4px;
      border: none;
      outline: none;
      color: #555;
    }
    & input:focus {
      color: black;
    }
  }
  & div {
    margin-top: 5px;
    display: flex;
    justify-content: space-between;
  }
`;

const SearchList = styled.div`
  padding: 5px;
`;
const SearchItem = styled.div`
  padding: 5px;
  border-bottom: 1px solid black;
  &:last-child {
    border: none;
  }
`;

const FavoriteList = styled.div`
  position: relative;
  padding: 5px;
`;

const FavoriteItemBox = styled.div`
  position: relative;
  & button {
    position: absolute;
    right: 5px;
    bottom: 5px;
  }
`;
const FavoriteItem = styled(SearchItem)``;
