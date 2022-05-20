import React, { useContext } from "react";
import "../../../App.css";
import { NavLink, renderMatches, useNavigate } from "react-router-dom";
import { Table, Row, Col, Container, Button } from "react-bootstrap";
import FlipCard from "../home/FlipCard.js";
function Score() {
  const buttonStyle = {
    padding: "0.5em",
    color: "white",
    fontSize: "3.5em",
    margin: "0.2em",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "20px",
    paddingTop: "40px",
    paddingBottom: "40px",
  };

  const headerStyle = {
    paddingTop: "0.5em",
    paddingBottom: "0.5em",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "400%",
  };

  let savedScores = JSON.parse(localStorage.getItem("savedScores")) || [];
  let highestScore = JSON.parse(localStorage.getItem("highestScore"));
  if (highestScore == null) {
    let newScore = {
      username: "None",
      score: "0",
      difficulty: "None",
    };
    localStorage.setItem("highestScore", JSON.stringify(newScore));
  }
  let i = 1;

  return (
    <>
      <FlipCard />
      <Container>
        <h1 style={headerStyle}>Project KAJ - SNAKE</h1>
        <Row>
          <Col>
            <h2>Best score overall</h2>
            <div className="flex-item">
              <Row className="textRealGame">
                Username:{" "}
                <div className="specialText"> {highestScore.username}</div>
              </Row>
              <Row className="textRealGame">
                Score: <div className="specialText"> {highestScore.score}</div>
              </Row>
              <Row className="textRealGame">
                Difficulty:{" "}
                <div className="specialText"> {highestScore.difficulty} </div>
              </Row>
            </div>

            <h2 style={{ paddingTop: "15px" }}>
              Last 20 scores (Bottom is the newest score)
            </h2>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>Score</th>
                  <th>Difficulty</th>
                </tr>
              </thead>
              <tbody>
                {savedScores.map((val, key) => {
                  return (
                    <tr key={key}>
                      <td>{i++}</td>
                      <td>{val.username}</td>
                      <td>{val.score}</td>
                      <td>{val.difficulty}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Row className="col-12">
              <NavLink
                type="button"
                className="btn btn-outline-dark btn-secondary"
                style={buttonStyle}
                to="/"
              >
                <div className="mainTexte">
                  <i className="fas fa-home" />
                  Back to Menu
                </div>
              </NavLink>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Score;
