window.onload = function() {
    // Recupera o número do Pokémon do localStorage
    const pokemonNumber = localStorage.getItem('selectedPokemonNumber');
    
    if (pokemonNumber) {
        // Obtém os detalhes do Pokémon
        pokeApi.getPokemons(pokemonNumber, 1)
            .then((pokemons) => {
                const pokemon = pokemons[0]; // Como retornamos um array de pokemons, pegamos o primeiro

                const pokemonInfo = document.getElementById("pokemonInfo");
                pokemonInfo.innerHTML = "Texto";
                if (pokemonInfo) {
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = convertPokemonToNewPage(pokemon);
                    pokemonInfo.appendChild(tempDiv.firstChild);
                    
                } else {
                    console.error('Elemento pokemonInfo não encontrado!');
                }
            })
            .catch((error) => console.log(error));
    } else {
        console.error('Nenhum Pokémon selecionado.');
    }
};
