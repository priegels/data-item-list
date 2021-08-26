//attempting to wrap my pokemonList in an IIFE
let pokemonRepository = (function () {
  let pokemonList = [
    { name: 'Bulbasaur', height: 0.71, types: ['grass', 'poison']},
    { name: 'Ivysaur', height: 1, types: ['grass', 'poison']},
    { name: 'Venusaur', height: 2, types: ['grass', 'poison']},
  ];

//does this make sense???
  function add(pokemon) {
    if (typeof(pokemon) === object) {
    pokemonList.push(pokemon);
  }
}

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll
  };
})();

//loop that lists every pokemon with their respective height + types
//<p> is used to create a list as opposed to just having everything in one line of text

// new forEach function() for task 1.5 with called IIFE function
pokemonRepository.getAll().forEach(function(pokemon) {
  document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + 'm' + '; types: ' + pokemon.types + ') </p>');
});

// does this make sense??
alert(Object.keys(pokemonRepository.getAll()));
