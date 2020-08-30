import React, { Component } from "react";
import NewObjectGrid from "./new-object-grid.component";
import "./home.css";

export default class NewObject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      /** Name of the object to save */
      newObjectName: "",

      /** Amount of people that object contains */
      peopleQuantity: 2,

      /** Amount of objects of this type */
      objectsQuantity: 1,

      /** Shape of the object */
      newObjectMatrix: new Array(4).fill().map(function () {
        return new Array(4).fill(true);
      }),
      widthGrid: 4,
      heightGrid: 4,
    };

    this.updateMatrix = this.updateMatrix.bind(this);
    this.saveNewObject = this.saveNewObject.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.increaseGridRow = this.increaseGridRow.bind(this);
    this.decreaseGridRow = this.decreaseGridRow.bind(this);
    this.increseGridColumn = this.increseGridColumn.bind(this);
    this.decreaseGridColumn = this.decreaseGridColumn.bind(this);
  }

  handleInputChange(event) {
    let { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  updateMatrix(i, j) {
    const { newObjectMatrix } = this.state;
    newObjectMatrix[i][j] = !newObjectMatrix[i][j];
    this.setState({ newObjectMatrix: newObjectMatrix });
  }

  increaseGridRow(event) {
    event.preventDefault();
    const { newObjectMatrix } = this.state;
    newObjectMatrix.push(new Array(this.state.widthGrid).fill(true));
    this.setState({
      heightGrid: this.state.heightGrid + 1,
    });
    this.setState({ newObjectMatrix: newObjectMatrix });
  }

  decreaseGridRow(event) {
    event.preventDefault();
    const { newObjectMatrix } = this.state;
    newObjectMatrix.pop();
    this.setState({
      heightGrid: this.state.heightGrid - 1,
    });
    this.setState({ newObjectMatrix: newObjectMatrix });
  }

  increseGridColumn(event) {
    event.preventDefault();
    const { newObjectMatrix } = this.state;
    for (const i in newObjectMatrix) {
      newObjectMatrix[i].push(true);
    }
    this.setState({
      widthGrid: this.state.widthGrid + 1,
    });
    this.setState({ newObjectMatrix: newObjectMatrix });
  }

  decreaseGridColumn(event) {
    event.preventDefault();
    const { newObjectMatrix } = this.state;
    for (const i in newObjectMatrix) {
      newObjectMatrix[i].pop();
    }
    this.setState({
      widthGrid: this.state.widthGrid - 1,
    });
    this.setState({ newObjectMatrix: newObjectMatrix });
  }

  updateQuantities(event, offset) {
    let { name } = event.target;
    this.setState({
      [name]: this.state[name] + offset,
    });
  }

  saveNewObject(event) {
    event.preventDefault();
    const matrixToPush = this.tripObjectBorders(this.state.newObjectMatrix);
    this.props.objects.push({
      nombre: this.state.newObjectName,
      forma: matrixToPush,
      capacidad: this.state.peopleQuantity,
      cantidad: this.state.objectsQuantity,
    });
    this.props.triggerNewObjectPanel();
    this.setState({ newObjectName: "" });
    this.setState({ peopleQuantity: 2 });
    this.setState({ objectsQuantity: 1 });
    this.setState({
      newObjectMatrix: new Array(4).fill().map(() => new Array(4).fill(true)),
    });
  }

  tripObjectBorders(matrix) {
    var emptyBorders = true;
    while (emptyBorders) {
      /** Check upper border */
      var emptyUpBorder = true;
      for (const j in matrix[0]) if (!matrix[0][j]) emptyUpBorder = false;
      if (emptyUpBorder) matrix.splice(0, 1);

      /** Check left border */
      var emptyLeftBorder = true;
      for (const i in matrix) if (!matrix[i][0]) emptyLeftBorder = false;
      if (emptyLeftBorder) for (const i in matrix) matrix[i].splice(0, 1);

      /** Check lower border */
      var emptyLowerBorder = true;
      for (const j in matrix[0])
        if (!matrix[matrix.length - 1][j]) emptyLowerBorder = false;
      if (emptyLowerBorder) matrix.pop();

      /** Check right border */
      var emptyRightBorder = true;
      for (const i in matrix)
        if (!matrix[i][matrix[0].length - 1]) emptyRightBorder = false;
      if (emptyRightBorder) for (const i in matrix) matrix[i].pop();

      emptyBorders =
        emptyUpBorder ||
        emptyLeftBorder ||
        emptyLowerBorder ||
        emptyRightBorder;
    }

    return matrix;
  }

  render() {
    return (
      <form id="new-object" className="mt-4">
        <input
          id="new-object-name"
          type="text"
          placeholder="Nombre de nuevo objeto"
          value={this.state.newObjectName}
          name="newObjectName"
          autoComplete="nope"
          onChange={this.handleInputChange}
        ></input>
        <div className="d-flex">
          <NewObjectGrid
            newObjectMatrix={this.state.newObjectMatrix}
            updateMatrix={this.updateMatrix}
            increaseGridRow={this.increaseGridRow}
            decreaseGridRow={this.decreaseGridRow}
            increseGridColumn={this.increseGridColumn}
            decreaseGridColumn={this.decreaseGridColumn}
          />
          <div className="d-flex flex-column ml-2 mt-2">
            <div id="people-quantity-input" className="quantity-input d-flex">
              <span>
                <img
                  alt=""
                  className="icono"
                  src="https://image.flaticon.com/icons/svg/1384/1384286.svg"
                />
              </span>
              <button
                name="peopleQuantity"
                className="btn btn-light ml-2 mr-2"
                onClick={(event) => {
                  event.preventDefault();
                  this.updateQuantities(event, -1);
                }}
              >
                -
              </button>
              <input type="text" value={this.state.peopleQuantity}></input>
              <button
                name="peopleQuantity"
                className="btn btn-light ml-2 mr-2"
                onClick={(event) => {
                  event.preventDefault();
                  this.updateQuantities(event, 1);
                }}
              >
                +
              </button>
            </div>
            <div id="objects-quantity-input" className="quantity-input d-flex">
              <span>
                <img
                  alt=""
                  className="icono"
                  src="https://image.flaticon.com/icons/svg/655/655628.svg"
                />
              </span>
              <button
                name="objectsQuantity"
                className="btn btn-light ml-2 mr-2"
                onClick={(event) => {
                  event.preventDefault();
                  this.updateQuantities(event, -1);
                }}
              >
                -
              </button>
              <input type="text" value={this.state.objectsQuantity}></input>
              <button
                name="objectsQuantity"
                className="btn btn-light ml-2 mr-2"
                onClick={(event) => {
                  event.preventDefault();
                  this.updateQuantities(event, 1);
                }}
              >
                +
              </button>
            </div>
            <div className="flex-grow-1"></div>
            <button className="btn btn-primary" onClick={this.saveNewObject}>
              Guardar objeto
            </button>
          </div>
        </div>
      </form>
    );
  }
}
