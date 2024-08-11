const { type } = require("os");
const internal = require("stream");



try {
  let obj;
  console.log(obj.propiedad)
} catch (e) {
  console.log('Se ha producido un error: ', e.message, typeof(e))
} finally {
  console.log('La ejecucion a finalizado')
}


// DIFICULTAD EXTRA

function sumar(n1,n2) {
  if(n1 < 0 || n2 <0) throw new Error('No se aceptan numeros negativos')
  return n1 + n2;
}

function restar(n1,n2) {
  if(n1 < 0 || n2 <0) throw new Error('No se aceptan numeros negativos')
  if (n1 < n2) throw new Error('La operacion da como resultados numeros negativos');
  return n1 - n2;
}

function dividir(n1,n2) {
  if(n1 < 0 || n2 <0) throw new Error('No se aceptan numeros negativos')
  if(n2 === 0) throw new Error('No se puede dividir entre 0');
  return n1/n2;
}

function multiplicar(n1,n2) {
  if(n1 < 0 || n2 <0) throw new Error('No se aceptan numeros negativos')
  return n1 * n2;
}

const readLine = require('readline');
const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout
})

function operaciones(n1,n2) {
  try {
    if(typeof n1 != 'number' || typeof n2 != 'number') {
      throw new Errors('Solo se aceptan numeros')
    }
    
    console.log('\n1. Sumar');
    console.log('2. Restar');
    console.log('3. Dividir');
    console.log('4. Multiplicar');
    console.log('5. Salir');
    rl.question('Elige la operacion que quieres realizar: ', (opcion) => {
      switch (opcion) {
        case '1':
          console.log(sumar(n1,n2));
          operaciones(n1,n2)
          break;
        case '2':
          console.log(restar(n1,n2));
          operaciones(n1,n2)
          break;
        case '3':
          console.log(dividir(n1,n2));
          operaciones(n1,n2)
          break;
        case '4':
          console.log(multiplicar(n1,n2));
          operaciones(n1,n2)
          break;
        case '5':
          console.log('Saliendo...')
          rl.close()
          break;
        default:
          console.log('Debes elegir una opcion')
          operaciones(n1,n2)
      }
    })

  } catch(e) {
    console.log('Ocurrio un error: ', e.message)
  }
}

operaciones(23,'h')
