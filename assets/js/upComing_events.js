import darkTheme from './dark_theme.js';


darkTheme(".dark-theme-btn", "dark-mode", "dark-main");

let urlApi = "https://mindhub-xj03.onrender.com/api/amazing";

fetch(urlApi)
.then(response => response.json())
.then(data => {
  let upComing_events = data.events.filter(elemento => new Date(elemento.date) > new Date(data.currentDate))
  console.log(upComing_events);

  const contenedorCards = document.getElementById('cardsUpcoming');
  
  showCard(upComing_events, contenedorCards);
  temaOscuro();

  const contenedorCheck = document.getElementById('container-form-check');
  recorrerCardsYRenderizarNombreCategoria(upComing_events, contenedorCheck);  

  let inputsChequeados = []

  let checkboxes = document.querySelectorAll('input[type=checkbox]');
  checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        inputsChequeados = Array.from(checkboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.id)
        console.log(inputsChequeados)
        filterCruzade(upComing_events, inputsChequeados, stringSearch, contenedorCards);
        temaOscuro()
      })
  });


  let stringSearch = ""

  const search_input = document.getElementById("example-search-input");
  console.log(search_input)
  search_input.addEventListener('keyup', () => {
      stringSearch = search_input.value
      filterCruzade(upComing_events, inputsChequeados, stringSearch, contenedorCards);
      temaOscuro();
  });

})
.catch(error => console.log(error.message))


function showCard(listCards, container) {
    container.innerHTML = ''

    if (listCards.length > 0) {

      let fragment = document.createDocumentFragment()
      for (let card of listCards) {
        let div = document.createElement('div')
        div.classList.add("col-sm-12","col-md-6","col-lg-3","container-secondary-card","d-flex","justify-content-center");
        const tarjeta = `
          <div class='card d-flex align-items-center mt-2' data-dark>
            <img src=${card.image} class="card-img-top img-card pt-3" alt='carta'>
            <div class='card-body'>
              <h5 class='card-title text-center'>${card.name}</h5>
              <p class='card-text'>${card.description}</p>
            </div>
            <div class='card-footer d-flex align-items-center justify-content-between w-100'>
              <small class='text-muted'>price: $${card.price}</small>
              <a href="./details.html?id=${card._id}" class="btn btn-primary">ver mas</a>
            </div>
          </div>
        `;
        div.innerHTML += tarjeta;
        fragment.appendChild(div);  
      }
      container.appendChild(fragment)
    } else {
      let div = document.createElement('div')
      div.innerHTML = `<p class="fs-2 text-center w-100">Not Found Category</p>`
      container.appendChild(div)
  }
};


const recorrerCardsYRenderizarNombreCategoria = (array, contenedor) => {
  const arrayCategorias = array.map(item => item.category);
  const listaDeCategorias = new Set(arrayCategorias);
  let listaCategoriasUnicas = [...listaDeCategorias];
  let fragment = document.createDocumentFragment();
  listaCategoriasUnicas.forEach(categoria => {
    let div = document.createElement('div');
    div.classList.add('form-check', 'form-check-inline');
    div.innerHTML = `<input class="form-check-input" type="checkbox" id=${categoria.split(" ").join("_")} value=${categoria} >
    <label class="form-check-label ms-1" for=${categoria.split(" ").join("_")}>${categoria}</label>`
    fragment.appendChild(div);
  })
  contenedor.appendChild(fragment);
};


const temaOscuro = () => {
  const temaCard = document.querySelectorAll(".card");
  const temaPrice = document.querySelectorAll("small");
    for (let i = 0; i < temaCard.length; i++) {
      temaCard[i].classList.toggle("dark-mode");
      temaPrice[i].classList.toggle("dark-mode");
    }
};


function filterArray(arrayString, listCards) {
    if (arrayString.length == 0) return listCards
    return listCards.filter(elemento => arrayString.includes(elemento.category.replace(" ", "_")))
};


function filterString(string, listCards) {
    if (string == "") return listCards
    return listCards.filter(elemento => elemento.name.toLowerCase().includes(string.toLowerCase().trim()))
};

function filterCruzade(listCards, inputsChequeados, stringSearch, contenedor) {
    let arrayFilterCheck = filterArray(inputsChequeados, listCards)
    let arrayFilterString = filterString(stringSearch, arrayFilterCheck)

    showCard(arrayFilterString, contenedor)
};

