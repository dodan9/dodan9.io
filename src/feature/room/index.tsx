import useMouse from "@react-hook/mouse-position";
import { useEffect, useEffectEvent, useRef, useState, type Ref } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import stars from "./images/back_stars.gif";
import roomImg from "./images/room1.png";
import bookShell from "./images/책장.png";
import books from "./images/books.png";
import books_h from "./images/books_h.png";
import robot from "./images/robot.png";
import robot_h from "./images/robot_h.png";
import yeongsoo from "./images/yeongsoo.png";
import yeongsoo_h from "./images/yeongsoo_h.png";
import brown from "./images/brown.png";
import brown_h from "./images/brown_h.png";
import safebox from "./images/safebox.png";
import safebox_h from "./images/safebox_h.png";
import sunflower from "./images/sunflower.png";
import sunflower_h from "./images/sunflower_h.png";
import closeImg from "./images/close.png";
import rabbit from "./images/rabbit.png";
import exit from "./images/exit.png";

const Room = () => {
  const [xPosition, setXPosition] = useState<number>(0);
  const [yPosition, setYPosition] = useState<number>(0);
  const [isDoorOpen, setIsDoorOpen] = useState<boolean>(false);
  const [clickTarget, setClickTarget] = useState<string | null>(null);
  const [cursorSrc, setCursorSrc] = useState<string>("");

  const ref = useRef<HTMLElement>(null!);
  const mouse = useMouse(ref, { enterDelay: 0, leaveDelay: 0 });

  const init = useEffectEvent(() => {
    if (mouse.x) setXPosition(mouse.x + 10);
    if (mouse.y) setYPosition(mouse.y + 10);
  });

  useEffect(() => {
    init();
  }, [mouse]);
  return (
    <>
      <GlobalStyle />
      <Container ref={ref as unknown as Ref<HTMLDivElement>}>
        <Door
          onClick={() => {
            setIsDoorOpen(true);
          }}
          isDoorOpen={isDoorOpen}
        >
          {isDoorOpen && (
            <RoomContainer>
              <Bookshell src={bookShell} />
              <Books
                src={books}
                onClick={() => {
                  setClickTarget("books");
                }}
              />
              <Robot
                src={robot}
                onClick={() => {
                  setClickTarget("robot");
                }}
              />
              <Yeoungsoo
                src={yeongsoo}
                onClick={() => {
                  setClickTarget("yeongsoo");
                }}
              />
              <Brown
                src={brown}
                onClick={() => {
                  setClickTarget("brown");
                }}
              />
              <SafeBox
                src={safebox}
                onClick={() => {
                  setClickTarget("safebox");
                }}
              />
              <Sunflower
                src={sunflower}
                onClick={() => {
                  setClickTarget("sunflower");
                }}
              />
              <Rabbit
                src={rabbit}
                onClick={() => {
                  setCursorSrc((prev) => (prev ? "" : rabbit));
                }}
              />
              <Link to="/dodan9.io">
                <Exit src={exit} />
              </Link>
              {clickTarget && (
                <TextContainer>
                  {clickTarget === "books" && <span>book.</span>}
                  {clickTarget === "robot" && <span>robot.</span>}
                  {clickTarget === "yeongsoo" && <span>yeongsoo.</span>}
                  {clickTarget === "brown" && <span>brown.</span>}
                  {clickTarget === "safebox" && <span>safebox.</span>}
                  {clickTarget === "sunflower" && <span>sunflower.</span>}
                  <Close
                    onClick={() => {
                      setClickTarget(null);
                    }}
                  />
                </TextContainer>
              )}
            </RoomContainer>
          )}
        </Door>
        {mouse.x && mouse.y && cursorSrc ? (
          <FollowCursor x={xPosition} y={yPosition}>
            <CursorImg src={cursorSrc} />
          </FollowCursor>
        ) : null}
      </Container>
    </>
  );
};

export default Room;

const GlobalStyle = createGlobalStyle`
box-sizing: border-box;
input{
  display: none;
}
label{
  text-align: center;
  display: block;
  cursor: pointer;
}
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #f7a223ff;
  overflow: hidden;
`;

