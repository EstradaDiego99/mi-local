import React, { Component } from "react";
import "./home.css";
import { typesOfCell } from "../globals";

export default class LocalGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      /** Width of the local space in meters */
      width: 10.0,

      /** Height of the local space in meters */
      height: 10.0,

      /** Selected color to click on when selecting the local grid */
      selectedColorOption: typesOfCell.BLOCKED,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.updateSize = this.updateSize.bind(this);
    this.selectColor = this.selectColor.bind(this);
  }

  componentDidMount() {
    this.setState({ width: Math.floor(this.props.matrix[0].length / 2) });
    this.setState({ height: Math.floor(this.props.matrix.length / 2) });
  }

  handleInputChange(event) {
    let { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  updateSize(event) {
    event.preventDefault();
    let { width, height } = this.state;
    let matrix = this.props.matrix;
    width = Math.round(width * 2) / 2;
    height = Math.round(height * 2) / 2;
    const neoMatrix = new Array(height * 2).fill().map(function () {
      return new Array(width * 2).fill(typesOfCell.AVAILABLE);
    });

    var i = 0;
    while (i < Math.min(matrix.length, height * 2)) {
      var j = 0;
      while (j < Math.min(matrix[i].length, width * 2)) {
        neoMatrix[i][j] = matrix[i][j];
        j += 1;
      }
      while (j < width * 2) {
        neoMatrix[i][j] = typesOfCell.AVAILABLE;
        j += 1;
      }
      i += 1;
    }
    while (i < height * 2) {
      for (j in neoMatrix[i]) {
        neoMatrix[i][j] = typesOfCell.AVAILABLE;
      }
      i += 1;
    }

    this.props.replaceMatrix(neoMatrix);
  }

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
      default:
        return "cell unavailable";
    }
  }

  selectColor(cellColor) {
    this.setState({ selectedColorOption: cellColor });
  }

  generateMatrix(matrix) {
    const buttonsList = [];
    for (const i in matrix) {
      const row = [];
      for (const j in matrix[i]) {
        row.push(
          <button
            className={this.colorFromMatrixState(matrix[i][j])}
            onClick={() =>
              this.props.updateMatrix(i, j, this.state.selectedColorOption)
            }
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
    /** When the cell is true, the space is available */
    const objectMatrix = (
      <div className="cells-container">
        {this.generateMatrix(this.props.matrix)}
      </div>
    );

    return (
      <div className="col-12 col-md-6 mt-4 card p-2">
        <form className="d-flex container-fluid flex-wrap align-items-center mb-1 justify-content-center">
          <div className="input-group col-5 p-1">
            <input
              type="text"
              name="width"
              autoComplete="nope"
              className="form-control"
              placeholder="Largo"
              value={this.state.width}
              onChange={this.handleInputChange}
            />
            <div className="input-group-append">
              <span className="input-group-text">mts</span>
            </div>
          </div>
          <span>X</span>
          <div className="input-group col-5 p-1">
            <input
              type="text"
              name="height"
              autoComplete="nope"
              className="form-control"
              placeholder="Ancho"
              value={this.state.height}
              onChange={this.handleInputChange}
            />
            <div className="input-group-append">
              <span className="input-group-text">mts</span>
            </div>
          </div>
          <button
            className="btn btn-primary button col-11 mt-2 mb-2"
            onClick={this.updateSize}
          >
            Actualizar
          </button>
        </form>
        <div className="d-flex cuadrito-label align-items-center">
          <div></div>
          <small>Un cuadito representa 0.5mts</small>
        </div>
        {objectMatrix}
        <div className="d-flex flex-wrap justify-content-around">
          <button
            onClick={() => this.selectColor(typesOfCell.AVAILABLE)}
            className={
              this.state.selectedColorOption === typesOfCell.AVAILABLE
                ? "color-button d-flex selected-color-button"
                : "color-button d-flex"
            }
          >
            <div className="available-button"></div>
            <span>Libre</span>
          </button>
          <button
            onClick={() => this.selectColor(typesOfCell.BLOCKED)}
            className={
              this.state.selectedColorOption === typesOfCell.BLOCKED
                ? "color-button d-flex selected-color-button"
                : "color-button d-flex"
            }
          >
            <div className="blocked-button"></div>
            <span>Ocupado</span>
          </button>
          <button
            onClick={() => this.selectColor(typesOfCell.WALKING)}
            className={
              this.state.selectedColorOption === typesOfCell.WALKING
                ? "color-button d-flex selected-color-button"
                : "color-button d-flex"
            }
          >
            <div className="walking-button"></div>
            <span>Pasillo</span>
          </button>
          <button
            onClick={() => this.selectColor(typesOfCell.ACCESSIBILITY)}
            className={
              this.state.selectedColorOption === typesOfCell.ACCESSIBILITY
                ? "color-button d-flex selected-color-button"
                : "color-button d-flex"
            }
          >
            <div className="accessibility-button"></div>
            <span>Acccesibilidad</span>
          </button>
        </div>
      </div>
    );
  }
}
