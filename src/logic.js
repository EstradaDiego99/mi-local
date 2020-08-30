const { typesOfCell } = require("./globals");

function sum_array(our_array) {
  let sum = 0;
  for (var i = 0; i < our_array.length; i++)
    sum += our_array[i].capacidad * our_array[i].cantidad;
  return sum;
}

function poner_muebles(space, final_object_array, distancia) {
  let rows_space = space.length;
  let columns_space = space[0].length;

  /** Actualizando la lista de objetos para tener toda la cantidad necesaria */
  const finalObject = [];
  for (const i in final_object_array) {
    for (var w = 0; w < final_object_array[i].cantidad; w++)
      finalObject.push(final_object_array[i]);
  }

  loop0: for (var i = 0; i < rows_space; i++) {
    for (var j = 0; j < columns_space; j++) {
      // console.log("final position: (" + rows_space + "," + columns_space + ")");
      // console.log("actual position: (" + i + "," + j + ")");
      // console.log("see element");

      // console.log(final_object_array[0][final_object_array[0].length - 1]);

      let ancho = j + finalObject[finalObject.length - 1].forma[0].length;
      let alto = i + finalObject[finalObject.length - 1].forma.length;
      // console.log("x:");
      // console.log(alto);
      // console.log("y:");
      // console.log(ancho);

      //revisar si no salgo de los bordes que configuré en el espacio
      if (alto <= rows_space && ancho <= columns_space) {
        //copia del space
        const space_2 = [];
        for (var z = 0; z < space.length; z++) space_2[z] = space[z].slice();
        let sucess = true;
        loop1: for (var l = i; l < alto; l++) {
          for (var k = j; k < ancho; k++) {
            // console.log("figure position: (" + l + "," + k + ")");
            // console.log(space_2[l][k]);

            if (
              space_2[l][k] !== typesOfCell.BLOCKED &&
              space_2[l][k] !== typesOfCell.OBJECT &&
              space_2[l][k] !== typesOfCell.DISTANCE &&
              space_2[l][k] !== typesOfCell.ACCESSIBILITY &&
              space_2[l][k] !== typesOfCell.WALKING
            ) {
              if (finalObject[finalObject.length - 1].forma[l - i][k - j]) {
                space_2[l][k] = typesOfCell.DISTANCE;
              } else {
                space_2[l][k] = typesOfCell.OBJECT;
              }
              // console.log(space_2);
            } else {
              sucess = false;
              break loop1;
            }
          }
        }
        if (sucess) {
          for (
            var x = i - Math.floor(distancia * 2);
            x < alto + Math.floor(distancia * 2);
            x++
          ) {
            if (x < 0) continue;
            if (x >= rows_space) continue;
            for (
              var y = j - Math.floor(distancia * 2);
              y < ancho + Math.floor(distancia * 2);
              y++
            ) {
              if (y < 0) continue;
              if (y >= columns_space) continue;
              if (
                space_2[x][y] !== typesOfCell.BLOCKED &&
                space_2[x][y] !== typesOfCell.OBJECT &&
                space_2[x][y] !== typesOfCell.ACCESSIBILITY &&
                space_2[x][y] !== typesOfCell.WALKING
              ) {
                space_2[x][y] = typesOfCell.DISTANCE;
              }
            }
          }
          // console.log("success");
          i = alto - 1;
          j = ancho - 1;
          space = space_2;
          finalObject.pop();
          // console.log(finalObject[0]);
          // console.log(space);
          if (finalObject.length === 0) {
            break loop0;
          }
        }
      }
    }
  }

  return space;
}

module.exports = { sum_array, poner_muebles };
