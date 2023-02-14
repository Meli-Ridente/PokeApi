let $$lista = document.querySelector('ol#pokedex')
const url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151"
const image_url = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
const $$input = document.querySelector('#buscador')
let pokemons = []
let divFavorites = document.querySelector('.favorites')
let favorites = []
  
    /**MAP POKEMONS */

const createPokemons = (listPokemons) => {
  let cont = 0;
  listPokemons.map((pokemon) => {
    cont ++;
    let card = document.createElement('li')
    let divContainer = document.createElement('div')
    let div = document.createElement('div')
    card.setAttribute('class', 'lista')
    nombrePokemon = document.createElement('h2')
    
    divContainer.setAttribute('class', 'divContainer')
    div.setAttribute('class', 'divCard')
    div.setAttribute('id', `${cont}`)
    
    nombrePokemon.innerText = pokemon.name.toUpperCase();
    let imagen = document.createElement('img')
    const prueba = pokemon.url.split('/')
    imagen.src = image_url + prueba[6] + '.png'
    nombrePokemon.setAttribute('class', 'nombre')
    imagen.setAttribute('class', 'imagen-card')

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


    let divLine = document.createElement('div')
    divLine.setAttribute('class', 'line')
    divLine.innerHTML = ' ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  '
    divContainer.append(divLine)
    $$lista.appendChild(card)


    /** HEART EVENTS */
      let listFav = document.querySelector('.listFav')
      let liFav = document.createElement('li')
      heartFavorites.addEventListener('click', function(){
        heartFavorites.style.visibility = 'hidden'
        heart.style.visibility = 'visible'
        liFav.innerHTML=''
        divHeart.append(heart)
      })
      heart.addEventListener('click', function(){
        liFav.innerHTML = pokemon.name;
        listFav.append(liFav)
        heart.style.visibility = 'hidden'
        heartFavorites.style.visibility = 'visible'
        divHeart.append(heartFavorites)
      })

      /**ABILITIES API */
        fetch (pokemon.url)
          .then(datos => datos.json())
          .then(json => {
            let divAbilities = document.createElement('div')
            divAbilities.setAttribute('class', 'divAbilities')
            let valores = json['abilities'];
            let abilitiesTitle = document.createElement('h5')
            abilitiesTitle.setAttribute('class', 'abilitiesTitle')
            abilitiesTitle.innerText = ' ◉ ABILITIES'
            divAbilities.append(abilitiesTitle)
              let listado = document.createElement('ul')
              listado.setAttribute('class', 'listaNew')
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
    
  })          /**MAP */
}       
        /** FILTER */

const filter = () => {
  let valor = $$input.value.toLowerCase()
  const filtrados = pokemons.filter(pokemon => pokemon.name.includes(valor))
  $$lista.innerHTML = ''
  createPokemons(filtrados)
}


const final = () => {
  /**PETICION API */
  fetch(url)
  .then(datos => datos.json())
  .then(myJson => {
    pokemons = myJson.results;
    createPokemons(pokemons)
  })
  .catch(error => {
    console.log(error)
  })
  $$input.addEventListener('input', filter)
}

final ()