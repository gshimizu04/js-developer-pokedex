/* JS FOR HTML MANIPULATION */

const pokemonList = document.getElementById('pokemonList') /* Atributes HTML pokemon list into a variable */
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 151
const limit = 15
let offset = 0;

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => { /* Calls object's method to fetch pokemon from the API */
        const newHtml = pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            <img src="${pokemon.photo}" alt="${pokemon.name}">
            <!-- Initially hidden details -->
            <div class="hidden-details ${pokemon.type}">
                <h2>About ${pokemon.name}</h2>
                <p><span class="height">Height: </span>${pokemon.height / 10} m</p>
                <p><span class="weight">Weight: </span>${(pokemon.weight / 10).toFixed(2)} kg</p>
                <span class="abilities">Abilities: </span>
                <ul>
                    ${pokemon.abilities.map((ability) => `<li>${ability}</li>`).join(', ')}
                </ul>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </div>
    </li>
        `).join('')

        pokemonList.innerHTML += newHtml
    }) /* Maps pokemon list, transforms each pokemon into a HTML list item and concatenates them */
}

loadPokemonItens(offset, limit)

const pokemonItems = document.querySelectorAll('.pokemon');
pokemonItems.forEach((pokemonItem) => {
    const details = pokemonItem.querySelector('.hidden-details');
    pokemonItem.addEventListener('mouseover', () => {
        details.style.display = 'block'
    })
    pokemonItem.addEventListener('mouseout', () => {
        details.style.display = 'none'
    })
})

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const amountRecordsWithNextPage = offset + limit

    if (amountRecordsWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})