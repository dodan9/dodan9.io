import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLocationApi } from "./api";
import MeetModal from "./MeetModal";

interface locationType {
  areas: [
    {
      name: string;
      url: string;
    }
  ];
  name: string;
}

const Location = () => {
  const { location } = useParams();
  const [locationData, setLocationData] = useState<locationType>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalUrl, setModalUrl] = useState<string>("");

  const callApi = async () => {
    const response = await getLocationApi(location as string);
    setLocationData(response.data);
  };
  const openMeetModal = (url: string) => {
    setIsModalOpen(true);
    setModalUrl(url);
  };

  useEffect(() => {
    callApi();
  }, []);
  return (
    <div>
      <h2>{locationData?.name}</h2>
      <ul>
        {locationData?.areas.map((area, index) => {
          return (
            <li key={index}>
              <button
                onClick={() => {
                  openMeetModal(area.url);
                }}
              >
                {area.name}
              </button>
            </li>
          );
        })}
      </ul>
      {isModalOpen ? (
        <MeetModal url={modalUrl} closeFunction={setIsModalOpen} />
      ) : null}
    </div>
  );
};

export default Location;