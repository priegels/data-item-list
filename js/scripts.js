<<<<<<< Updated upstream
alert('under construction');

let favoriteBootcamp = 'careerfoundry'
document.write(favoriteBootcamp)
=======
let pokemonList = [
  { name: 'Bulbasaur', height: 0.71, types: ['grass', 'poison']},
  { name: 'Ivysaur', height: 1, types: ['grass', 'poison']},
  { name: 'Venusaur', height: 2, types: ['grass', 'poison']}
];


//loop that lists every pokemon with their respective height + types
//added a condition to display great height (using <b>, might be changed later on)
//<p> is used to make it have a list optic as opposed to just having everything in one line of text
for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height >= 1.5) {
    document.write('<p>' + pokemonList[i].name + ' (height: ' + pokemonList[i].height + 'm' + ' - <b>Wow, that\'s big!</b>' + '; types: ' + pokemonList[i].types + ') </p>');
  } else {
    document.write('<p>' + pokemonList[i].name + ' (height: ' + pokemonList[i].height + 'm' + '; types: ' + pokemonList[i].types + ') </p>');
  }
}
>>>>>>> Stashed changes
