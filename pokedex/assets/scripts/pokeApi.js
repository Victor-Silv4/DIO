
const pokeApi = {};

async function convertPokeApiDetailToPokemon(pokemonDetail) {
    const pokemon = new Pokemon();
    pokemon.name = pokemonDetail.name;
    pokemon.number = pokemonDetail.id;
    pokemon.types = pokemonDetail.types.map((typeSlot) => typeSlot.type.name);
    pokemon.type = pokemonDetail.types[0].type.name;
    pokemon.icon = pokemonDetail.sprites.other.dream_world.front_default;
    pokemon.moves = pokemonDetail.moves.slice(0, 40).map((moveSlot) => moveSlot.move.name);
    pokemon.abilities = pokemonDetail.abilities.map((abilitieSlot) => abilitieSlot.ability.name);

    // Fazer requisições para obter os detalhes dos movimentos
    const moveDetailsPromises = pokemonDetail.moves.slice(0, 40).map(async (moveSlot) => {
        const response = await fetch(moveSlot.move.url);
        const moveDetail = await response.json();
        return moveDetail.type.name; // Retorna o tipo do movimento
    });

    // Resolver todas as promessas e adicionar os tipos ao Pokémon
    pokemon.moveTypes = await Promise.all(moveDetailsPromises);

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

pokeApi.getPokemonByOffset = (offset) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${offset}`;
    return fetch(url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
        .catch((error) => console.log(error));
}
