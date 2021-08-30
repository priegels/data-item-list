<<<<<<< Updated upstream
//IIFE containing Repository of Pokemon with height, types and eventually moves
=======
//Loads pokemonList from an external API
>>>>>>> Stashed changes
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

//function that only allows the addition of new pokemon if the pokemon is an object
  function add(pokemon) {
    if (typeof(pokemon) === object) {
    pokemonList.push(pokemon);
  }
}

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonUList = document.querySelector('.pokemon-list');
    let pokemonListItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-pokemon');

    pokemonListItem.appendChild(button);
    pokemonUList.appendChild(pokemonListItem);
  }

<<<<<<< Updated upstream
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
=======
//Fetches list from API

      function loadList() {
      return fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      }).catch(function (e) {
        console.error(e);
      })
    }

//Shows details of selected Pokémon on click
  function showDetails(pokemon) {
    console.log(pokemon);
  }

//Function returns
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList
>>>>>>> Stashed changes
  };
})();


pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
