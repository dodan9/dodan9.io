import { MouseEvent, useRef, useState } from "react";
import styled from "styled-components";
const highball_glass = require("./img/highball_glass.png");
const highball_jagerbomb = require("./img/highball_jagerbomb.png");
const trashcan = require("./img/trashcan.png");

const Drop2 = () => {
  const targetRef = useRef(null);
  const boxRef = useRef(null);
  const [currentDragItem, setCurrentDragItem] =
    useState<HTMLDivElement | null>();
  const [ingredients, setIngredients] = useState<string[]>([]);
  const jagerbomb = ["jagermeifter", "energydrink"];

  const targetDragStart = (event: MouseEvent<HTMLDivElement>) => {
    setCurrentDragItem(event.currentTarget);
  };
  const targetDragEnd = () => {
    setCurrentDragItem(null);
  };

  const dragOverToBox = (event: MouseEvent) => {
    event.preventDefault();
    if (boxRef.current) {
      // const current = boxRef.current as HTMLDivElement;
      if (currentDragItem) {
        // current.classList.add(currentDragItem.id);
      }
    }
  };
  const dropInBox = (event: MouseEvent) => {
    event.preventDefault();
    if (boxRef.current) {
      // const current = boxRef.current as HTMLDivElement;
      if (currentDragItem) {
        // current.classList.remove(currentDragItem.id);
        if (!ingredients.includes(currentDragItem.id)) {
          setIngredients((currentList) => [...currentList, currentDragItem.id]);
        }
      }
    }
  };

  const onClear = () => {
    setIngredients([]);
  };

  return (
    <Container>
      <IngredientBox>
        {jagerbomb.map((item, index) => (
          <Ingredeint
            ref={targetRef}
            id={item}
            draggable
            key={index}
            onDragStart={targetDragStart}
            onDragEnd={targetDragEnd}
          >
            <img src={require(`./img/${item}.png`)} />
          </Ingredeint>
        ))}
      </IngredientBox>
      <MakeCocktailBox>
        <h1>Make Cocktail</h1>
        <DropBox ref={boxRef} onDragOver={dragOverToBox} onDrop={dropInBox}>
          <Cocktail>
            {ingredients &&
              (JSON.stringify(ingredients.sort()) ===
              JSON.stringify(jagerbomb.sort()) ? (
                <>
                  Jagermeifter!
                  <img src={highball_jagerbomb} />
                </>
              ) : (
                ingredients.map((item, index) => (
                  <img
                    key={index}
                    src={require(`./img/highball_${item}.png`)}
                  />
                ))
              ))}
            <img src={highball_glass} />
          </Cocktail>
        </DropBox>
        <ClearBtn onClick={onClear}>
          Clear <img src={trashcan} />
        </ClearBtn>
      </MakeCocktailBox>
    </Container>
  );
};

export default Drop2;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  color: white;
  display: flex;
  background-color: #464646;
  & * {
    box-sizing: border-box;
    position: relative;
  }
`;

const IngredientBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 5px dashed white;
  overflow-y: auto;
`;

const Ingredeint = styled.div`
  margin: 5px;
  text-align: center;
  padding: 5px;
  cursor: grab;
  & img {
    width: 50px;
  }
  border-bottom: 2px solid white;
`;

const MakeCocktailBox = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  border: 5px dashed white;
  border-left: 0;
  align-items: center;
  text-align: center;
`;

const DropBox = styled.div`
  width: 200px;
  height: 300px;
  margin: 5px;
  border: 5px dashed black;
  /* &.test1 {
    border: 5px dashed red;
  }
  &.test2 {
    border: 5px dashed blue;
  } */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Cocktail = styled.div`
  width: 136px;
  height: 256px;
  & img {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const ClearBtn = styled.div`
  height: fit-content;
  cursor: pointer;
  font-size: 18px;
  & img {
    vertical-align: bottom;
    height: 20px;
  }
`;
