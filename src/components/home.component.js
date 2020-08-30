import React, { Component } from "react";
import NewObject from "./new-object.component";
import ObjectsList from "./objects-list.component";
import "./home.css";
import { typesOfCell } from "../globals";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      /** Width of the local space in meters */
      width: 10.0,

      /** Height of the local space in meters */
      height: 10.0,

      /** Grid used to represent the local space */
      matrix: new Array(20).fill().map(function () {
        return new Array(20).fill(typesOfCell.AVAILABLE);
      }),

      /** Objects we will store */
      objects: [],

      /** Do we show the new object panel? */
      showNewObject: false,

      /** Selected color to click on when selecting the local grid */
      selectedColorOption: typesOfCell.BLOCKED,

      /** The total amount of customers we have based on the objects we have */
      aforoTotal: 0,

      /** The percentage of the total amount of customers we can hold */
      porcentajeAforo: 100.0,

      /** Amount in meters of distance necesary between groups of people */
      minDistance: 0.0,

      /** Amount in people total we will be able to hold */
      gentePermitida: 0,
    };

    this.updateMatrix = this.updateMatrix.bind(this);
    this.updateSize = this.updateSize.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.triggerNewObjectPanel = this.triggerNewObjectPanel.bind(this);
    this.beGONE = this.beGONE.bind(this);
    this.removeObject = this.removeObject.bind(this);
    this.selectColor = this.selectColor.bind(this);
  }

  handleInputChange(event) {
    let { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  updateMatrix(i, j) {
    const neoMatrix = this.state.matrix;
    neoMatrix[i][j] = this.state.selectedColorOption;
    this.setState({ matrix: neoMatrix });
  }

  triggerNewObjectPanel() {
    this.setState({ showNewObject: !this.state.showNewObject });
  }

  updateSize(event) {
    event.preventDefault();
    let { width, height, matrix } = this.state;
    width = Math.round(width * 2) / 2;
    height = Math.round(height * 2) / 2;
    const neoMatrix = new Array(height * 2).fill().map(function () {
      return new Array(width * 2).fill(true);
    });

    var i = 0;
    while (i < Math.min(matrix.length, height * 2)) {
      var j = 0;
      while (j < Math.min(matrix[i].length, width * 2)) {
        neoMatrix[i][j] = matrix[i][j];
        j += 1;
      }
      while (j < width * 2) {
        neoMatrix[i][j] = true;
        j += 1;
      }
      i += 1;
    }
    while (i < height * 2) {
      for (j in neoMatrix[i]) {
        neoMatrix[i][j] = true;
      }
      i += 1;
    }

    this.setState({ matrix: neoMatrix });
  }

  removeObject(index) {
    const { objects } = this.state;
    objects.splice(index, 1);
    this.setState({ objects: objects });
  }

  beGONE() {
    console.log("beGONE!!!");
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
            className={this.colorFromMatrixState(this.state.matrix[i][j])}
            onClick={() => {
              this.updateMatrix(i, j);
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
    /** When the cell is true, the space is available */
    const objectMatrix = (
      <div className="cells-container">
        {this.generateMatrix(this.state.matrix)}
      </div>
    );

    return (
      <div>
        <header>
          <h1 className="mt-2">Acomodando mi espacio</h1>
          <div className="d-flex flex-wrap container mt-5">
            <div className="col-6 col-md-4 mb-3">
              <label>Porcentaje de Aforo: </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  name="porcentajeAforo"
                  value={this.state.porcentajeAforo}
                  onChange={this.handleInputChange}
                ></input>
                <div className="input-group-append">
                  <span className="input-group-text">%</span>
                </div>
              </div>
              <small>
                De un aforo total de {this.state.aforoTotal} personas
              </small>
            </div>
            <div className="col-6 col-md-4 mb-3">
              <label>Distancia mínima necesaria: </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  name="minDistance"
                  value={this.state.minDistance}
                  onChange={this.handleInputChange}
                ></input>
                <div className="input-group-append">
                  <span className="input-group-text">mts</span>
                </div>
              </div>
            </div>
            <div id="admittance-text-summary" className="col-12 col-md-3">
              <p className="mt-1">Admitiendo</p>
              <p>
                <strong>{this.state.gentePermitida}</strong>
              </p>
              <p> personas</p>
            </div>
          </div>
        </header>

        <button
          id="calculate-layout"
          className="btn btn-primary button col-10"
          onClick={this.beGONE}
        >
          Calcular acomodo
        </button>

        <div className="container d-flex flex-wrap">
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
                <span>Available</span>
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
                <span>Blocking</span>
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
                <span>Walking</span>
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
                <span>Accessibility</span>
              </button>
            </div>
          </div>
          <div className="col-12 col-md-6 mt-4 mb-5">
            <button
              className="btn btn-primary col-md-12"
              onClick={this.triggerNewObjectPanel}
            >
              Nuevo mueble
            </button>
            <div
              id="new-object-container"
              className={this.state.showNewObject ? "display " : "d-none"}
            >
              <NewObject
                objects={this.state.objects}
                triggerNewObjectPanel={this.triggerNewObjectPanel}
              />
            </div>
            <ObjectsList
              objects={this.state.objects}
              updateObjectPeopleQuantity={this.updateObjectPeopleQuantity}
              removeObject={this.removeObject}
            />
          </div>
        </div>
      </div>
    );
  }
}
