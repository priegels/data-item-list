//Provides array of Pokémon
let pokemonRepository = (function () {
  let pokemonList = [
    { name: 'Bulbasaur', height: 0.71, types: ['grass', 'poison']},
    { name: 'Ivysaur', height: 1, types: ['grass', 'poison']},
    { name: 'Venusaur', height: 2, types: ['grass', 'poison']},
  ];

//Function that only allows the addition of new Pokémon if the Pokémon is an object
  function add(pokemon) {
    if (typeof(pokemon) === 'object' && 'name' in pokemon) {
    pokemonList.push(pokemon);
  } else {
      console.log('error')
  }
}

//Returns list of Pokémon
  function getAll() {
    return pokemonList;
  }

//Lists Pokémon in repository as buttons
  function addListItem(pokemon) {
    let pokemonUList = document.querySelector('.pokemon-list');
    let pokemonListItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-pokemon');
//Event Function to happen on click on button
    button.addEventListener('click', function(event) {
      showDetails(pokemon);
    })

    pokemonListItem.appendChild(button);
    pokemonUList.appendChild(pokemonListItem);
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
    showDetails: showDetails
  };
})();


console.log(pokemonRepository.getAll());
//Improved upon function that will list every Pokemon in the Repository

pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});

// does this make sense??
console.log(Object.keys(pokemonRepository.getAll()));
