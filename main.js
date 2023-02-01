//Inicialización de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 60;
let timerInicial = 60;
let tiempoRegresivoId = null

//
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('tiempoRestante');
let btnReiniciar = document.getElementById('btn-reiniciar');

//Generación de números aleatorios
let num = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
num = num.sort(() => Math.random() - 0.5);
console.log(num);

// Funciones
function contarTiempo() {
    tiempoRegresivoId = setInterval(() => {
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if (timer == 0) {
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas();
            btnReiniciar.hidden = false;
        }
    }, 1000);
}

function bloquearTarjetas() {
    for (let i = 0; i <= 15; i++) {
        let tarjetasBloqueada = document.getElementById(i);
        tarjetasBloqueada.innerHTML =`<img src="./img/${num[i]}.png" alt"">`;
        tarjetasBloqueada.disabled = true;
    }
}

btnReiniciar.addEventListener('click', ()=>{
    console.log(btnReiniciar);
    location.reload();
});

//Función Principal
function destapar(id) {

    if (temporizador == false) {
        contarTiempo();
        temporizador = true;
    }

    tarjetasDestapadas++;


    if (tarjetasDestapadas == 1) {
        //Mostrar primer número
        tarjeta1 = document.getElementById(id);
        primerResultado = num[id]
        tarjeta1.innerHTML = `<img src="./img/${primerResultado}.png" alt"">` ;

        //Deshabilitar primer boton
        tarjeta1.disabled = true;
    } else if (tarjetasDestapadas == 2) {
        //Mostrar segundo número
        tarjeta2 = document.getElementById(id);
        segundoResultado = num[id]
        tarjeta2.innerHTML = `<img src="./img/${segundoResultado}.png" alt"">`;

        //Deshabilitar segundo boton
        tarjeta2.disabled = true;

        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if (primerResultado == segundoResultado) {
            tarjetasDestapadas = 0;

            // Aumentar aciertos
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

            if (aciertos == 8) {
                clearInterval(tiempoRegresivoId);
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 😱`;
                mostrarTiempo.innerHTML = `Fantástico! Sólo tardaste ${timerInicial - timer} segundos `;
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} 🤟😎 `;
                btnReiniciar.hidden = false;
            }

        } else {
            setTimeout(() => {
                tarjeta1.innerHTML = '';
                tarjeta2.innerHTML = '';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            }, 800);
        }
    }

}
