let lista = document.querySelector('ol')
const url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151"
const image_url = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
const input = document.querySelector('#buscador')

const obtenerDatos = async () => {
  const datos = await fetch(url);
  const datosJson = await datos.json()
  return datosJson.results;
}

const final = async () => {
  const datos = await obtenerDatos()
  datos.map((pokemon) => {
    let card = document.createElement('li')
    let div = document.createElement('div')
    div.setAttribute('class', 'divCard')
    let nombre = document.createElement('h3')
    nombre.innerText = pokemon.name.toUpperCase();
    let imagen = document.createElement('img')
    const prueba = pokemon.url.split('/')
    imagen.src = image_url + prueba[6] + '.png'
    card.appendChild(div)
    div.appendChild(imagen)
    div.appendChild(nombre)
    lista.appendChild(card)
    nombre.setAttribute('class', 'nombre')
    imagen.setAttribute('class', 'imagen-card')
  })
}


final()