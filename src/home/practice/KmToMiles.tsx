import { useState } from "react";
import { InputBox } from ".";

const KmToMiles = () => {
  const [distance, setDistance] = useState<number | "">("");

  const reset = () => {
    setDistance("");
  };

  const ondistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value)
      setDistance((distances) => (distances = parseFloat(e.target.value)));
    else reset();
  };

  const [flipped, setFlipped] = useState<boolean>(false);
  const onFlip = () => {
    setFlipped((flipped) => (flipped = !flipped));
    reset();
  };

  return (
    <section>
      <h3>Distance Converter</h3>
      <InputBox>
        <label htmlFor='km'>Km</label>
        <input
          id='km'
          placeholder='km'
          type='number'
          value={flipped ? (distance ? distance * 0.62137 : "") : distance}
          onChange={ondistanceChange}
          disabled={flipped}
        />
      </InputBox>

      <InputBox>
        <label htmlFor='miles'>Miles</label>
        <input
          id='miles'
          placeholder='miles'
          type='number'
          value={flipped ? distance : distance ? distance / 0.62137 : ""}
          onChange={ondistanceChange}
          disabled={!flipped}
        />
      </InputBox>

      <button onClick={reset}>reset</button>
      <button onClick={onFlip}>
        {flipped ? "Km to Miles" : "Miles to Km"}
      </button>
    </section>
  );
};

export default KmToMiles;