const Door = styled.div<{ isDoorOpen: boolean }>`
  width: ${(props) => (props.isDoorOpen ? "100%" : "200px")};
  height: ${(props) => (props.isDoorOpen ? "100%" : "300px")};
  transition: 1s;
  background-image: url(${stars});
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${(props) => (props.isDoorOpen ? "default" : "pointer")};
`;

const RoomContainerOpen = keyframes`
  0%{
    opacity: 0;
  }
  50%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
`;
const RoomContainer = styled.div`
  position: relative;
  width: 600px;
  height: 600px;
  animation: ${RoomContainerOpen} 2s ease-out;
  background-image: url(${roomImg});
  background-size: cover;
  & img {
    position: absolute;
    display: block;
    opacity: 0;
    animation-fill-mode: forwards;
    cursor: pointer;
  }
`;

const BookshellAni = keyframes`
  0%{
    opacity:0;
  }
  100%{
    opacity: 1;
    top: 99px;
  }
`;
const Bookshell = styled.img`
  top: 0;
  left: 237px;
  animation: ${BookshellAni} 1s 1s;
  && {
    cursor: default;
  }
`;

const BooksAni = keyframes`
  0%{
    opacity:0;
  }
  100%{
    opacity: 1;
    left: 246px;
  }
`;
const Books = styled.img`
  top: 156px;
  left: 200px;
  animation: ${BooksAni} 1s 1.5s;
  &:hover {
    content: url(${books_h});
  }
`;

const RobotAni = keyframes`
  0%{
    opacity:0;
  }
  100%{
    opacity: 1;
    left: 294px;
  }
`;
const Robot = styled.img`
  top: 255px;
  left: 250px;
  animation: ${RobotAni} 1s 1.8s;
  &:hover {
    content: url(${robot_h});
  }
`;

const YeongsooAni = keyframes`
  0%{
    opacity:0;
  }
  100%{
    opacity: 1;
    top: 183px;
  }
`;
const Yeoungsoo = styled.img`
  top: 0;
  left: 27px;
  animation: ${YeongsooAni} 1s 1.3s;
  &:hover {
    content: url(${yeongsoo_h});
  }
`;

const BrownAni = keyframes`
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
    top: 243px;
  }
`;
const Brown = styled.img`
  top: 100px;
  left: 138px;
  animation: ${BrownAni} 1s 1.6s;
  &:hover {
    content: url(${brown_h});
  }
`;

const SafeBoxAni = keyframes`
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
    top: 300px;
  }
`;
const SafeBox = styled.img`
  top: 200px;
  left: 360px;
  animation: ${SafeBoxAni} 1s 2s;
  &:hover {
    content: url(${safebox_h});
  }
`;

const SunflowerAni = keyframes`
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
    top: 210px;
  }
`;
const Sunflower = styled.img`
  top: 110px;
  left: 390px;
  animation: ${SunflowerAni} 1s 2.2s;
  &:hover {
    content: url(${sunflower_h});
  }
`;

const RabbitAni = keyframes`
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
    top: 60px;
  }
`;
const Rabbit = styled.img`
  top: 0;
  left: 280px;
  width: 40px;
  animation: ${RabbitAni} 1s 2.5s;
`;

const Exit = styled.img`
  && {
    position: fixed;
    top: 20px;
    right: 20px;
    width: 40px;
    opacity: 1;
  }
`;

const TextContainer = styled.div`
  padding: 15px;
  width: 600px;
  height: 200px;
  position: absolute;
  bottom: -20px;
  left: -20px;
  z-index: 100;
  border-radius: 5px;
  line-height: 22px;
  font-size: 18px;
  background-color: rgba(0, 0, 0, 0.3);
  cursor: default;
  color: white;
  border: 5px ridge gainsboro;
  display: block;
`;
const Close = styled.img`
  && {
    position: absolute;
    display: block;
    right: 5px;
    top: 5px;
    width: 20px;
    height: 20px;
    content: url(${closeImg});
    opacity: 1;
  }
`;

const FollowCursor = styled.div<{ x: number; y: number }>`
  position: fixed;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
  transition: 0.1s ease-out;
  color: aqua;
  z-index: 100;
  pointer-events: none;
`;
const CursorImg = styled.img`
  width: 30px;
`;
