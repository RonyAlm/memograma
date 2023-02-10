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
let btnPagina = document.getElementById('btn-animales');

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
        if (btnPagina.value == 1) {
            tarjetasBloqueada.innerHTML =`<img src="./img/${num[i]}.png" alt"">`;
        } else if (btnPagina.value == 2){
            tarjetasBloqueada.innerHTML =`<img src="./img/paisajes/${num[i]}.png" alt"">`;
        }
        tarjetasBloqueada.disabled = true;
    }
}

btnReiniciar.addEventListener('click', ()=>{
    console.log(btnReiniciar);
    location.reload();
});

// btnPagina.addEventListener('click', ()=>{
//     console.log(btnPagina.value);
//     if (btnPagina.value == 1) {
//         window.location.href = "paisajes.html";
//     } else if (btnPagina.value == 2){
//         window.location.href = "index.html";
//     }
// });



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
        if (btnPagina.value == 1) {
            tarjeta1.innerHTML = `<img src="./img/${primerResultado}.png" alt"">` ;
        } else if (btnPagina.value == 2){
            tarjeta1.innerHTML = `<img src="./img/paisajes/${primerResultado}.png" alt"">` ;
        }

        //Deshabilitar primer boton
        tarjeta1.disabled = true;
    } else if (tarjetasDestapadas == 2) {
        //Mostrar segundo número
        tarjeta2 = document.getElementById(id);
        segundoResultado = num[id]
        if (btnPagina.value == 1) {
            tarjeta2.innerHTML = `<img src="./img/${segundoResultado}.png" alt"">`;
        } else if (btnPagina.value == 2){
            tarjeta2.innerHTML = `<img src="./img/paisajes/${segundoResultado}.png" alt"">`;
        }

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
