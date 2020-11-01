import React, { Component } from "react";
import "./Cell.css";

class Cell extends Component {
  render() {
    return <div className="cell" id={this.props.id}></div>;
  }
}

export default Cell;
