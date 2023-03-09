import cards from "./data-cards.js";
import darkTheme from "./dark_theme.js";

const contenedorCard = document.getElementById("cards");
const fragment = document.createDocumentFragment();
const contenedorCheck = document.getElementById('container-form-check');


const mostrarCard = (nombre) => {
  let div = document.createElement("div");
  div.classList.add("col-sm-12","col-md-6","col-lg-3","container-secondary-card","d-flex","justify-content-center");
  const tarjeta = `
    <div class='card d-flex align-items-center mt-2' data-dar>
      <img src=${nombre.image} class="card-img-top img-card pt-3" alt='carta'>
      <div class='card-body'>
        <h5 class='card-title text-center'>${nombre.name}</h5>
        <p class='card-text'>${nombre.description}</p>
      </div>
      <div class='card-footer d-flex align-items-center justify-content-between pt-4 w-100'>
        <small class='text-muted' data-dark>price: $${nombre.price}</small>
        <a href="./details.html?id=${nombre._id}" class="btn btn-primary btn-card">ver mas</a>
      </div>
    </div>
    `;
  div.innerHTML += tarjeta;
  fragment.appendChild(div); 
};


const recorrerCardsYRenderizarTarjetas = (contenedor) => {
  contenedor.innerHTML = '';
  cards.events.forEach((card) => mostrarCard(card));
  contenedor.appendChild(fragment)
};


const recorrerCardsYRenderizarNombreCategoria = () => {
  const arrayCategorias = cards.events.map(item => item.category);
  const listaDeCategorias = new Set(arrayCategorias);
  let listaCategoriasUnicas = [...listaDeCategorias];
  listaCategoriasUnicas.forEach(categoria => {
    let div = document.createElement('div');
    div.classList.add('form-check', 'form-check-inline');
    div.innerHTML = `<input class="form-check-input" type="checkbox" id=${categoria}.replace(' ','-') value=${categoria} >
    <label class="form-check-label" for=${categoria}.replace(' ','-')>${categoria}</label>`
    fragment.appendChild(div);
  })
  contenedorCheck.appendChild(fragment);
};


const temaOscuro = () => {
  const temaCard = document.querySelectorAll(".card");
  const temaPrice = document.querySelectorAll("small");
    for (let i = 0; i < temaCard.length; i++) {
      temaCard[i].classList.toggle("dark-mode");
      temaPrice[i].classList.toggle("dark-mode");
    }
};


const verificarCheckedEnInputCategoriaYRenderizarCard = (contenedor) =>{
  const checkboxes = document.querySelectorAll('input[type=checkbox]');
  console.log(checkboxes); 
  checkboxes.forEach(checkbox => checkbox.addEventListener('change', verificarCheckedYRenderizarCards)); 

  function verificarCheckedYRenderizarCards(){
    let inputsSeleccionados = [...checkboxes].filter(checkbox => checkbox.checked).map(elemento => elemento.value);
    buscarValorCheckboxYRenderizarCard(inputsSeleccionados ,contenedor)
    filtrarPorCategoriasYNombre( contenedor)
  }
  
};



function buscarValorCheckboxYRenderizarCard(lista,contenedor){
  const buscarPorValorCheckbox = () => {
    lista.filter(elemento => renderizarCards(elemento, contenedor));
  }; 

  if(lista.length === 0){
    recorrerCardsYRenderizarTarjetas(contenedor);
    temaOscuro();
  }else {
    contenedor.innerHTML = '';
    buscarPorValorCheckbox();
    temaOscuro();
  };
};


const recorrerCardsYBuscarNombre = (contenedor) => {
  const inputNombre = document.getElementById('example-search-input');

  let listaDeNombres = cards.events.map(nombre => nombre.name);

  inputNombre.addEventListener('input', filtrarNombre);
  
  function filtrarNombre(event){
    let nombre = listaDeNombres.filter(nombre => nombre.toLowerCase().search(event.target.value.toLowerCase().trim()) !== -1);
    
    if(nombre.length === 0){
      recorrerCardsYRenderizarTarjetas(contenedor);
      temaOscuro();
    }else{
      contenedor.innerHTML = '';
      renderizarCards(nombre, contenedor); 
      const temaCard = document.querySelector(".card");
      temaCard.classList.toggle('dark-mode');
    } 
    
  }  
};

let listaCategoriasElegidas = [];
let listaUnica = [];

function renderizarCards(elemento, contenedor) {
  for(const nombre of cards.events){
    if(nombre.name == elemento){
      mostrarCard(nombre);
    }else if(nombre.category.includes(elemento)){
      listaCategoriasElegidas.push(nombre)
      mostrarCard(nombre);
    }   
  };
  const listaNueva = new Set(listaCategoriasElegidas)
  listaUnica = [...listaNueva];
  contenedor.appendChild(fragment);
};


const filtrarPorCategoriasYNombre = (contenedor) => {
  const inputNombre = document.getElementById('example-search-input');

  inputNombre.addEventListener('input', filtrarNombre);
  
  function filtrarNombre(){
    for(const elemento of listaUnica){
      if(elemento.name == inputNombre.value){
        contenedor.innerHTML = '';
        mostrarCard(elemento);
      }
    }
    contenedor.appendChild(fragment); 
  }

}; 






recorrerCardsYRenderizarTarjetas(contenedorCard);
recorrerCardsYRenderizarNombreCategoria();
verificarCheckedEnInputCategoriaYRenderizarCard(contenedorCard); 
console.log( verificarCheckedEnInputCategoriaYRenderizarCard(contenedorCard));
recorrerCardsYBuscarNombre(contenedorCard);


darkTheme(".dark-theme-btn", "dark-mode", "dark-main");