import React, { Component } from "react";
import NewObjectGrid from "./new-object-grid.component";
import "./home.css";

export default class NewObject extends Component {
  constructor(props) {
    super(props);

    this.state = {
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

    this.increaseGridRow = this.increaseGridRow.bind(this);
    this.decreaseGridRow = this.decreaseGridRow.bind(this);
    this.increseGridColumn = this.increseGridColumn.bind(this);
    this.decreaseGridColumn = this.decreaseGridColumn.bind(this);
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
    this.props.objects.push("uwu");
    this.props.triggerNewObjectPanel();
    this.setState({ peopleQuantity: 2 });
    this.setState({ objectsQuantity: 1 });
    this.setState({
      newObjectMatrix: new Array(4).fill().map(() => new Array(4).fill(true)),
    });
  }

  render() {
    return (
      <form id="new-object" className="mt-4">
        <input
          id="new-object-name"
          placeholder="Nombre de nuevo objeto"
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
          <div className="d-flex flex-column">
            <div id="people-quantity-input" className="quantity-input d-flex">
              <span>P: </span>
              <button
                name="peopleQuantity"
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
                onClick={(event) => {
                  event.preventDefault();
                  this.updateQuantities(event, 1);
                }}
              >
                +
              </button>
            </div>
            <div id="objects-quantity-input" className="quantity-input d-flex">
              <span>O: </span>
              <button
                name="objectsQuantity"
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
                onClick={(event) => {
                  event.preventDefault();
                  this.updateQuantities(event, 1);
                }}
              >
                +
              </button>
            </div>
            <div className="flex-grow-1"></div>
            <button onClick={this.saveNewObject}>Guardar objeto</button>
          </div>
        </div>
      </form>
    );
  }
}
