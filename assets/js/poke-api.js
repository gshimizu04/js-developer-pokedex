/* JS FOR API CONSUME */
const pokeApi = {} /* Centralizes request to pokeAPI in an object for easier manipulation */

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map(typeSlot => typeSlot.type.name) /* Maps types list and returns their names */
    const [type] = types /* Gets the main type from the pokemon */

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight

    const abilities = pokeDetail.abilities.map(abilitySlot => abilitySlot.ability.name)
    const [ability] = abilities

    pokemon.abilities = abilities
    pokemon.ability = ability

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json()) /* Converts response from pokemon details into JSON */
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons =  (offset = 0, limit = 5) => { /* Stabilishes a method to fetch pokemons from the API */
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}` /* API URL, PATH, PARAMETERS AND QUERY STRING */

    return fetch(url) /* Seraching for pokemon list */
        .then((response) => response.json())  /* Returns HTTP response as a json file (arrow function to reduce verbosity) */
        .then((jsonBody) => jsonBody.results) /* Gets the already converted json promise and returns the results(pokemon) */
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) /* Maps pokemon list into a request list for pokemon details */
        .then((detailRequests) => Promise.all(detailRequests)) /* Waits for all fetch requests to be done */
        .then((pokemonsDetails) => pokemonsDetails) /* Returns the JSON list with every pokemon details */
}
