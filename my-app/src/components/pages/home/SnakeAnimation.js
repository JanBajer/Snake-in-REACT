import React from "react";
import Snake from "../../images/snake.png";

export default class SnakeAnimation extends React.Component {
  render() {
    return (
      <div className="smallSnakes">
        <img src={Snake} />
        <img src={Snake} />
        <img src={Snake} />
        <img src={Snake} />
        <img src={Snake} />
        <img src={Snake} />
        <img src={Snake} />
      </div>
    );
  }
}
