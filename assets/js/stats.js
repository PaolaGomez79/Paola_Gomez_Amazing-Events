
import darkTheme from "./dark_theme.js";

darkTheme(".dark-theme-btn", "dark-mode", "dark-table");

let cards = {
    currentDate: "2022-01-01",
    events: [
      {
        _id: 1,
        image:"https://i.postimg.cc/Fs03hQDt/Collectivities-Party.jpg",
        name:"Collectivities Party",
        date:"2021-12-12",
        description:"Enjoy your favourite dishes, from different countries, in a unique event for the whole family.",
        category:"Food Fair",
        place:"Room A",
        capacity:45000,
        assistance:42756,
        price:5
      },
      {
        _id: 2,
        image:"https://i.postimg.cc/ZmD3Xf57/Korean-style.jpg",
        name:"Korean style",
        date:"2022-08-12",
        description:"Enjoy the best Korean dishes, with international chefs and awesome events.",
        category:"Food Fair",
        place:"Room A",
        capacity:45000,
        assistance:42756,
        price:10
      }
    ]
};

/* onsole.log(window.location);
const myKeyValues = window.location.search;
  console.log(myKeyValues); */

  /* const urlParams = new URLSearchParams({
    _id: 1,
    image:"https://i.postimg.cc/Fs03hQDt/Collectivities-Party.jpg",
    name:"Collectivities Party",
    date:"2021-12-12",
    description:"Enjoy your favourite dishes, from different countries, in a unique event for the whole family.",
    category:"Food Fair",
    place:"Room A",
    capacity:45000,
    assistance:42756,
    price:5});
 */

    /* let fragmentCheck = document.createDocumentFragment()

for(let cate of data.events){
    console.log(cate.category)
    let li = document.createElement('li')
    li.innerHTML= <label for=${cate.category}.split(" ").join("_")>${cate.category}</label>
    <input type="checkbox" name="categorias" id=${cate.category}.split(" ").join("_")>
    console.log(li)
    fragmentCheck.appendChild(li)
}
category_nav.appendChild(fragmentCheck)
 */

     const urlParams = new URLSearchParams(cards.events.forEach(element => {console.log( element)})); 
    

    const myName = urlParams.forEach((element) => element.get('name')) 

  console.log(`mi nombre: ${myName}`);

  for(const [key, value] of urlParams){
    console.log(`${key} => ${value}`);
  }

  var cadena = "  esto es Una caDena  ";

  function ordenarCadena() {
    let ordenada = cadena.trim().toLocaleLowerCase();
    console.log('ordenada: '+ordenada);
    let separoPrimeraLetra = ordenada.charAt(0).toUpperCase();
    console.log('Separo primera letra: '+ separoPrimeraLetra);
    let restoDeLetras = ordenada.slice(1);
    console.log(restoDeLetras);
    return console.log(separoPrimeraLetra + restoDeLetras);
  }

  ordenarCadena();
  

  