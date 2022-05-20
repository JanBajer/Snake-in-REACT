import React, { useContext } from "react";
import "../../../App.css";
import "./Settings.css";
import Button from "react-bootstrap/Button";
import { NavLink, useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { useState, useEffect, useRef } from "react";
import Snake from "../../images/snake.png";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";

//import image from "../images/snake";
import Form from "react-bootstrap/Form";
function Settings() {
  let navigate = useNavigate();

  const buttonStyle = {
    padding: "0.5em",
    color: "white",
    fontSize: "3em",
    margin: "0.2em",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "20px",
  };

  const headerStyle = {
    paddingTop: "0.5em",
    paddingBottom: "1.5em",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "400%",
  };

  const initialValues = {
    username: "",
    difficulty: "Medium",
  };
  //define some constants
  const [soundValue, setSoundValue] = useState(false);
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [snakeColor, setSnakeColor] = useState("#B5D74C");
  const [backgroundColor, setBackgroundColor] = useState("#3C4146");

  //check when formErrors change, if form is filled correctly,
  //we will be navigated to page Game
  useEffect(() => {
    //console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      //console.log(formValues);
      navigate("/game", {
        state: {
          username: formValues.username,
          sounds: soundValue,
          difficulty: formValues.difficulty,
          snakeColor: snakeColor,
          backgroundColor: backgroundColor,
        },
      });
    }
  }, [formErrors]);

  //handle music on/off
  const handleChangeSwitch = (e) => {
    const value = e.target.checked;
    setSoundValue(value);
  };

  //handle color of snake
  const handleColorSwitch = (e) => {
    const value = e.target.value;
    setSnakeColor(value);
  };

  //handle color of background
  const handleBackgroundSwitch = (e) => {
    const value = e.target.value;
    setBackgroundColor(value);
  };

  //handle username and difficulty
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  //when pressing 'start game', we check if form is filled well
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  //function to validate if form data are good. Here I validate only username, because
  //other values dont need to be validated
  const validate = (values) => {
    const regexUsername = /^[0-9a-zA-Z]+$/;
    const errors = [];
    if (!values.username) {
      errors.username = "Username is required!";
    } else if (values.username.length < 3) {
      errors.username = "Username must be more than 3 characters";
    } else if (values.username.length > 20) {
      errors.username = "Username must be less than 20 characters";
    } else if (!regexUsername.test(values.username)) {
      errors.username =
        "This is not a valid username format! Only letters and numbers are allowed";
    }

    return errors;
  };

  return (
    <Container>
      <h1 style={headerStyle}>Settings</h1>
      <Row>
        <Col md={6} className="settingsBox">
          <Row className="col-12">
            <Form onSubmit={handleSubmit}>
              <Form.Group as={Row} className="mb-3" controlId="username">
                <Form.Label column sm={6}>
                  Username:
                </Form.Label>
                <Col
                  sm={6}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Form.Control
                    value={formValues.username}
                    onChange={handleChange}
                    type="text"
                    name="username"
                    placeholder="Anonymous Snake"
                    required
                    autoFocus
                  />
                  <p style={{ color: "#FF3333" }}>{formErrors.username}</p>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="sounds">
                <Form.Label column sm={6}>
                  Sounds:
                </Form.Label>
                <Col sm={6} style={{ display: "flex", alignItems: "center" }}>
                  <Form.Check
                    type="switch"
                    className="stylingSwitch"
                    checked={soundValue}
                    onChange={handleChangeSwitch}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="difficulty">
                <Form.Label column sm={6}>
                  Difficulty:
                </Form.Label>
                <Col sm={6} className="d-grid">
                  <ToggleButtonGroup
                    type="radio"
                    name="difficulty"
                    defaultValue={formValues.difficulty}
                  >
                    <ToggleButton
                      variant={"outline-success"}
                      id="tbg-radio-1"
                      value={"Easy"}
                      onChange={handleChange}
                    >
                      Easy
                    </ToggleButton>
                    <ToggleButton
                      variant={"outline-success"}
                      id="tbg-radio-2"
                      value={"Medium"}
                      onChange={handleChange}
                    >
                      Medium
                    </ToggleButton>
                    <ToggleButton
                      variant={"outline-success"}
                      id="tbg-radio-3"
                      value={"Hard"}
                      onChange={handleChange}
                    >
                      Hard
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="snakeColor">
                <Form.Label column sm={6}>
                  Snake color:
                </Form.Label>
                <Col sm={6}>
                  <Form.Control
                    type="color"
                    value={snakeColor}
                    onChange={handleColorSwitch}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="backgroundColor">
                <Form.Label column sm={6}>
                  Background color:
                </Form.Label>
                <Col sm={6}>
                  <Form.Control
                    type="color"
                    value={backgroundColor}
                    onChange={handleBackgroundSwitch}
                  />
                </Col>
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="formBasicPassword"
              ></Form.Group>
              <Row>
                <Button
                  type="submit"
                  className="btn btn-outline-dark btn-secondary"
                  style={buttonStyle}
                  onClick={handleSubmit}
                >
                  <div className="mainTexte">
                    <i className="fa-solid fa-worm"></i> Start Game
                  </div>
                </Button>
              </Row>
              <Row>
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
            </Form>
          </Row>
        </Col>
        <Col md={6} className="rowHome">
          <img src={Snake} className="img-fluid px-5" alt="snake picture" />
        </Col>
      </Row>
    </Container>
  );
}

export default Settings;
