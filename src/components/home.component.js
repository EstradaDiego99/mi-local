import React, { Component } from "react";
import NewObject from "./new-object.component";
import ObjectsList from "./objects-list.component";
import "./home.css";

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
        return new Array(20).fill(true);
      }),

      /** Objects we will store */
      objects: [],

      /** Do we show the new object panel? */
      showNewObject: false,
    };

    this.updateMatrix = this.updateMatrix.bind(this);
    this.updateSize = this.updateSize.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.triggerNewObjectPanel = this.triggerNewObjectPanel.bind(this);
    this.removeObject = this.removeObject.bind(this);
  }

  handleInputChange(event) {
    let { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  updateMatrix(i, j) {
    const neoMatrix = this.state.matrix;
    neoMatrix[i][j] = !neoMatrix[i][j];
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

  generateMatrix(matrix) {
    const buttonsList = [];
    for (const i in matrix) {
      const row = [];
      for (const j in matrix[i]) {
        row.push(
          <button
            className={
              this.state.matrix[i][j] ? "cell available" : "cell unavailable"
            }
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
    // let widthInput = React.createRef();
    // let heightInput = React.createRef();

    return (
      <div>
        <header>
          <h1>Acomodando mi espacio</h1>
        </header>
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
                <div class="input-group-append">
                  <span class="input-group-text">mts</span>
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
                <div class="input-group-append">
                  <span class="input-group-text">mts</span>
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
