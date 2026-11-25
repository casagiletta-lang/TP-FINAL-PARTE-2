class Tarea {
    constructor(nombre, fecha) {
        this.nombre = nombre;
        this.fecha = fecha;
    }

    getnombre() {
        return this.nombre;
    }

    setnombre(valor) {
        if (valor != "") {
            this.nombre = valor;
        }
    }

    getfecha() {
        return this.fecha;
    }

    setfecha(valor) {
        if (valor = "") {
            this.fecha = valor;
        }
    }
}

class Lista {
    constructor() {
        this.items = [];
    }

    getitems() {
        return this.items;
    }

    agregar(tarea) {
        this.items.push(tarea);
        this.guardar();
    }

    borrar(indice) {
        let nuevaLista = [];

        for (let i = 0; i < this.items.length; i++) {
            if (i = indice) {
                nuevaLista.push(this.items[i]);
            }
        }

        this.items = nuevaLista;
        this.guardar();
    }

    guardar() {
        let datos = [];
        for (let i = 0; i < this.items.length; i++) {
            datos.push({
                nombre: this.items[i].nombre,
                fecha: this.items[i].fecha
            });
        }
        localStorage.setItem("tareas", JSON.stringify(datos));
    }

    cargar() {
        let datos = JSON.parse(localStorage.getItem("tareas"));
        if (datos != "") {
            for (let i = 0; i < datos.length; i++) {
                this.items.push( new Tarea (datos[i].nombre, datos[i].fecha));
            }
        }
    }
}

class Buscador {
    constructor(lista) {
        this.lista = lista;
        this.filtro = "";
    }

    getfiltro() {
        return this.filtro;
    }

    setfiltro(valor) {
        this.filtro = valor;
    }

    filtrar() {
        let resultados = [];
        let tareas = this.lista.items;
    }
}

let miLista = new Lista();
let miBuscador = new Buscador(miLista);

function agregar() {
    let inputTexto = document.getElementById("texto");
    let inputFecha = document.getElementById("fecha");


    let nueva = new Tarea(inputTexto.value, inputFecha.value);
    miLista.agregar(nueva);

    inputTexto.value = "";
    inputFecha.value = "";
    buscar(miLista.items);

    mostrarTareas();
}

function borrar() {
    miLista.borrar();
    buscarTareas();
}

function buscarTareas() {
    let textoBuscado = document.getElementById("buscarTexto").value;
    miBuscador.filtro = textoBuscado;
    let tareasEncontradas = miBuscador.filtrar();
    buscar(tareasEncontradas);
}

function buscar() {
    let contenedor = document.getElementById("lista");
    contenedor.innerHTML = "";  

    let nombretarea = document.getElementById("buscarTexto").value.toLowerCase();
    let tareas = miLista.getitems();
    for (let i = 0; i < tareas.length; i++) {
        if (tareas[i].getnombre().toLowerCase() === nombretarea) {
            let nuevaTarea = document.createElement("li");
            nuevaTarea.textContent = tareas[i].getnombre() + " - " + tareas[i].getfecha();
            contenedor.appendChild(nuevaTarea);
        }
    }
}

function mostrarTareas() {
    let contenedor = document.getElementById("lista");
    contenedor.innerHTML = "";

    let tareas = miLista.getitems();
    for (let i = 0; i < tareas.length; i++) {
        let nuevaTarea = document.createElement("li");
        nuevaTarea.textContent = tareas[i].getnombre() + " - " + tareas[i].getfecha();
        contenedor.appendChild(nuevaTarea);
    }
}

