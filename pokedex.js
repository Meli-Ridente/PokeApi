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
    let divContainer = document.createElement('div')
    let div = document.createElement('div')
    divContainer.setAttribute('class', 'divContainer')
    div.setAttribute('class', 'divCard')
    div.setAttribute('id', `${cont}`)
    let nombrePokemon = document.createElement('h3')
    nombrePokemon.innerText = pokemon.name.toUpperCase();
    let imagen = document.createElement('img')
    const prueba = pokemon.url.split('/')
    imagen.src = image_url + prueba[6] + '.png'
    card.appendChild(divContainer)
    divContainer.appendChild(div)
    div.appendChild(imagen)
    div.appendChild(nombrePokemon)
    $$lista.appendChild(card)
    nombrePokemon.setAttribute('class', 'nombre')
    imagen.setAttribute('class', 'imagen-card')

              /**EVENTOS  */

    let listado = document.createElement('ol')
    div.addEventListener('click' , function(){
      fetch (pokemon.url)
        .then(datos => datos.json())
        .then(json => {
          let valores = json['abilities'];
          valores.map((valor) => {
            div.innerHTML = ' '
            div.append(nombrePokemon)
            div.setAttribute('class', 'new')
            let nombreHabilidad = valor['ability'].name.toUpperCase();
            let habilidades = document.createElement('li')
            habilidades.setAttribute('class', 'titulo-new')
            let titulo = document.createElement('h4');
            listado.setAttribute('class', 'listaNew')
            titulo.setAttribute('class', 'titulo-new')
            nombrePokemon.setAttribute('class', 'pokemon')
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
          
  })          /**map */
  
}         /**funcion final */

  fetch(url)
  .then(datos => datos.json())
  .then(myJson => {
    pokemons = myJson.results;
    createPokemons(pokemons)
  })
  .catch(error => {
    console.log(error)
  })

        /** FILTER */

const filter = () => {
  let valor = $$input.value.toLowerCase()
  const filtrados = pokemons.filter(pokemon => pokemon.name.includes(valor))
  $$lista.innerHTML = ''
  createPokemons(filtrados)
}

$$input.addEventListener('input', filter)


