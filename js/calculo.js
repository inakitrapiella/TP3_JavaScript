class Calculadora {
    constructor() {
        this.operacion = "";
        this.resultado = 0;
        this.operadorAnterior = "";
        this.historial = JSON.parse(localStorage.getItem('historial')) || [];
        this.cargarHistorialDesdeLocalStorage();
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
            this.guardarHistorialEnLocalStorage();
        }
    }

    eliminarHistorial() {
        this.historial = [];
        this.mostrarHistorial();
        this.guardarHistorialEnLocalStorage();
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

    guardarHistorialEnLocalStorage() {
        localStorage.setItem('historial', JSON.stringify(this.historial));
    }

    cargarHistorialDesdeLocalStorage() {
        this.historial = JSON.parse(localStorage.getItem('historial')) || [];
        this.mostrarHistorial();
    }

    actualizarDisplay() {
        document.getElementById("display").value = this.operacion;
    }
}

const calculadora = new Calculadora();

document.getElementById("limpiar").addEventListener("click", function() {
    calculadora.limpiar();
});

document.getElementById("decimal").addEventListener("click", function() {
    calculadora.agregarDecimal();
});

document.getElementById("calcular").addEventListener("click", function() {
    calculadora.calcular();
});

document.getElementById("limpiarHistorial").addEventListener("click", function() {
    calculadora.eliminarHistorial();
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

const obtenerChiste = async () => {
    try {
        const response = await fetch("https://v2.jokeapi.dev/joke/Any");
        const data = await response.json();
        const chisteDiv = document.getElementById("chiste");

        if (data.type === "single") {
            chisteDiv.textContent = data.joke;
        } else if (data.type === "twopart") {
            chisteDiv.textContent = `${data.setup} ${data.delivery}`;
        }
    } catch (error) {
        console.error("Error al obtener el chiste", error);
    }
};

document.getElementById("obtenerChiste").addEventListener("click", obtenerChiste);