const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=200&offset=0";
const EVOLVES_URL = "https://pokeapi.co/api/v2/evolution-chain/"

let allPokemons = [];
let currentOffset = 0;
let pokemonPerPage = 25;

let filtertPokemon = [];
let pokemonEvolves = [];

const STAT_COLORS = {
    "hp": "rgb(255,224,230)",
    "attack": "rgb(255,236,217)",
    "defense": "rgb(234,224,200)",
    "spz-attack": "rgb(219,242,242)",
    "spz-defense": "rgb(215,236,251)",
    "speed": "rgb(235,224,255)",
}


function init() {
    loadAndShowPkm();
}


async function fetchPokemon() {
    let response = await fetch(BASE_URL);
    let responseToJson = await response.json();
    allPokemons = await Promise.all(responseToJson.results.map(async (result, index) => {
        const pokemonData = await fetchPokemonData(result.url);
        return {
            name: result.name,
            id: index + 1,
            image: pokemonData.sprites.front_default,
            type: pokemonData.types.map(type => type.type.name),
            height: pokemonData.height,
            weight: pokemonData.weight,
            stats: pokemonData.stats.map(stat => stat.base_stat),
        }
    }))
}


async function fetchPokemonData(url) {
    let response = await fetch(url);
    let responseToJson = await response.json();
    return responseToJson;
}


async function fetchPokemonEvolutions(evoUrl) {
    for (let i = 0; i < 3; i++) {
        let url = evoUrl;
        let response = await fetch(url);
        let responseToJson = await response.json();
        console.log(responseToJson);
    }
}


function renderPokemonCard() {
    let pokemonCard = document.getElementById('pokemon_card');

    for (let pokemon = currentOffset; pokemon < currentOffset + pokemonPerPage && pokemon < allPokemons.length; pokemon++) {
        let firstType = allPokemons[pokemon].type[0];
        let weightInKg = (allPokemons[pokemon].weight * 0.1).toFixed(1);

        weightInKg = weightInKg.endsWith('.0') ? weightInKg.slice(0, -2) : weightInKg;
        pokemonCard.innerHTML += getAllPokemonHTML(pokemon, firstType, weightInKg);
    }
}


function loadMorePkm() {
    currentOffset += pokemonPerPage;
    if (currentOffset < allPokemons.length) {
        renderPokemonCard();
    } else {
        document.getElementById('load_btn').disabled = true;
    }
}


function renderBigPokemonCard(pokemon) {
    let cardRef = document.getElementById(`big_pokemon_card`);
    let firstType = allPokemons[pokemon].type[0];
    let weightInKg = (allPokemons[pokemon].weight * 0.1).toFixed(1);
    weightInKg = weightInKg.endsWith('.0') ? weightInKg.slice(0, -2) : weightInKg;

    cardRef.innerHTML = '';
    cardRef.innerHTML = getBigPokemonCardHTML(pokemon, firstType, weightInKg);
}


// function renderPokemonStatsToBigCard(i) {
//     let pokemonStatsContainer = document.getElementById('pokemon_stats');

//     pokemonStatsContainer.innerHTML = '';
//     pokemonStatsContainer.innerHTML += getPokemonStatsHTML(i);
// }


// function renderPokemonEvolutionsToBigCard(evoUrl, pokemonId) {
//     let pokemonEvoContainer = document.getElementById('pokemon_evolutions');

//     pokemonEvoContainer.innerHTML = '';
//     pokemonEvoContainer.innerHTML += getPokemonEvolutionsHTML(evoUrl, pokemonId);
// pokemon


function openBigPokemonCard(pokemon) {
    let pokemonId = allPokemons[pokemon].id;
    let evoUrl = `${EVOLVES_URL}${pokemonId}`;
    let overflowContainer = document.getElementById(`overflow_container`);
    let cardRef = document.getElementById(`big_pokemon_card`);

    cardRef.classList.add(`pkm-card-overlay`);
    overflowContainer.classList.add(`overflow-hidden`);
    cardRef.classList.remove('d-none');

    renderBigPokemonCard(pokemon);
    // renderPokemonStatsToBigCard(pokemon);
    fetchPokemonEvolutions(evoUrl);
    // renderPokemonEvolutionsToBigCard(evoUrl, pokemonId);
}


function closeBigPokemonCard() {
    let CardRef = document.getElementById(`big_pokemon_card`);
    let overflowContainer = document.getElementById(`overflow_container`);

    CardRef.innerHTML = '';
    CardRef.classList.remove(`pkm-card-overlay`);
    overflowContainer.classList.remove(`overflow-hidden`);
    CardRef.classList.add('d-none');
}


function filterPokemon() {
    let searchInputRef = document.getElementById('search_input');
    let searchInput = searchInputRef.value.toLowerCase();  // .toLowerCase() Konvertiert den Suchbegriff in Kleinbuschstaben 

    if (searchInput.length >= 3) {
        filtertPokemon = allPokemons.filter(pokemon => pokemon.name.toLowerCase().includes(searchInput));
        renderFilteredPokemon();
    } if (searchInput.length < 3) {
        renderPokemonCard();
    }
}


function renderFilteredPokemon() {
    let pokemonCard = document.getElementById('pokemon_card');
    pokemonCard.innerHTML = '';

    for (let i = 0; i < filtertPokemon.length; i++) {
        let firstType = filtertPokemon[i].type[0];
        let weightInKg = (filtertPokemon[i].weight * 0.1).toFixed(1);

        weightInKg = weightInKg.endsWith('.0') ? weightInKg.slice(0, -2) : weightInKg;
        pokemonCard.innerHTML += getFilteredPokemonHTML(i, firstType, weightInKg);
    }
}


function showNextBigCard(i) {
    event.stopPropagation();
    pokemon = (i + 1 + allPokemons.length) % allPokemons.length;

    openBigPokemonCard(pokemon);
}


function showPrevBigCard(i) {
    event.stopPropagation();
    pokemon = (i - 1 + allPokemons.length) % allPokemons.length;

    openBigPokemonCard(pokemon);
}


function showLoadingSpinner() {
    let spinner = document.getElementById('loading_spinner');
    let morePkm = document.getElementById('load_btn');

    morePkm.classList.add('d-none');
    spinner.classList.remove('d-none');
}


function hiddeLoadingSpinner() {
    let spinner = document.getElementById('loading_spinner');
    let morePkm = document.getElementById('load_btn');

    spinner.classList.add('d-none');
    morePkm.classList.remove('d-none');
}


async function loadAndShowPkm() {
    showLoadingSpinner();

    await fetchPokemon();
    hiddeLoadingSpinner();
    renderPokemonCard();
}


function openInfoContainer(weightInKg, pokemon) {
    let infoCard = document.getElementById(`stats_container`);
    event.stopPropagation();

    infoCard.innerHTML =``;
    infoCard.innerHTML = getInfoContainerHTML(weightInKg, pokemon);
}


function openStatContainer(pokemon) {
    let statsCard = document.getElementById(`stats_container`);
    event.stopPropagation();

    statsCard.innerHTML = ``;
    statsCard.innerHTML = getPokemonStatsHTML(pokemon);
}



