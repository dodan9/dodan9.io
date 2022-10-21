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
      <IngredientArea>
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
      </IngredientArea>
      <BarArea>
        <MenuArea>
          <h4>Menu</h4>
        </MenuArea>
        <MakeCocktailArea>
          <h1>Make Cocktail</h1>
          <DropArea ref={boxRef} onDragOver={dragOverToBox} onDrop={dropInBox}>
            <Cocktail>
              {ingredients &&
                (JSON.stringify(ingredients.sort()) ===
                JSON.stringify(jagerbomb.sort()) ? (
                  <img src={highball_jagerbomb} />
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
          </DropArea>
          <ClearBtn onClick={onClear}>
            Clear <img src={trashcan} />
          </ClearBtn>
        </MakeCocktailArea>
      </BarArea>
    </Container>
  );
};

export default Drop2;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  color: white;
  display: flex;
  flex-direction: column;
  background-color: #464646;
  & * {
    box-sizing: border-box;
    position: relative;
  }
`;

const IngredientArea = styled.div`
  display: flex;
  align-items: baseline;
  border: 5px solid #825826;
`;

const Ingredeint = styled.div`
  margin: 5px;
  text-align: center;
  padding: 5px;
  cursor: grab;
  & img {
    width: 50px;
  }
`;

const BarArea = styled.div`
  display: flex;
`;

const MenuArea = styled.div`
  flex-grow: 1;
  border: 5px solid #825826;
`;

const MakeCocktailArea = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 4;
  border: 5px solid #825826;
  align-items: center;
  text-align: center;
`;

const DropArea = styled.div`
  padding: 20px;
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
  width: 80px;
  height: 150.6px;
  & img {
    width: 80px;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const ClearBtn = styled.div`
  height: fit-content;
  cursor: pointer;
  font-size: 18px;
  margin: 10px 0;
  & img {
    vertical-align: bottom;
    height: 20px;
  }
`;
