
import darkTheme from "./dark_theme.js";

darkTheme(".dark-theme-btn", "dark-mode", "dark-table");

const urlApi = "https://mindhub-xj03.onrender.com/api/amazing";
const contenedorTabla1 = document.getElementById('tr_event');
const contenedorTabla2 = document.getElementById('table2');
const contenedorTabla3 = document.getElementById('table3');

async function traerInfoEventos(urlApi, contenedor){
    try{
        contenedor.innerHTML = '';
        const response = await fetch(urlApi)
        let data = await response.json()
        let arrayAsistencia = ordenarPorAsistencia(data.events)
        cargarTablaUno(arrayAsistencia, contenedorTabla1);

        cargarTablaEstadisticas(data.events.filter(elemento => elemento.estimate), contenedorTabla2)
        cargarTablaEstadisticas(data.events.filter(elemento => elemento.assistance), contenedorTabla3)
    }
    catch(error) {
        console.log(error.message);
    }
};

traerInfoEventos(urlApi, contenedorTabla1);

function ordenarPorAsistencia(array) {
    return array.filter(evento => evento.assistance).sort((a,b) => {
        if((a.assistance / a.capacity) > (b.assistance / b.capacity)) {
            return -1;
        }
        if((a.assistance / a.capacity) < (b.assistance / b.capacity)) {
            return 1
        }

        return 0;
    })
};


function cargarTablaUno(array, contenedor) {
    contenedor.innerHTML = '';
    let largoArray = array.length

    let fragment= document.createDocumentFragment();
    let tdMayorAsistencia = document.createElement("td");
    tdMayorAsistencia.setAttribute("colspan", 2);
    tdMayorAsistencia.innerHTML = `${array[0].name} : ${array[0].assistance / array[0].capacity * 100} %`;
    fragment.appendChild(tdMayorAsistencia);

    let tdMenorAsistencia = document.createElement('td');
    tdMenorAsistencia.setAttribute("colspan", 2);
    tdMenorAsistencia.innerHTML= `${array[array.length-1].name} : ${array[largoArray-1].assistance / array[(largoArray-1)].capacity * 100} %`;
    fragment.appendChild(tdMenorAsistencia);

    let tdMayorCapacidad = document.createElement('td');
    tdMayorCapacidad.setAttribute("colspan", 2);
    let mayorCapacidad = array.map(evento => evento.capacity).sort((a, b) => a - b)[largoArray-1];
    tdMayorCapacidad.innerHTML = `${array.find(evento => evento.capacity == mayorCapacidad).name} : ${mayorCapacidad}`;
    fragment.appendChild(tdMayorCapacidad);

    contenedor.appendChild(fragment);
};


function calcularGanancias(array, categoria) {
    let arrayCategoria = array.filter(elemento => elemento.category == categoria).reduce((total, evento) => {
      if(evento.assistance != undefined) return total += evento.price * evento.assistance 
      return total += evento.price * evento.estimate
    },0)

    return arrayCategoria;
};

function calcularAsistencia(array, categoria) {
    let arrayCategorias = array.filter(elemento => elemento.category == categoria).reduce((total, evento) => {
       if(evento.assistance != undefined) return total += evento.assistance / evento.capacity 
       return total += evento.estimate / evento.capacity
    },0) 

    return (arrayCategorias * 100 / array.filter(elemento => elemento.category == categoria).length).toFixed(2);
}

function cargarTablaEstadisticas(array, contenedor) {
    let categorias = [...new Set(array.map(elemento => elemento.category))];

    let fragment = document.createDocumentFragment();

    for(let categoria of categorias){
        let trContenedor = document.createElement('tr');
        trContenedor.innerHTML = `<td colspan="2">${categoria}</td>
                                  <td colspan="2">$ ${calcularGanancias(array, categoria)}</td>
                                  <td colspan="2">${calcularAsistencia(array, categoria)} %</td>`
        fragment.appendChild(trContenedor);                         
    }
    contenedor.appendChild(fragment);
}
