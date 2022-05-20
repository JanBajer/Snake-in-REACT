import React from "react";
import ProfilePicture from "../../images/profilepicture.jpg";
import LinkedinPhoto from "../../images/linkedin.png";

export default class FlipCard extends React.Component {
  render() {
    return (
      /*add href to my linkedin*/
      <a href="https://www.linkedin.com/in/janbajer/">
      <div className="flipCard">
        <div className="card">
          <div className="front">
            <img className="img" src={LinkedinPhoto} alt="LinkedIn-Logo"></img>
            <h2>@janbajer</h2>
          </div>
          <div className="back">
            <img
              className="img"
              src={ProfilePicture}
              alt="profile-Picture"
            ></img>
            <div className="textInCard">
              <h2>Jan Bajer</h2>
              <h7>CTU student</h7>
            </div>
          </div>
        </div>
      </div>
      </a>
    );
  }
}
