import { Dispatch, SetStateAction } from "react";

interface propsType {
  url: string;
  closeFunction: Dispatch<SetStateAction<boolean>>;
}

const MeetModal = ({ url, closeFunction }: propsType) => {
  console.log("open");
  return (
    <>
      <div>Modal</div>
      <button
        onClick={() => {
          closeFunction(false);
        }}
      >
        close
      </button>
    </>
  );
};

export default MeetModal;
