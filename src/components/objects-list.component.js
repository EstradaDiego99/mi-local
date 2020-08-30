import React, { Component } from "react";
import "./home.css";

export default class ObjectsList extends Component {
  constructor(props) {
    super(props);
    this.generateObjectsList = this.generateObjectsList.bind(this);
  }

  getObjectGrid(matrix) {
    const buttonsList = [];
    for (const i in matrix) {
      const row = [];
      for (const j in matrix[i]) {
        row.push(
          <button
            className={matrix[i][j] ? "cell available" : "cell unavailable"}
          >
            .
          </button>
        );
      }
      buttonsList.push(<div className="row-cells">{row}</div>);
    }
    return buttonsList;
  }

  // TODO(diego): Update function when having matrix with complex shapes
  // Capacidad = peopleQuantity
  generateObjectsList(objects) {
    const objectsList = [];
    for (const i in objects) {
      objectsList.push(
        <div className="object-component">
          <p>{objects[i].nombre}</p>
          <div className="d-flex">
            <div>{this.getObjectGrid(objects[i].forma)}</div>
            <div>
              <div>
                <span>Capacidad: </span>
                <span>{objects[i].capacidad}</span>
              </div>
              <div>
                <span>Cantidad: </span>
                <span>{objects[i].cantidad}</span>
              </div>
            </div>
            <button onClick={() => this.props.removeObject(i)}>Eliminar</button>
          </div>
        </div>
      );
    }
    return objectsList;
  }

  render() {
    return (
      <div id="objects-container">
        {this.generateObjectsList(this.props.objects)}
      </div>
    );
  }
}
