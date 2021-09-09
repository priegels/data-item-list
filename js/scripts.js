//Loads pokemonList from an external API
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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
    let pokemonUList = document.querySelector('.list-group');
    let pokemonListItem = document.createElement('li');
    pokemonListItem.classList.add('group-list-item');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('btn', 'btn-primary', 'btn-lg', 'btn-block');

    button.setAttribute('data-target', '#pokemonModal');
    button.setAttribute('data-toggle', 'modal');

    pokemonListItem.appendChild(button);
    pokemonUList.appendChild(pokemonListItem);
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  }

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
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

//Loads details of selected Pokémon after click
    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        // Now we add the details to the item
        item.id = details.id;
        item.imageUrl = details.sprites.other.dream_world.front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = details.types;
        item.abilities = details.abilities;
      }).catch(function (e) {
        console.error(e);
      });
    }

//shows modal, jQuery used here
    let modalContainer = document.querySelector('#pokemonModal');

    function showModal(pokemon) {
      let modalBody = $('.modal-body');
      let modalTitle = $('.modal-title');
      let modalHeader = $('.modal-header');
      let modalBodyP = $('.modal-body-p');

      modalTitle.empty();
      modalBody.empty();
      modalBodyP.empty();

      let idElement = $('<p>#' + pokemon.id + '</p>');
      idElement.addClass('pokemon-id');
      let nameElement = $('<h1>' + pokemon.name + '</h1>');

      let imageElement = $('<img class = "modal-img" style="width:50%">');
      imageElement.attr('src', pokemon.imageUrl);

      let heightElement = $('<p>' + '<b>height: </b>' + pokemon.height / 10 + ' m' + '</p>');
      let weightElement = $('<p>' + '<b>weight: </b>' + pokemon.weight / 10 + ' kg' + '</p>');
      let typesElement = $('<p>' + '<b>types: </b>' + pokemon.types.map(pokemon => ' ' + pokemon.type.name) + '</p>');
      let abilitiesElement = $('<p>' + '<b>abilities: </b>' + pokemon.abilities.map(pokemon => ' ' + pokemon.ability.name) + '</p>');

      modalTitle.append(idElement);
      modalTitle.append(nameElement);
      modalBody.append(imageElement);
      modalBody.append(modalBodyP);
      modalBodyP.append(heightElement);
      modalBodyP.append(weightElement);
      modalBodyP.append(typesElement);
      modalBodyP.append(abilitiesElement);
    }

//search function
    $(document).ready(function() {
        $('#search-input').on('keyup', function() {
          let value = $(this).val().toLowerCase();
          $('.list-group *').filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
          });
        });
      });

//Function returns
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
  };
})();

pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});

//back to top button
mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 300px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", topFunction);

function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
