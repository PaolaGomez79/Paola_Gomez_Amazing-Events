import cards from "./data-cards.js";
import darkTheme from "./dark_theme.js";

  console.log(cards.events);
  const id = new URLSearchParams(location.search).get("id");
  console.log(id);
  const data = cards.events.find(elemento => elemento._id == id);
  console.log(data);

  const recorrerCardsYRenderizarTarjetasDetails = () => {
    const contenedorCard = document.getElementById("cardDetails");

    const tarjeta = `
      <div class="card g-col-6 align-items-center justify-content-center card-details col-sm-12" style="max-width: 640px;" data-dark>
        <div class="row g-2 p-3 justify-content-center">
          <div class="col-md-4" style="width: 300px !important;">
            <img src=${data.image} class="img-fluid border border-dark" alt="${data.name}" data-dark-main style="object-fit: cover !important; height: 250px;  box-shadow: -6px -6px 5px rgba(0,0,0,0.6) !important;;">
          </div>
          <div class="col-md-8 d-flex justify-content-end" style="width: 300px !important;">
            <div class="card-body border border-dark d-flex justify-content-center " style="height: 250px !important; flex-direction: column;" data-dark-main>
              <h5 class="card-title text-center">${data.name}</h5>
              <p class="card-text text-center">Date: ${data.date}</p>
              <p class="card-text text-center">Description: ${data.description}</p>
              <p class="card-text text-center">Category: ${data.category}</p>
              <p class="card-text text-center">Place: ${data.place}</p>
              <p class="card-text text-center">Capacity: ${data.capacity}</p>
              <p class="card-text text-center">${data.estimate ?`Estimate: ${data.estimate}` : `Assistance: ${data.assistance}`}</p>
              <p class="card-text text-center"><small class="">price ${data.price}</small></p>
            </div>
          </div>
        </div>
      </div>
      `;
    
    contenedorCard.innerHTML += tarjeta;
  };

  recorrerCardsYRenderizarTarjetasDetails();
  

darkTheme(".dark-theme-btn", "dark-mode", "dark-main");
