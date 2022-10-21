import { MouseEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";
const highball_glass = require("./img/highball_glass.png");
const highball_jagerbomb = require("./img/highball_jagerbomb.png");
const trashcan = require("./img/trashcan.png");

interface cocktailType {
  name: string;
  ingredients: string[];
  glass: string;
}

const Drop2 = () => {
  const targetRef = useRef(null);
  const boxRef = useRef(null);
  const [selectedCocktail, setSelectedCocktail] = useState<cocktailType>();
  const [currentDragItem, setCurrentDragItem] =
    useState<HTMLDivElement | null>();
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const jagerbomb: cocktailType = {
    name: "jagerbomb",
    ingredients: ["jagermeifter", "energydrink"],
    glass: "highball",
  };
  const kahluamilk: cocktailType = {
    name: "kahluamilk",
    ingredients: ["kahlua", "milk"],
    glass: "highball",
  };
  const cocktailMenu: cocktailType[] = [jagerbomb, kahluamilk];

  const onClickMenu = (item: cocktailType) => {
    setSelectedCocktail(item);
  };
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
    setIsComplete(false);
  };

  useEffect(() => {
    onClear();
  }, [selectedCocktail]);

  useEffect(() => {
    if (
      JSON.stringify(ingredients.sort()) ===
      JSON.stringify(selectedCocktail?.ingredients.sort())
    )
      setIsComplete(true);
  }, [ingredients]);

  return (
    <Container>
      <IngredientArea>
        {selectedCocktail &&
          selectedCocktail.ingredients.map((item, index) => (
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
          <ul>
            {cocktailMenu.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  onClickMenu(item);
                }}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </MenuArea>
        <MakeCocktailArea>
          <h1>Make Cocktail</h1>
          {isComplete && <h3>{selectedCocktail?.name}!</h3>}
          <DropArea ref={boxRef} onDragOver={dragOverToBox} onDrop={dropInBox}>
            {selectedCocktail ? (
              <Cocktail>
                {ingredients &&
                  (isComplete ? (
                    <img
                      src={require(`./img/highball_${selectedCocktail?.name}.png`)}
                    />
                  ) : (
                    ingredients.map((item, index) => (
                      <img
                        key={index}
                        src={require(`./img/${selectedCocktail?.glass}_${item}.png`)}
                      />
                    ))
                  ))}
                <img
                  src={require(`./img/${selectedCocktail?.glass}_glass.png`)}
                />
              </Cocktail>
            ) : (
              <h4>Select Cocktail!</h4>
            )}
          </DropArea>
          <ClearBtn onClick={onClear}>
            Clear <img src={trashcan} />
          </ClearBtn>
        </MakeCocktailArea>
      </BarArea>
      <Footer></Footer>
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
  border: 5px inset #58330dff;
  background-color: #724210ff;
  min-height: 100px;
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
  border: 5px solid black;
  padding: 10px;
  margin: 10px;
  & ul {
    padding-left: 1em;
  }
  & li {
    cursor: pointer;
    margin-bottom: 5px;
  }
  & li:last-child {
    margin-bottom: 0;
  }
`;

const MakeCocktailArea = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 4;
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
  height: 150px;
  & img {
    height: 150px;
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

const Footer = styled.div`
  flex-grow: 1;
  background-color: #825826;
`;
