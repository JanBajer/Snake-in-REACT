import React from "react";
import { NavLink } from "react-router-dom";

export default class ScoreButton extends React.Component {
  render() {
    return (
      <NavLink
        type="button"
        className="btn btn-outline-dark btn-secondary homeButtonStyle"
        to="/score"
      >
        <div className="mainText">
          <i className="fa-solid fa-trophy" />
          Score
        </div>
      </NavLink>
    );
  }
}
