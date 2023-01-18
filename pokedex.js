let $$lista = document.querySelector('ol')
const url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151"
const image_url = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
const $$input = document.querySelector('#buscador')
let pokemons = []
let divFavorites = document.querySelector('.favorites')
let favorites = []
console.log(favorites)

        /**PETICION API */

const createPokemons = (listPokemons) => {
  let cont = 0;
  listPokemons.map((pokemon) => {
    cont ++;
    let card = document.createElement('li')
    card.setAttribute('class', 'lista')
    let divContainer = document.createElement('div')
    let div = document.createElement('div')
    divContainer.setAttribute('class', 'divContainer')
    div.setAttribute('class', 'divCard')
    div.setAttribute('id', `${cont}`)
    let nombrePokemon = document.createElement('h2')
    nombrePokemon.innerText = pokemon.name.toUpperCase();
    let imagen = document.createElement('img')
    const prueba = pokemon.url.split('/')
    imagen.src = image_url + prueba[6] + '.png'
    card.appendChild(divContainer)
    let heart = document.createElement('span')
    let divHeart = document.createElement('div')
    divHeart.setAttribute('class', 'divHeart')
    heart.setAttribute('class', 'heart')
    heart.innerHTML = '<span class="material-symbols-outlined">favorite</span>'
    let heartFavorites = document.createElement('span')
    heartFavorites.innerHTML = `<span class="material-symbols-outlined">heart_plus</span>`
    divHeart.appendChild(nombrePokemon)
    divHeart.appendChild(heart)
    divContainer.appendChild(divHeart)
    divContainer.appendChild(div)
    div.appendChild(imagen)
    $$lista.appendChild(card)
    nombrePokemon.setAttribute('class', 'nombre')
    imagen.setAttribute('class', 'imagen-card')

              /**EVENTS  */
    let listaFav = document.createElement('ol');
    heart.addEventListener('click', function(){
      let liFav = document.createElement('li')
      favorites.push(pokemon.name)
      // favorites.innerText = favorites;
      listaFav.append(favorites)
      liFav.append
      heart.style.display= 'none'
      heartFavorites.style.display = 'inline'
      divHeart.append(heartFavorites)
      divFavorites.append(listaFav)
      console.log(favorites)
    })
    
              /** FINAL EVENTS */ 

    let listado = document.createElement('ul')
    listado.setAttribute('class', 'listaNew')
      fetch (pokemon.url)
        .then(datos => datos.json())
        .then(json => {
          let divAbilities = document.createElement('div')
          divAbilities.setAttribute('class', 'divAbilities')
          let valores = json['abilities'];
          let abilitiesTitle = document.createElement('h4')
          abilitiesTitle.setAttribute('class', 'abilitiesTitle')
          abilitiesTitle.innerText = 'ABILITIES'
          divAbilities.append(abilitiesTitle)
          valores.map((valor) => {
            let nombreHabilidad = valor['ability'].name;
            let habilidades = document.createElement('li')
            habilidades.append(nombreHabilidad)
            listado.append(habilidades)
            divAbilities.append(listado)
            divContainer.append(divAbilities)
          })
          }).catch(error => {
            console.log(error)
          })
          
          
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


