let arrayCartas = [];
let arrayCartasPC = [];
let sumaPC = 0;
let suma;
let gano = false;
let sigueVivo = true;
let mensaje = "";
let totalGanado = 100;
let valorApostado = 0;
let mensajeJuego = document.querySelector("#mensaje");
let valorRondaPrevia = 100;
let empezoElJuego = false;

let cartas = document.querySelector("#cartas");
let sumaJuego = document.querySelector("#sumaJuego");

let valorApuestaJuego = document.querySelector("#valorApostado");

let totalDelJuego = document.querySelector("#total");

let sumar = (array) => {
  for (i = 0; i < array.length; i++) {
    suma += array[i];
  }
};

let sumarPC = (array) => {
  for (i = 0; i < array.length; i++) {
    sumaPC += array[i];
  }
};
const empezarJuego = () => {
  empezoElJuego = true;
  if (sigueVivo === true && !gano && valorApostado > 0) {
    suma = 0;
    sumar(arrayCartas);
    sumaJuego.textContent = `Suma: ${suma}`;
    cartas.textContent = `Cartas: ${arrayCartas.join("-")} `;

    if (suma <= 20) {
      mensaje = "¿Querés sacar una carta?";
    } else if (suma === 21) {
      mensaje = "¡Tenés Blackjack!";
      gano = true;
      calcularResultado(valorApostado);
    } else {
      mensaje = "¡Perdiste!";
      sigueVivo = false;
      calcularResultado(valorApostado);
    }
    mensajeJuego.textContent = mensaje;
  } else {
    sigueVivo = true;
    arrayCartas = [];
    arrayCartasPC = [];
    sumaPC = 0;
    mensaje = "¡Hacé una apuesta!";
    suma = 0;
    mensajeJuego.textContent = mensaje;
    sumaJuego.textContent = `Suma:`;
    cartas.textContent = `Cartas: ${arrayCartas.join("-")}`;
    sumaJuegoCompu.textContent = `Suma:`;
    cartasCompu.textContent = `Cartas: ${arrayCartasPC.join("-")}`;
    posibilidadSacarCarta = true;
    gano = false;
    empezoElJuego = false;
    valorApostado = 0;
    valorApuestaJuego.textContent = valorApostado;
    totalDelJuego.textContent = `$${totalGanado}`;
  }
};

let posibilidadSacarCarta = true;
const sacarCarta = () => {
  if (sigueVivo && posibilidadSacarCarta && !gano && empezoElJuego) {
    arrayCartas.push(generadorNumero(1, 12));
    empezarJuego();
  }
};

let generadorNumero = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

let cartasCompu = document.querySelector("#cartasCompu");
let sumaJuegoCompu = document.querySelector("#sumaJuegoCompu");

let cartasPC = () => {
  if (sigueVivo && suma !== 0 && !gano) {
    if (sumaPC <= suma) {
      sumaPC = 0;
      arrayCartasPC.push(generadorNumero(1, 12));
      sumarPC(arrayCartasPC);
      sumaJuegoCompu.textContent = `Suma: ${sumaPC}`;
      cartasCompu.textContent = `Cartas: ${arrayCartasPC.join("-")} `;
    }

    if (sumaPC > 21) {
      mensaje = "¡Ganaste!";
      sigueVivo = false;
      mensajeJuego.textContent = mensaje;
      gano = true;
      calcularResultado(valorApostado);
    }

    if (sumaPC > suma && sumaPC < 22) {
      mensaje = "¡Perdiste!";
      sigueVivo = false;
      calcularResultado(valorApostado);
      return (mensajeJuego.textContent = mensaje);
    }

    setTimeout(cartasPC, 1000);
    return (posibilidadSacarCarta = false);
  }
};

let apostar = (apuesta) => {
  if (totalGanado >= apuesta && !empezoElJuego) {
    totalGanado -= apuesta;

    valorApostado += apuesta;
    valorApuestaJuego.textContent = valorApostado;
    totalDelJuego.textContent = `$${totalGanado}`;
  }
};

let resetear = () => {
  if (!empezoElJuego) {
    valorApostado = 0;
    valorApuestaJuego.textContent = valorApostado;
    totalGanado = valorRondaPrevia;
    totalDelJuego.textContent = `$${totalGanado}`;
  }
};

let calcularResultado = (apuesta) => {
  if (gano) {
    totalGanado = totalGanado + apuesta * 2;
    valorRondaPrevia = totalGanado;
  } else {
    valorRondaPrevia = totalGanado;
  }
};
