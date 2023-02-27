import cards from "./data-cards.js";
import darkTheme from './dark_theme.js';


window.addEventListener("load", function () {
  const recorrerCardsYRenderizarTarjetasUpcoming = () => {
    const contenedorCard = document.getElementById("cardsUpcoming");
    const fragment = document.createDocumentFragment();
    const fechaActual = new Date(cards.currentDate);
    cards.events.forEach((card) => {
      let div = document.createElement("div");
      div.classList.add("col-sm-12","col-md-6","col-lg-3","container-secondary-card","d-flex","justify-content-center");
      let fechaEvento = new Date(card.date);
      if (fechaActual < fechaEvento) {
        const tarjeta = `
          <div class='card d-flex align-items-center mt-2' data-dark>
            <img src=${card.image} class="card-img-top img-card pt-3" alt='carta'>
            <div class='card-body'>
              <h5 class='card-title text-center'>${card.name}</h5>
              <p class='card-text'>Date: ${card.date}</p>
              <p class='card-text'>Description: ${card.description}</p>
              <p class='card-text'>Category: ${card.category}</p>
              <p class='card-text'>Place: ${card.place}</p>
              <p class='card-text'>Capacity: ${card.capacity}</p>
              <p class='card-text'>Estimate: ${card.estimate}</p>
            </div>
            <div class='card-footer d-flex align-items-center justify-content-between w-100'>
              <small class='text-muted' data-dark>price: $${card.price}</small>
              <a href="./details.html" class="btn btn-primary">ver mas</a>
            </div>
          </div> 
        `;
        div.innerHTML += tarjeta;
        fragment.appendChild(div);  
      }
    });
    contenedorCard.appendChild(fragment);
  };

  recorrerCardsYRenderizarTarjetasUpcoming();

});

darkTheme(".dark-theme-btn", "dark-mode", "dark-main");