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
//Event Function to happen on click on button
    button.addEventListener('click', function(event) {
      showDetails(pokemon);
    })

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

pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
