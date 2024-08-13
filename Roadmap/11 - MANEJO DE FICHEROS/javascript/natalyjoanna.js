
// Funcion para crear archivo txt
var fs = require('fs');

filename = 'natalyjoanna.txt'
const content = `Nombre: Nataly Joanna \nEdad: 23 \nLenguaje: Javascript`

// Crear y escribir al archivo
fs.writeFile(filename, content, (error) => {
  if (error) console.log('Ocurrio un error: ', error.message);

  console.log('El archivo se creo correctamente')
});

// Leer el archivo
fs.readFile(filename, 'utf8', (error, data) => {
  if (error) {
    console.log('Ocurrio un error: ', error.message);
    return;
  }
  console.log(data)
})

// Eliminar archivo
fs.unlink(filename, (error) => {
  if (error)  {
    console.log('Ocurrio un error: ', error.message)
    return;
  }
  console.log('El archivo ha sido eliminado')
})

// DIFICULTAD EXTRA

var readline = require('readline');
var rl = readline.createInterface ({
  input: process.stdin,
  output: process.stdout
});

function menu(filename, name, quantity, price) {
  console.log('\n1. Añadir');
  console.log('2. Consultar');
  console.log('3. Actualizar');
  console.log('4. Calcular venta total por producto');
  console.log('5. Salir');
  rl.question('Elige una opcion: ', (opcion) => {
    switch (opcion) {
      case '1':
        addSale(filename, name, quantity, price);
        break;
      case '2':
        readSale(filename, name, quantity, price);
        break;
      case '3':
        updateSale(filename, name, quantity, price);
        break;
      case '4':
        productTotal(filename, name, quantity, price);
        break;
      case '5':
        end(filename);
        break;
      default:
        console.log('Debes elegir una de las opciones.')
        menu(filename, name, quantity, price)
    }
  })
}

// Obtener datos del producto
function productData() {
  rl.question('\nNombre del producto: ', (product_name) => {
    rl.question('Cantidad vendida: ', (quantity_sold) => {
      rl.question('Precio: ', (price_product) => {
        if (validateValues(product_name, quantity_sold, price_product)) {
          const price = price_product;
          const name = product_name;
          const quantity = quantity_sold;
          const filename = `${name.replace(/\s+/g, '')}.txt`;
          menu(filename, name, quantity, price);
        } else {
          console.log('Por favor, corrige los errores e inténtalo de nuevo.');
        }
      })
    })
  })
}


// Añadir nueva venta
function addSale(filename, name, quantity, price) {
  // console.log(`${filename}, ${name}, ${quatity}, ${price}`)
  const content = `nombre_producto: ${name} \ncantidad__vendida: ${quantity} \nprecio: ${price}`
  fs.writeFile(filename, content, (err) => {
    if (err) {
      console.log(`No se pudo añadir el producto: ${err.message}`);
      return;
    }
    console.log('Se añadio el producto');
    menu(filename, name, quantity, price);
  })
}

// consultar contenido del archivo
function readSale(filename, name, quantity, price) {
  fs.readFile(filename, 'utf-8', (err, data) =>{
    if (err) {
      console.log(`No se puedo leer el archivo: ${err.message}`);
      return;
    } 
    console.log(`\n${data}`);
    menu(filename, name, quantity, price);
  })
}

function updateSale(filename, name, quantity, price) {
  console.log('\n1. Actualizar nombre del producto');
  console.log('2. Actualizar cantidad del producto');
  console.log('3. Actualizar precio del producto');
  rl.question('\nElige un campo que actualizar: ', (opcion) => {
    switch(opcion) {
      case '1':
        rl.question('\nIntroduce el nuevo nombre del producto: ', (new_product_name) => {
          updateFile(filename, new_product_name, quantity, price);
        })
        break;
      case '2':
        rl.question('\Introduce la nueva cantidad del producto: ', (new_quantity_product) => {
          updateFile(filename, name, new_quantity_product, price);
        })
        break;
      case '3':
        rl.question('\Introduce el nuevo precio del producto: ', (new_price_product) => {
          updateFile(filename, name, quantity, new_price_product);
        })
        break;
      default:
        console.log('Debes elegir una opcion.');
        menuUpdate();
    }
  })
}

function updateFile(filename, name, quantity, price) {
  fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
      console.log('Error al leer el archivo: ', err.message)
      return;
    } 

    const new_data = `nombre_producto: ${name} \ncantidad__vendida: ${quantity} \nprecio: ${price}`
    // Sobreescribe los datos
    fs.writeFile(filename, new_data, (err) => {
      if (err) {
        console.log('Error al escribir el archivo: ', err.message)
      }
      console.log('El archivo ha sido actualizado.')
      menu(filename, name, quantity, price)
    });
    
  })
}

// Calcular total de ventas
function productTotal(filename, name,  quantity, price) {
  console.log('\nLa venta total por producto es :', (quantity*price));
  menu(filename, name, quantity, price);
}

function end(filename) {
  fs.unlink(filename, (err) => {
    if(err) {
      console.log('Error al elimiar el archivo: ', err.message);
      return;
    }
    console.log('Eliminando el archivo y saliendo del programa...');
    rl.close();
  }) 

}

// validar la estradas del usuario
function validateValues(name, quantity, price) {
  const regex_numbers = /^[0-9]+$/;
  const regex_decimal_numbers = /^[0-9]+(\.[0-9]+)?$/;

  if (!name.trim()) {
    console.log('El nombre del producto no puede estar vacío.');
    return false;
  }

  if (!regex_numbers.test(quantity)) {
    console.log('Introduce solo valores numéricos para la cantidad.');
    return false;
  }

  if (!regex_decimal_numbers.test(price)) {
    console.log('Introduce un valor numérico válido para el precio (puede incluir decimales).');
    return false;
  }

  return true;
}

productData();