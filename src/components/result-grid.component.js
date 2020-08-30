import React, { Component } from "react";
import "./home.css";
import { typesOfCell } from "../globals";

export default class ResultGrid extends Component {
  colorFromMatrixState(state) {
    switch (state) {
      case typesOfCell.AVAILABLE:
        return "cell available";
      case typesOfCell.BLOCKED:
        return "cell unavailable";
      case typesOfCell.WALKING:
        return "cell walking";
      case typesOfCell.ACCESSIBILITY:
        return "cell accessibility";
      case typesOfCell.OBJECT:
        return "cell object-button";
      case typesOfCell.DISTANCE:
        return "cell distance";
      default:
        return "cell unavailable";
    }
  }

  generateMatrix(matrix) {
    const buttonsList = [];
    for (const i in matrix) {
      const row = [];
      for (const j in matrix[i]) {
        row.push(
          <button className={this.colorFromMatrixState(matrix[i][j])}>.</button>
        );
      }
      buttonsList.push(<div className="row-cells">{row}</div>);
    }
    return buttonsList;
  }

  render() {
    /** When the cell is true, the space is available */
    const objectMatrix = (
      <div className="cells-container">
        {this.generateMatrix(this.props.matrix)}
      </div>
    );

    return (
      <div className="col-12 mt-4 card p-2">
        <button onClick={() => this.props.removeResultPanel()}>Regresar</button>
        <div className="d-flex cuadrito-label align-items-center">
          <div></div>
          <small>Un cuadito representa 0.5mts</small>
        </div>
        {objectMatrix}
      </div>
    );
  }
}
