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
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      }).catch(function (e) {
        console.error(e);
      });
    }

    let modalContainer = document.querySelector('#modal-container');

    function showModal(pokemon) {
      //Define a Modal Container first
      let modalContainer = document.querySelector('#modal-container');
      //clear existing modal content
      modalContainer.innerHTML = '';
      //creating the modal
      let modal = document.createElement('div');
        modal.classList.add('modal');
        //add new modal content
      let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        //close modal when Close button is clicked
        closeButtonElement.addEventListener('click', hideModal);

      //modal title
      let titleElement = document.createElement('h1');
      titleElement.innerText = pokemon.name;
      //modal text showing pokemon attributes
      let contentElement = document.createElement('p');
      let pokeHeight = pokemon.height / 10; //meters
      let pokeTypes = pokemon.types;

      contentElement.innerText = 'Height: ' + pokeHeight + 'm ' + '\r\n' + 'Types: ' + pokeTypes ;

      let imageElement = document.createElement('img');
      imageElement.src = pokemon.imageUrl;

      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(contentElement);
      modal.appendChild(imageElement);
      modalContainer.appendChild(modal);
      //showing the modal
      modalContainer.classList.add('is-visible');
    }

    let dialogPromiseReject;
    //hiding modal
    function hideModal() {
    modalContainer.classList.remove('is-visible');

    if (dialogPromiseReject) {
        dialogPromiseReject();
        dialogPromiseReject = null;
      }
    }

  //close modal with keyboard
    window.addEventListener('keydown', (e) => {
      let modalContainer = document.querySelector('#modal-container');
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();
      }
    });

    modalContainer.addEventListener('click', (e) => {
      //Triggered when clicking INSIDE modal Container
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
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


console.log(pokemonRepository.getAll());
//Improved upon function that will list every Pokemon in the Repository

pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});

// does this make sense??
console.log(Object.keys(pokemonRepository.getAll()));
