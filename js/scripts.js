//IIFE containing Repository of Pokemon with height, types and eventually moves
let pokemonRepository = (function () {
  let pokemonList = [
    { name: 'Bulbasaur', height: 0.71, types: ['grass', 'poison']},
    { name: 'Ivysaur', height: 1, types: ['grass', 'poison']},
    { name: 'Venusaur', height: 2, types: ['grass', 'poison']},
  ];

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

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();


console.log(pokemonRepository.getAll());
//Improved upon function that will list every Pokemon in the Repository

pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});

// does this make sense??
console.log(Object.keys(pokemonRepository.getAll()));
