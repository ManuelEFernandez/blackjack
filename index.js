let primeraCarta = 0;
let segundaCarta = 0;
let suma = primeraCarta + segundaCarta;
let tieneBlackjack = false;
let sigueVivo = true;
let mensaje = "";

let mensajeJuego = document.querySelector("#mensaje");

let cartas = document.querySelector("#cartas");
let sumaJuego = document.querySelector("#sumaJuego");



const empezarJuego = () => {
    if (sigueVivo === true) {
    sumaJuego.textContent = `Suma: ${suma}`;
    cartas.textContent = `Cartas: ${primeraCarta} || ${segundaCarta}`;

    if (suma <= 20) {

        mensaje = "¿Querés sacar una nueva carta?";
       
    }

    else if (suma === 21) {
        
        mensaje = "¡Tenés Blackjack!"
        tieneBlackjack = true;
     
    }

    else {

        mensaje = "¡Perdiste!";
        sigueVivo = false;
       
    };
    mensajeJuego.textContent = mensaje;
}

else {
    sigueVivo = true;
    primeraCarta = 0;
    segundaCarta = 0;
    mensaje = "¿Querés jugar?";
    suma = 0;
    mensajeJuego.textContent = mensaje;
    sumaJuego.textContent = `Suma: ${suma}`;
    cartas.textContent = `Cartas: ${primeraCarta} || ${segundaCarta}`;
    

}
}

const sacarCarta = () => {

   if (suma < 22) {
   let valorCarta = generadorNumero(1, 12);

   if (primeraCarta === 0) {

    primeraCarta = valorCarta;
    suma += primeraCarta;
    empezarJuego();
   }
    
   else {

    
  segundaCarta = valorCarta;
  suma += segundaCarta;
  empezarJuego();
   }
} 

else {

    return;
}
}

   
let generadorNumero = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  };