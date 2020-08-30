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
    const objectMatrix = this.generateMatrix(this.state.matrix);
    // let widthInput = React.createRef();
    // let heightInput = React.createRef();

    return (
      <div>
        <h1>Selecciona tu espacio</h1>
        <form>
          <div className="form-row">
            <div className="form-group col-md-4">
              <label>Ancho: </label>
              <input
                type="text"
                name="width"
                autoComplete="nope"
                className="form-control"
                value={this.state.width}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group col-md-4">
              <label>Largo: </label>
              <input
                type="text"
                name="height"
                autoComplete="nope"
                className="form-control"
                value={this.state.height}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group col-md-4">
              <label></label>
              <button
                className="btn btn-primary button"
                onClick={this.updateSize}
              >
                Actualizar
              </button>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-12">
              <label>Tome en cuenta que las medidas estan en metros</label>
            </div>
          </div>
        </form>
        <div className="map">
          <div className="cells-container">{objectMatrix}</div>
        </div>
        <div className="objects">
          <button
            className="btn btn-primary"
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
    );
  }
}
