let lista = document.querySelector('ol')
const url = 'https://pokeapi.co/api/v2/pokemon/' 


const obtenerDatos = () => {
    fetch(url)
    .then(datos => datos.json())
    .then(json=> {
      console.log('todo bien')
      console.log(json.results)
     }).catch(error => {
        console.log('error promesa')
        console.log(error)
      })
  }

obtenerDatos()