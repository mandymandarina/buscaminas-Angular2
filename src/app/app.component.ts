import { Component, ViewChild, ElementRef } from '@angular/core';
//variable globales
let arrayCeldas: any;
let celdasDescubiertas: any;
let puntos = 0;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	puntos = "0";
	contenido: String = "";
    arrayInteraccion = [];
	@ViewChild('containerceldas') containerceldas: ElementRef;
	@ViewChild('panel') panel: ElementRef;
	@ViewChild('menu') menu: ElementRef;
	@ViewChild('perdiste') perdiste: ElementRef;
	@ViewChild('btnAtras') btnAtras: ElementRef;

	ngAfterViewInit() {
	}
	constructor() {
	}
	ngOnInit(): void {
	}
   /*  //Botón volver
	atras() {
		this.panel.nativeElement.style.visibility = "hidden";
		this.containerceldas.nativeElement.style.visibility = "hidden";
		this.menu.nativeElement.style.visibility = "visible";
		this.btnAtras.nativeElement.style.visibility = "hidden";
		detenerContador();
	} */
    //Recibe el número de piezas que se mostraran
	createTable(arrayCeldas: any):any {
		this.menu.nativeElement.style.visibility = "hidden";
		this.panel.nativeElement.style.visibility = "visible";
		this.containerceldas.nativeElement.style.visibility = "hidden";
		//this.btnAtras.nativeElement.style.visibility = "visible";
		
        let cuadrado = Math.sqrt(arrayCeldas.length);
		var tableceldas = document.createElement('table');
		var tbody = document.createElement('tbody');
		var celdaNumber = 0;
        for (var i = 0; i < cuadrado; i++) {
			var fila = document.createElement('tr');
            for (var c = 0; c < cuadrado; c++) {
				var columna = document.createElement('td');
				columna.id = "piece" + celdaNumber;
				columna.addEventListener("click", InteraccionCeldas);
				columna.style.backgroundImage = "url(\"assets/bloque.png\")";
				columna.style.width = "50px";
				columna.style.height = "50px";
				columna.style.backgroundSize = "contain";
                celdaNumber++;
				fila.appendChild(columna);
			}
            tbody.appendChild(fila);
		}
		tableceldas.appendChild(tbody);
		this.containerceldas.nativeElement.appendChild(tableceldas);
		this.containerceldas.nativeElement.style.visibility = "visible";
    }
    //selecciona la dificuldad
	selectGame(dificult: number) {
		var celdas;
		var bombas;
        switch (dificult) {
			case 0:
				celdas = 25;
				bombas = 5;
				break;
            case 1:
				celdas = 100;
				bombas = 10;
				break;
		}
        var arrayInteraccion = new Array(celdas);
		arrayInteraccion = this.Bombs(arrayInteraccion, bombas);
		arrayInteraccion = this.ubicacionBombs(arrayInteraccion, celdas);
		arrayCeldas = arrayInteraccion;
		this.createTable(arrayInteraccion);

		formatTime();
	}
	//colocar bombas
	Bombs(arrayCeldasBombs: any, numberBombs: any) {
		// posiciones aleatorias de las bombas
		var bombsPosition: any[] = [];
		for (var i = 0; i < numberBombs; i++) {
			let numberPosition = -1;
			var validacion = false;
            while (!validacion) {
				numberPosition = Math.floor((Math.random() * arrayCeldasBombs.length));
                if (!bombsPosition.includes(numberPosition)) {
					validacion = true;
				}
			}
			bombsPosition.push(numberPosition);
		}
		// se colocan las bombas
		for (var i = 0; i < bombsPosition.length; i++) {
			arrayCeldasBombs[bombsPosition[i]] = -1;
		}
		return arrayCeldasBombs;
	}
    //Comprueba las bombas que hay alrededor de las celdas
	 ubicacionBombs (arrayCuadrados: any, numCuadrados: any) :any {
		// Comenzamos comprobación
		let cuadrado = Math.sqrt(numCuadrados);
        // Analizamos cada pieza 
		for (var i = 0; i < arrayCuadrados.length; i++) {
			var BombSum = 0;
            // Descartamos que sea bomba
			if (arrayCuadrados[i] != -1) {
				var izquierda: boolean = true, derecha: boolean = true, arriba: boolean = true, abajo: boolean = true;
                // izquierda 
				if (Math.floor(i / cuadrado) != Math.floor((i - 1) / cuadrado)) {
					izquierda = false;
				}
                // derecha 
				if (Math.floor(i / cuadrado) != Math.floor((i + 1) / cuadrado)) {
					derecha = false;
				}
				// arriba 
				if ((i - cuadrado) == undefined) {
					arriba = false;
				}
                // abajo 
				if ((i + cuadrado) == undefined) {
					abajo = false;
	            }
                // verifica en las direcciones
                // Izquierda
				if (izquierda && arrayCuadrados[(i - 1)] == -1) { 
					BombSum++ 
				}
				// Derecha
				if (derecha && arrayCuadrados[(i + 1)] == -1) { 
					BombSum++ 
				}
				// Arriba
				if (arriba && arrayCuadrados[(i - cuadrado)] == -1) { 
					BombSum++ 
				}
				// Abajo
				if (abajo && arrayCuadrados[(i + cuadrado)] == -1) { 
					BombSum++ 
				}
				// Arriba Izquierda
				if (arriba && izquierda && arrayCuadrados[(i - cuadrado - 1)] == -1) { 
					BombSum++ 
				}
				// Arriba Derecha
				if (arriba && derecha && arrayCuadrados[(i - cuadrado + 1)] == -1) { 
					BombSum++ 
				}
				// Abajo Izquierda
				if (abajo && izquierda && arrayCuadrados[(i + cuadrado - 1)] == -1) { 
					BombSum++ 
				}
				// Abajo Derecha
				if (abajo && derecha && arrayCuadrados[(i + cuadrado + 1)] == -1) { 
					BombSum++ 
				}
			} else {
				BombSum = -1;
			}
            arrayCuadrados[i] = BombSum;
		}
        return arrayCuadrados;
}
}
 //contador de tiempo
