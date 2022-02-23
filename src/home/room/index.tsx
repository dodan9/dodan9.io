import useMouse from "@react-hook/mouse-position";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Room = () => {
  const [xPosition, setXPosition] = useState<number>(0);
  const [yPosition, setYPosition] = useState<number>(0);

  const ref = useRef(null);
  const mouse = useMouse(ref, { enterDelay: 0, leaveDelay: 0 });

  useEffect(() => {
    if (mouse.x) setXPosition(mouse.x + 30);
    if (mouse.y) setYPosition(mouse.y + 30);
  }, [mouse.x, mouse.y]);
  return (
    <Container ref={ref}>
      <div id="door">
        <div className="room_div">
          <input type="radio" id="close" name="obj" value="x" />
          <img id="room_img" src="room1.png" />
          <img id="bookjang" src="책장.png" />

          <input type="radio" id="books_radio" name="obj" />
          <label htmlFor="books_radio">
            <p>
              <span style={{ lineHeight: 25, fontSize: 20 }}>"책들"</span>
              <span style={{ display: "block", height: 10 }}></span>
              시집과 소설들이 정갈하게 꽂혀 있다.
              <br />
              '코러스크로노스'
              <br />
              '일기시대'
              <br />.<br />.
              <label className="close" htmlFor="close">
                X
              </label>
            </p>
            <img id="books" src="books.png" />
          </label>

          <input type="radio" id="sarang_radio" name="obj" />
          <label htmlFor="sarang_radio">
            <p>
              <span style={{ lineHeight: 25, fontSize: 20 }}>"사랑"</span>
              <span style={{ display: "block", height: 10 }}></span>
              안녕. 내 이름은 사랑.
              <br />
              나는 늘 사랑이야.
              <label className="close" htmlFor="close">
                X
              </label>
            </p>
            <img id="sarang" src="sarang.png" />
          </label>

          <input type="radio" id="yeongsoo_radio" name="obj" />
          <label htmlFor="yeongsoo_radio">
            <p>
              <span style={{ lineHeight: 25, fontSize: 20 }}>"기타"</span>
              <span style={{ display: "block", height: 10 }}></span>
              당신은 책을 읽고 나는 기타를 치고
              <br />
              유독 빛이 나는 눈동자
              <br />
              바다에 함께했을 때가 떠오른다.
              <label className="close" htmlFor="close">
                X
              </label>
            </p>
            <img id="yeongsoo" src="yeongsoo.png" />
          </label>

          <input type="radio" id="brown_radio" name="obj" />
          <label htmlFor="brown_radio">
            <p>
              <span style={{ lineHeight: 25, fontSize: 20 }}>"브라운"</span>
              <span style={{ display: "block", height: 10 }}></span>
              사랑스러운 여자친구가 있다는 일은
              <br />
              매일 기념초를 몸에 꽂아 마땅한 일인걸.
              <span style={{ display: "block", height: 10 }} />
              <br />더 특별한 기념을 원한다면 이 인형을 찾자.
              <label className="close" htmlFor="close">
                X
              </label>
            </p>
            <img id="brown" src="brown.png" />
          </label>

          <input type="radio" id="safebox_radio" name="obj" />
          <label htmlFor="safebox_radio">
            <p>
              <span style={{ lineHeight: 25, fontSize: 20 }}>"금고"</span>
              <span style={{ display: "block", height: 10 }}></span>
              금고와 이 방은 유사하다.
              <br />
              받는 이에게 내던져지는 순수하게 추출된 마음.
              <br />
              사랑한다는 말이 매번 부끄러워지게 만드는 원인이다.
              <label className="close" htmlFor="close">
                X
              </label>
            </p>
            <img id="safebox" src="safebox.png" />
          </label>

          <input type="radio" id="sunflower_radio" name="obj" />
          <label htmlFor="sunflower_radio">
            <p>
              <span style={{ lineHeight: 25, fontSize: 20 }}>"해바라기"</span>
              <span style={{ display: "block", height: 10 }}></span>
              해바라기라는 꽃이 그렇게 잘 어울리는 사람이 또 있을까?
              <br />
              꽃과 햇빛과{" "}
              <a
                href="#sea"
                style={{ textDecoration: "none", color: "rgb(144, 169, 218)" }}
              >
                바다
              </a>
              와 책, 모두 한 사람을 가리킨다.
              <label className="close" htmlFor="close">
                X
              </label>
            </p>
            <img id="sunflower" src="sunflower.png" />
          </label>
        </div>
        <div className="toggle">
          <input type="radio" id="exit" name="inout" checked />
          <label htmlFor="exit">
            <img src="exit.png" />
          </label>
          <input type="radio" id="open" name="inout" />
          <label htmlFor="open"></label>
        </div>
      </div>
      {/* <Link to="/dodan9.io/ocean">to ocean</Link> */}
      {mouse.x && mouse.y && (
        <FollowCursor x={xPosition} y={yPosition}>
          room?
        </FollowCursor>
      )}
    </Container>
  );
};

export default Room;

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;
const Title = styled.div``;

const FollowCursor = styled.div<{ x: any; y: any }>`
  position: fixed;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
  transition: 0.1s ease-out;
`;
