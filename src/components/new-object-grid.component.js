import React, { Component } from "react";
import "./home.css";

export default class NewObjectGrid extends Component {
    getNewObjectGrid(newObjectMatrix) {
    const buttonsList = [];
    for (const i in newObjectMatrix) {
      const row = [];
      for (const j in newObjectMatrix[i]) {
        row.push(
          <button
            className={newObjectMatrix[i][j] ? "available" : "unavailable"}
            onClick={(event) => {
              event.preventDefault();
              this.props.updateMatrix(i, j);
            }}
          >
            .
          </button>
        );
      }
      buttonsList.push(<div className="row-cells">{row}</div>);
    }
    return buttonsList;
  }

  render() {
    return (
      <div id="new-object-grid">
        <div className="d-flex h-75">
          <div className="w-75">
            {this.getNewObjectGrid(this.props.newObjectMatrix)}
          </div>
          <div className="d-flex flex-column w-25">
            <button onClick={this.props.decreaseGridRow}>-</button>
            <div className="flex-grow-1"></div>
            <button onClick={this.props.increaseGridRow}>+</button>
          </div>
        </div>
        <div className="d-flex flex-row h-25">
          <div className="w-75">
            <button
              className="float-right"
              onClick={this.props.increseGridColumn}
            >
              +
            </button>
            <button onClick={this.props.decreaseGridColumn}>-</button>
          </div>
        </div>
        <div></div>
      </div>
    );
  }
}
