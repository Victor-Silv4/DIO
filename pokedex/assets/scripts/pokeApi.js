
const pokeApi = {};

function convertPokeApiDetailToPokemon(pokemonDetail) {
    const pokemon = new Pokemon();
    pokemon.name = pokemonDetail.name;
    pokemon.number = pokemonDetail.id;
    pokemon.types = pokemonDetail.types.map(typeSlot => typeSlot.type.name);
    pokemon.type = pokemonDetail.types[0].type.name;
    pokemon.icon = pokemonDetail.sprites.other.dream_world.front_default;
    
    console.log(pokemon.number)
    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon);
}

pokeApi.getPokemons = (offset = 0, limit = 9) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequest) => Promise.all(detailRequest))
        .then((pokemonDetail) => pokemonDetail)
        .catch((error) => console.log(error));
}