const tiempoInicial = new Date().getTime();
function formatTime() {
	const tiempoActual = new Date().getTime();
	const segundosTranscurridos = Math.floor((tiempoActual - tiempoInicial) / 1000);
	const minutos = Math.floor(segundosTranscurridos / 60);
	const segundos = segundosTranscurridos % 60;
	const minutosFormateados = minutos < 10 ? "0" + minutos : minutos;
	const segundosFormateados = segundos < 10 ? "0" + segundos : segundos;
	const contador = document.getElementById('contador');
	if (contador !== null) {
		contador.innerHTML = `${minutosFormateados}:${segundosFormateados}`;
	} else {
		console.error('error de null');
	}
};
// Actualizar el contador cada segundo
let intervalId = setInterval(formatTime, 1000);
const detenerContador = () => {
	clearInterval(intervalId);
};
//movimiento de las celdas y clicks
function InteraccionCeldas() {
    let numeroPieza = this.id.replace("piece", "");
    // BOMBA
	let listbombas = [];
	let ceros = [];
	
	// Posiciones de las bombas
	for (let i = 0; i < arrayCeldas.length; i++) {
		// donde estan las bombas
		if (arrayCeldas[i] == -1) {
			listbombas.push(i);
		}
	}
	if (arrayCeldas[numeroPieza] == -1) {
    // colocar bomba a las celdas y se descubran
		for (let i = 0; i < listbombas.length; i++) {
			var element = document.getElementById('piece' + listbombas[i]);
			if (element === null) {
				alert('error');
			} else {
				element.style.backgroundImage = "url(\"bomba.jpg\")";
            }
			var element2 = document.getElementById("piece" + listbombas[i]);
			if (element2 === null) {
				alert('error');
			} else {
				element2.style.backgroundSize = "contain";
			}
		}
        // Eliminar todos los click
		let celdas = document.getElementsByTagName("td");
		for (let i = 0; i < celdas.length; i++) {
			celdas[i].removeEventListener("click", InteraccionCeldas);
		}
		// se termina el juego
		detenerContador();
		setTimeout(function() {
			alert("Perdiste.. :C");
		  }, 1000);
	} else {
    for (let i = 0; i < arrayCeldas.length; i++) {

			// donde hay ceros
			if (arrayCeldas[i] == 0) {
				ceros.push(i);
			}
		}
		if (arrayCeldas[numeroPieza] == 0) {
		for (let i = 0; i < ceros.length; i++) {
			var element = document.getElementById('piece' + ceros[i]);
			if (element === null) {
				alert('error');
			} else {
				element.style.backgroundImage = "url(\"assets/descubierto.png\")";
            }
		}
	}
	debugger
		puntos += arrayCeldas[numeroPieza] * 2;
		var point = document.getElementById("puntuacion");
		if (point === null) {
			alert('error');
		} else {
			point.textContent = "Puntuación: " + puntos;
		}
		this.textContent = arrayCeldas[numeroPieza];
		this.style.backgroundImage = "url(\"assets/bloque.png\")"
		this.style.backgroundSize = "contain";
		this.style.textAlign = "center";
		this.style.fontSize = "40px";
		if (this.textContent == 0) {
			this.style.backgroundImage = "url(\"assets/descubierto.png\")"
			this.style.color = "#b8b7b7"
		} else if (this.textContent == 1) {
			this.style.backgroundImage = "url(\"assets/descubierto.png\")"
		} else if (this.textContent == 2) {
			this.style.color = "green"
			this.style.backgroundImage = "url(\"assets/descubierto.png\")"
		} else if (this.textContent == 3) {
			this.style.color = "red"
			this.style.backgroundImage = "url(\"assets/descubierto.png\")"
		} else if (this.textContent == 4) {
			this.style.color = "blue"
			this.style.backgroundImage = "url(\"assets/descubierto.png\")"
		}
        // Comprobamos que ha ganado
		//lista de descubiertos
		for (let i = 0; i < arrayCeldas.length; i++) {
               // donde hay ceros
			if (arrayCeldas[i] == 0 && arrayCeldas[i] == 1 && arrayCeldas[i] == 2 && arrayCeldas[i] == 3) {
				celdasDescubiertas.push(i);
			}
        }
        if (celdasDescubiertas.length == (arrayCeldas.length - listbombas.length)) {
			debugger
			this.detenerContador();
			setTimeout(function() {
				alert("¡Ganaste! :)");
			  }, 1000);
			var piece = document.getElementById("puntuacion");
			if (piece === null) {
				alert('error');
			} else {
				piece.innerHTML = "Ganaste | " + puntos;
			}
		}
	}
	
	removeEventListener("click", InteraccionCeldas);
}