const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const pokemonInfo = document.getElementById("pokemonInfo");


const maxRecords = 151;
let offset = 0;
const limit = 10;



function convertPokemonToHtml(pokemon) {
   return `<li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.icon}" alt="${pokemon.name}">
                </div>
            </li>`;
}

function convertPokemonToOverlay(pokemon) {
    return `<div class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.icon}" alt="${pokemon.name}">
                </div>
            </div>
            
          
            
            <div class="additionalInfos">
                    <div class="abilitiesInfo">
                        <span>Abilities</span>
                        <ol>
                            <li class="${pokemon.type}">${pokemon.abilities[0]}</li>
                            <li class="${pokemon.type}">${pokemon.abilities[1]}</li>
                        </ol>
                    </div>
                    
                    
                    
                <div class="moveInfo">
                    <span>Moves</span>
                    <div class="movePositions">
                        <ol class="moves">
                            
                        </ol>
                    </div>
                </div>
            </div>`;
 }

 function loadMoveItems(pokemon, newMovesCount) {
    // Verifica se o Pokémon já tem movimentos carregados
    const moveList = pokemon.moves; // Pega os novos movimentos
    const moveTypes = pokemon.moveTypes; // Pega os tipos dos movimentos

    const moveItemsHtml = moveList.map((move, index) => {
        return `<li class="${moveTypes[index]}">${move}</li>`;
    }).join('');

    const moveContainer = document.querySelector('.movePositions .moves');
    moveContainer.innerHTML += moveItemsHtml;
}


function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons) => {

        const listItems = pokemons.map((pokemon) =>  convertPokemonToHtml(pokemon));

        const newHtml = listItems.join('');

        pokemonList.innerHTML += newHtml;
    
        
        //for (let i = 0; i < pokemons.length; i++) {
        //    const pokemon = pokemons[i];
        //    listItems.push(convertPokemonToHtml(pokemon));  
        //}

        //pokemonList.innerHTML = listItems;;
    })
    .catch((error) => console.log(error));
}

loadPokemonItems(offset, limit);

loadMoreButton.addEventListener("click", () => {
    offset += limit;
    const qtRecords = limit + offset;

    if(qtRecords >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItems(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    }
    else {
        loadPokemonItems(offset, limit);
    }

})

pokemonList.addEventListener('click', (event) => {
    const pokemonElement = event.target.closest('.pokemon');
    const pokemonNumberElement = pokemonElement.querySelector('.number');
        
    const pokemonNumber = pokemonNumberElement ? pokemonNumberElement.innerText.replace('#', '') : null;

    const overlayContent = document.querySelector('.overlay-content');
    const overlay = document.querySelector('.overlay');


    if (pokemonNumber) {
        pokeApi.getPokemonByOffset(pokemonNumber)
            .then((pokemon) => {
                console.log(pokemon);  // Exibe o Pokémon
                overlayContent.innerHTML = convertPokemonToOverlay(pokemon);
                overlay.style.display = "flex";
                loadMoveItems(pokemon, 4);

                let newMoves = 4;
                let movesLimit = 4;

                overlay.addEventListener('scroll', () => {
                    if(movesLimit <= 8) {
                        movesLimit += 4;
                        loadMoveItems(pokemon, newMoves);
                    }
                    
                });

                overlay.addEventListener('click', () => {
                    overlay.style.display = "none";
                });
            })
            
            .catch((error) => console.log(error));
    }

});

