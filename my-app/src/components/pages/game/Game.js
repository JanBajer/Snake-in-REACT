import React, { useState, useRef, useEffect } from "react";
import { useInterval } from "./Interval.js";
import {
  CANVAS_SIZE,
  SNAKE_START,
  APPLE_START,
  SCORE,
  SCALE,
  SPEED,
  DIRECTIONS,
} from "./Constants";
import "./Game.css";
import { Navigate, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap/";
import { NavLink, useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
//import eatAppleSound from "../sounds/goodAndTasty.mp3";
import eatAppleSound from "../../sounds/eating.mp3";
//import snakeDiesSound from "../sounds/youAreDead.mp3";
import snakeDiesSound from "../../sounds/sadPianoMusic.mp3";

const Game = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const canvasRef = useRef();

  const [snake, setSnake] = useState(SNAKE_START); // track snake
  const [apple, setApple] = useState(APPLE_START); // track apple
  const [dir, setDir] = useState([0, -1]); // track direction, here is defined we move top when game starts
  const [speed, setSpeed] = useState(null); // track speed
  const [score, setScore] = useState(SCORE); // track speed
  const [gameOver, setGameOver] = useState(false); //track if game is over
  const [keyPressedAlready, setKeyPressedAlready] = useState(false); // track snake
  const eatApple = new Audio(eatAppleSound);
  const snakeDies = new Audio(snakeDiesSound);

  let username = null;
  let sounds = null;
  let difficulty = null;
  let snakeColor = null;
  let backgroundColor = null;

  let highestScore = JSON.parse(localStorage.getItem("highestScore"));
  if (highestScore == null) {
    let newScore = {
      username: "None",
      score: "0",
      difficulty: "None",
    };
    localStorage.setItem("highestScore", JSON.stringify(newScore));
  }

  //function to repeat game
  useInterval(() => gameLoop(), speed);
  //this function trigger if snake/apple/gameover change and it fills canvas again
  useEffect(() => {
    if (location.state == null) {
      navigate("/settings");
    }
    const context = canvasRef.current.getContext("2d");
    context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    context.clearRect(0, 0, CANVAS_SIZE[0], CANVAS_SIZE[1]);
    drawSnake();
    drawApple();
    if (gameOver == true) {
      eatApple.pause();
      eatApple.currentTime = 0;
      drawEndGame();
      if (sounds == true) {
        snakeDies.play();
      }
    }
  }, [snake, apple, gameOver]);

  //datas from form

  useEffect(() => {
    if (location.state == null) {
      navigate("/settings");
    }
  }, [location.state]);

  if (location.state != null) {
    username = location.state.username;
    sounds = location.state.sounds;
    difficulty = location.state.difficulty;
    snakeColor = location.state.snakeColor;
    backgroundColor = location.state.backgroundColor;
  }
  //save score, using local storage api
  function saveScore() {
    let savedScores = JSON.parse(localStorage.getItem("savedScores")) || [];
    let newScore = {
      username: username,
      score: score,
      difficulty: difficulty,
    };
    savedScores.push(newScore);

    while (savedScores.length > 20) {
      savedScores.shift();
    }
    if (highestScore == null) {
      localStorage.setItem("highestScore", JSON.stringify(newScore));
    } else if (newScore.score > highestScore.score) {
      localStorage.setItem("highestScore", JSON.stringify(newScore));
    }

    localStorage.setItem("savedScores", JSON.stringify(savedScores));
  }

  //function to move snake with WSAD and Arrows
  const moveSnake = ({ keyCode }) => {
    //check keycode
    if (
      (keyCode >= 37 && keyCode <= 40) ||
      keyCode == 87 ||
      keyCode == 83 ||
      keyCode == 65 ||
      keyCode == 68
    ) {
      //check to dont go into snake (if we go up, we cant go down etc.)
      if (
        ((keyCode == 38 || keyCode == 87) && dir[0] == 0 && dir[1] == 1) ||
        ((keyCode == 40 || keyCode == 83) && dir[0] == 0 && dir[1] == -1) ||
        ((keyCode == 37 || keyCode == 65) && dir[0] == 1 && dir[1] == 0) ||
        ((keyCode == 39 || keyCode == 68) && dir[0] == -1 && dir[1] == 0)
      ) {
      } else {
        //prevent to collide into own snake in 1 move,
        //if we for example move top direction and we would press fast arrow right and arrow down,
        //we could collide into our snake in 1 interval
        if (keyPressedAlready == false) {
          setKeyPressedAlready(true);
          setDir(DIRECTIONS[keyCode]);
        }
      }
    }
  };

  //control game
  const gameLoop = () => {
    const snakeCopy = JSON.parse(JSON.stringify(snake)); //whole snake
    const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]]; //new snake head
    if (
      collisionBorderCheck(newSnakeHead) == false &&
      collisionInSnakeCheck(newSnakeHead, snakeCopy) == false
    ) {
      snakeCopy.unshift(newSnakeHead);
      if (!collisionAppleCheck(newSnakeHead)) {
        snakeCopy.pop();
      }

      setSnake(snakeCopy);
      setKeyPressedAlready(false);
    } else {
      endGame();
    }
  };

  //set up game
  const startGame = () => {
    snakeDies.pause();
    snakeDies.currentTime = 0;
    eatApple.pause();
    eatApple.currentTime = 0;

    setSnake(SNAKE_START);
    setApple([8, 3]);
    setDir([0, -1]);
    setScore(SCORE);
    if (
      difficulty == "Easy" ||
      difficulty == "Medium" ||
      difficulty == "Hard"
    ) {
      setSpeed(SPEED[difficulty]);
    } else {
      setSpeed(150);
    }
    setGameOver(false);
    setKeyPressedAlready(false);
  };

  //if we leave to settings/score it will stop music
  const handleMusic = () => {
    eatApple.pause();
    snakeDies.pause();
  };

  //check if snake collide with apple, if yes then we spawn new apple
  const collisionAppleCheck = (snakeHead) => {
    if (apple[0] == snakeHead[0] && apple[1] == snakeHead[1]) {
      apple[0] = Math.floor((Math.random() * CANVAS_SIZE[0]) / SCALE);
      apple[1] = Math.floor((Math.random() * CANVAS_SIZE[1]) / SCALE);
      setScore(score + 1);
      if (sounds == true) {
        eatApple.pause();
        eatApple.currentTime = 0;
        eatApple.play();
      }
      /* if (highestScore <= score) {
        setHighestScore(score + 1);
      } */

      return true;
    }
    return false;
  };

  //check if snake collide with border
  const collisionBorderCheck = (snakeHead) => {
    if (
      snakeHead[0] < 0 ||
      snakeHead[0] * SCALE >= CANVAS_SIZE[0] ||
      snakeHead[1] < 0 ||
      snakeHead[1] * SCALE >= CANVAS_SIZE[1]
    ) {
      return true;
    }
    return false;
  };

  //check if snake collide with himself
  const collisionInSnakeCheck = (newSnakeHead, wholeSnake) => {
    for (let index = 0; index < wholeSnake.length; index++) {
      if (
        newSnakeHead[0] == wholeSnake[index][0] &&
        newSnakeHead[1] == wholeSnake[index][1]
      ) {
        return true;
      }
    }
    return false;
  };

  function drawEndGame() {
    const context = canvasRef.current.getContext("2d");
    context.fillStyle = "white";
    context.globalAlpha = 0.2;
    context.fillRect(5, 6.5, 10, 2);
    context.globalAlpha = 0.95;
    context.fillStyle = "red";
    context.font = "0.05em Arial";
    context.fillText("GAME OVER", 5, 8);
    context.globalAlpha = 1;
  }

  function drawSnake() {
    const context = canvasRef.current.getContext("2d");
    context.strokeStyle = "white";
    context.lineWidth = 0.01;

    for (let index = 0; index < snake.length; index++) {
      if (index == 0) {
        //snake head, might later implement that player can choose how his head will look like
        context.fillStyle = "black";
        context.fillRect(snake[index][0], snake[index][1], 1, 1);
        context.strokeRect(snake[index][0], snake[index][1], 1, 1);
      } else {
        //snake body
        context.fillStyle = `${snakeColor}`;
        context.fillRect(snake[index][0], snake[index][1], 1, 1);
        context.strokeRect(snake[index][0], snake[index][1], 1, 1);
      }
    }
  }

  function drawApple() {
    const context = canvasRef.current.getContext("2d");
    context.fillStyle = "pink";
    context.fillRect(apple[0], apple[1], 1, 1);
  }

  //define what happens if game is over
  const endGame = () => {
    setSpeed(null);
    setGameOver(true);
    //eatApple.stop();
    saveScore();
  };

  // css here to just adjust buttons on this page
  const buttonStyle = {
    padding: "0.5em",
    color: "white",
    fontSize: "1em",
    margin: "0.2em",
    display: "block",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "left",
    paddingLeft: "30%",
    borderRadius: "20px",
  };

  return (
    <Container onKeyDown={(e) => moveSnake(e)} tabIndex="0">
      <Row style={{ height: "100%", padding: "5px" }} className="realGameRow">
        <Col className="responsibility" id="jednicka">
          {/*canvas here, used as our gaming board*/}
          <canvas
            style={{
              border: "3px solid black",
              borderRadius: "5px",
              boxShadow: "4px 3px 8px 10px #090812",
              display: "flex",
              maxWidth: "100%",
              minWidth: "275px",

              background: `${backgroundColor}`,
            }}
            ref={canvasRef}
            width={`${CANVAS_SIZE[0]}em`}
            height={`${CANVAS_SIZE[1]}em`}
          />
        </Col>
        {/*Here in this Col is define all except canvas (buttons, best score, player name etc.)*/}
        <Col className="responsibility" id="twoRealGame">
          <Row className="dvojka">
            <div className="flex-container">
              <div className="flex-item">
                <Row className="textRealGame">
                  Player Name:{" "}
                  <div className="specialText"> {`${username}`}</div>
                </Row>
                <Row className="textRealGame">
                  Difficulty:{" "}
                  <div className="specialText"> {`${difficulty}`}</div>
                </Row>
                <Row className="textRealGame">
                  Score: <div className="specialText"> {`${score}`} </div>
                </Row>
                <Row className="textRealGame">
                  Best Score:
                  <div className="specialText"> {highestScore.score}</div>
                </Row>
              </div>
              <div className="flex-item">
                <Row>
                  <Button
                    type="button"
                    className="btn btn-outline-dark btn-secondary"
                    style={buttonStyle}
                    onClick={startGame}
                  >
                    <div className="mainText">
                      <i className="fa-solid fa-worm" />
                      Play
                    </div>
                  </Button>
                </Row>
                <Row>
                  <NavLink
                    type="button"
                    className="btn btn-outline-dark btn-secondary"
                    style={buttonStyle}
                    to="/settings"
                    onClick={handleMusic}
                  >
                    <div className="mainText">
                      <i className="fa-solid fa-gear " />
                      Settings
                    </div>
                  </NavLink>
                </Row>
                <Row>
                  <NavLink
                    type="button"
                    className="btn btn-outline-dark btn-secondary"
                    style={buttonStyle}
                    to="/score"
                    onClick={handleMusic}
                  >
                    <div className="mainText">
                      <i className="fa-solid fa-trophy" />
                      Score
                    </div>
                  </NavLink>
                </Row>
              </div>
            </div>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Game;
