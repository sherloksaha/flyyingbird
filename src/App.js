import "./App.css";
import styled from "styled-components";
import {
  BackGround_Height,
  BackGround_Width,
  bird_height,
  bird_width,
  bird_top,
  bird_left,
} from "./Constants/ConstantMeasures";
import { useEffect, useState } from "react";
const Grav = 10;
const OBJ_WIDTH = 50;
const OBJ_GAP = 200;
function App() {
  const [birdpos, setBirdPos] = useState(bird_top);
  const [start, setStart] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [objectHeight, setObjHeight] = useState(150);
  const [Objpos, setObjPOs] = useState(BackGround_Width - OBJ_WIDTH);

  const handler = () => {
    if (start) {
      if (birdpos < bird_height) {
        setBirdPos(0);
      } else {
        setBirdPos((ol) => ol - 60);
      }
    }
  };
  //---------------------------------------------------------------------------------------------------
  useEffect(() => {
    document.addEventListener("keydown", handler);
    let c = "";
    if (start && birdpos < BackGround_Height - bird_height + 11) {
      c = setInterval(() => {
        setBirdPos((old) => old + Grav);
        setScore((o) => o + 0.2);
      }, 30);
    }
    return () => {
      clearInterval(c);
      document.removeEventListener("keydown", handler);
    };
  });
  //-----------------------------------------------------------------------------------------------------------
  useEffect(() => {
    if (!(birdpos < BackGround_Height - bird_height + 11)) {
      setStart(false);
      setGameOver(true);
    }
  }, [score]);
  //-------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    let c = "";
    if (start && Objpos >= 0) {
      c = setInterval(() => {
        setObjPOs((o) => o - 10);
      }, 30);
    } else {
      setObjPOs(BackGround_Width - OBJ_WIDTH);
      setObjHeight(Math.floor(Math.random() * (BackGround_Height - OBJ_GAP)));
    }
    return () => clearInterval(c);
  }, [Objpos, start]);
  //-----------------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    let topObj = birdpos < objectHeight;
    let bottomObj =
      birdpos >=
      BackGround_Height -
        (BackGround_Height - OBJ_GAP - objectHeight) -
        bird_height;

    if (
      Objpos >= OBJ_WIDTH &&
      Objpos <= OBJ_WIDTH + 80 &&
      (topObj || bottomObj)
    ) {
      setStart(false);
      setGameOver(true);
      setBirdPos(300);
    }
  }, [start, birdpos, objectHeight, Objpos]);
  //------------------------------------------------------------------------------------------------------------------------
  return (
    <Home>
      <BackGround height={BackGround_Height} width={BackGround_Width}>
        <h6>Score : {score.toFixed(0)}</h6>
        <div className="button-div">
          {gameOver && <Button1>GameOver</Button1>}
          {!start ? (
            <Button
              onClick={() => {
                setScore(0);
                setGameOver(false);
                setBirdPos(bird_top);
                setStart(true);
              }}
            >
              {gameOver ? "Restart" : "start"}
            </Button>
          ) : (
            <>
              <Obj
                height={objectHeight}
                width={OBJ_WIDTH}
                top={0}
                left={Objpos}
                deg={180}
              />
              <Bird
                height={bird_height}
                width={bird_width}
                top={birdpos}
                left={bird_left}
              ></Bird>
              <Obj
                height={BackGround_Height - OBJ_GAP - objectHeight}
                width={OBJ_WIDTH}
                top={
                  BackGround_Height -
                  (BackGround_Height - OBJ_GAP - objectHeight)
                }
                left={Objpos}
                deg={0}
              />
            </>
          )}
        </div>
      </BackGround>
    </Home>
  );
}

export default App;

const Home = styled.div`
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BackGround = styled.div`
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  background-image: url("http://surl.li/kaboo");
  border: 2px solid black;
  position: relative;
`;
const Bird = styled.div`
  position: absolute;
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  background-repeat: no-repeat;
  background-image: url("http://surl.li/kabua");
  top: ${(p) => p.top}px;
  left: ${(p) => p.left}px;
`;
const Button = styled.button`
  position: relative;
  margin-top: 5px;
  border: none;
  height: 30px;
  width: 80px;

  background-color: green;
`;
const Button1 = styled.button`
  position: relative;
  margin-top: 5px;
  border: none;
  height: 30px;
  width: 80px;

  background-color: green;
`;

const Obj = styled.div`
  position: absolute;
  background-image: url("https://github.com/krishnenduroy52/Flappy-bird/blob/main/public/images/pipe-green.png?raw=true");
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  transform: rotate(${(props) => props.deg}deg);
  background-repeat: no-repeat;
`;
