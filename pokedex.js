let lista = document.querySelector('ol')
const url = 'https://pokeapi.co/api/v2/pokemon/' 

const obtenerDatos = async () => {
  const datos = await fetch(url);
  const datosJson = await datos.json()
  console.log(datosJson.results)
}

obtenerDatos()