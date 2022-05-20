import React, { useContext } from "react";
import "../../../App.css";
import "./Home.css";
import Button from "react-bootstrap/Button";
import { NavLink, useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Snake from "../../images/snake.png";
import FlipCard from "./FlipCard.js";
import SettingsButton from "./SettingsButton.js";
import ScoreButton from "./ScoreButton.js";
import SnakeAnimation from "./SnakeAnimation";
function Home() {
  const headerStyle = {
    paddingTop: "0.5em",
    paddingBottom: "1.5em",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "400%",
  };

  //home page, only css and html
  return (
    <>
      <FlipCard />
      <SnakeAnimation />
      <Container>
        <h1 style={headerStyle}>Project KAJ - SNAKE</h1>

        <Row>
          <Col md={6} className="rowHome">
            <Row className="col-12">
              <SettingsButton />
            </Row>
            <Row className="col-12">
              <ScoreButton />
            </Row>
          </Col>
          <Col md={6} className="rowHome">
            <img src={Snake} className="img-fluid px-5" alt="snake picture" />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
