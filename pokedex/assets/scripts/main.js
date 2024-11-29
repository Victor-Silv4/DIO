const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");

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


