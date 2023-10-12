class Calculadora {
    constructor() {
        this.operacion = "";
        this.resultado = 0;
        this.operadorAnterior = "";
        this.historial = [];
    }

    iniciarCalculadora() {
        let nombre = prompt("Por favor, ingresa tu nombre:");
        let edad = parseInt(prompt("Hola " + nombre + ", ¿cuál es tu edad?"));

        while (edad < 18) {
            alert("Lo siento, debes ser mayor de 18 años para usar la calculadora.");
            edad = parseInt(prompt("Hola " + nombre + ", ¿cuál es tu edad?"));
        }

        alert("Bienvenido, " + nombre + "! Ahora puedes usar la calculadora.");
    }

    limpiar() {
        this.operacion = "";
        this.resultado = 0;
        this.operadorAnterior = "";
        this.actualizarDisplay();
    }

    agregarNumero(numero) {
        this.operacion += numero;
        this.actualizarDisplay();
    }

    agregarOperador(operador) {
        this.operacion += " " + operador + " ";
        this.operadorAnterior = operador;
        this.actualizarDisplay();
    }

    agregarDecimal() {
        if (!this.operacion.includes(".")) {
            this.operacion += ".";
        }
        this.actualizarDisplay();
    }

    calcular() {
        if (this.operadorAnterior !== "") {
            this.resultado = eval(this.operacion);
            this.operacion = this.resultado.toString();
            this.operadorAnterior = "";
            this.actualizarDisplay();
            this.historial.push(this.operacion);
            this.mostrarHistorial();
        }
    }

    mostrarHistorial() {
        const historialDiv = document.getElementById("historial");
        historialDiv.innerHTML = "";

        this.historial.forEach((item, index) => {
            const operacionParaMostrar = document.createElement("p");
            operacionParaMostrar.textContent = `Operación ${index + 1}: ${item}`;
            historialDiv.appendChild(operacionParaMostrar);
        });
    }

    actualizarDisplay() {
        document.getElementById("display").value = this.operacion;
    }
}

const calculadora = new Calculadora();

document.getElementById("iniciar").addEventListener("click", function() {
    calculadora.iniciarCalculadora();
});

document.getElementById("limpiar").addEventListener("click", function() {
    calculadora.limpiar();
});

document.getElementById("decimal").addEventListener("click", function() {
    calculadora.agregarDecimal();
});

document.getElementById("calcular").addEventListener("click", function() {
    calculadora.calcular();
});


const operadores = document.querySelectorAll(".operador");
operadores.forEach((operador) => {
    operador.addEventListener("click", function() {
        const operadorValue = operador.getAttribute("data-operador");
        calculadora.agregarOperador(operadorValue);
    });
});

const numeros = document.querySelectorAll(".numero");
numeros.forEach((numero) => {
    numero.addEventListener("click", function() {
        const numeroValue = parseInt(numero.getAttribute("data-numero"));
        calculadora.agregarNumero(numeroValue);
    });
});