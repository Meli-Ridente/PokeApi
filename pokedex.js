let lista = document.querySelector('ol')
const url = 'https://pokeapi.co/api/v2/pokemon/' 

const obtenerDatos = async () => {
  const datos = await fetch(url);
  const datosJson = await datos.json()
  return datosJson.results;
}

const mapResults = (results) => {
  return results.map((valor) => ({
    name: valor.name
  }))
}

const final = async () => {
  const datos = await obtenerDatos()
  const mapeo = mapResults(datos)
  for(let i=0; i<mapeo.length; i++){
    let card = document.createElement('li')
    let nombre = document.createElement('p')
    nombre.innerText = mapeo[i].name;
    card.appendChild(nombre)
    lista.appendChild(card)
  }
}

final()
