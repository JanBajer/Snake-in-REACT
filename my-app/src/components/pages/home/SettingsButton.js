import React from "react";
import { NavLink } from "react-router-dom";

export default class SettingsButton extends React.Component {
  render() {
    return (
      <NavLink
        type="button"
        className="btn btn-outline-dark btn-secondary homeButtonStyle"
        to="/settings"
      >
        <div className="mainText">
          <i className="fa-solid fa-gear" />
          Settings
        </div>
      </NavLink>
    );
  }
}
