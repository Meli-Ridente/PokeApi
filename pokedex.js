let $$lista = document.querySelector('ol')
const url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151"
const image_url = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
const $$input = document.querySelector('#buscador')
let pokemons = []

        /**PETICION API */

const createPokemons = (listPokemons) => {
  let cont = 0;
  listPokemons.map((pokemon) => {
    cont ++;
    let card = document.createElement('li')
    let div = document.createElement('div')
    div.setAttribute('class', 'divCard',)
    div.setAttribute('id', `${cont}`)
    let nombre = document.createElement('h3')
    nombre.innerText = pokemon.name.toUpperCase();
    let imagen = document.createElement('img')
    const prueba = pokemon.url.split('/')
    imagen.src = image_url + prueba[6] + '.png'
    card.appendChild(div)
    div.appendChild(imagen)
    div.appendChild(nombre)
    $$lista.appendChild(card)
    nombre.setAttribute('class', 'nombre')
    imagen.setAttribute('class', 'imagen-card')

              /**EVENTOS  */

    let listado = document.createElement('ol')
    div.addEventListener('click' , function(){
      fetch (pokemon.url)
        .then(datos => datos.json())
          .then(json => {
            let valores = json['abilities'];
            console.log(div.innerHTML)
            div.innerHTML =''
            valores.map((valor) => {
              let nombreHabilidad = valor['ability'].name.toUpperCase();
              let habilidades = document.createElement('li')
              let titulo = document.createElement('h2');
              titulo.innerText = 'ABILITIES'
              div.append(titulo)
              listado.append(habilidades)
              habilidades.append(nombreHabilidad)
              div.append(listado)
            })
            }).catch(error => {
              console.log(error)
            })
    })
          /** FINAL EVENTS */ 
          
  })  /**map */
  
}  /**funcion final */

  fetch(url)
  .then(datos => datos.json())
  .then(myJson => {
    pokemons = myJson.results;
    createPokemons(pokemons)
  })
  .catch(error => {
    console.log(error)
  })

const filter = () => {
  let valor = $$input.value.toLowerCase()
  const filtrados = pokemons.filter(pokemon => pokemon.name.includes(valor))
  console.log(filtrados)
  $$lista.innerHTML = ''
  createPokemons(filtrados)
}

$$input.addEventListener('input', filter)