const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0";

let allPokemons = [];
let filtertPokemons = [];
let currentOffset = 0;
let pokemonPerPage = 25;
let isFiltert = false;


async function loadAndShowPkm() {
    showLoadingSpinner();
    await fetchPokemon();
    hiddeLoadingSpinner();
    renderPokemonCard();
}


async function fetchPokemon() {
    let response = await fetch(BASE_URL);
    let responseToJson = await response.json();
    allPokemons = await Promise.all(responseToJson.results.map(async (result, index) => {
        const pokemonData = await fetchPokemonData(result.url);
        return {
            name: result.name,
            id: index + 1,
            image: pokemonData.sprites.other["official-artwork"].front_default,
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


function renderPokemonCard() {
    let pokemonCard = document.getElementById('pokemon_card');
    let morePkmBtn = document.getElementById('load_btn');

    morePkmBtn.classList.remove('d-none')
    for (let pokemon = currentOffset; pokemon < currentOffset + pokemonPerPage && pokemon < allPokemons.length; pokemon++) {
        let firstType = allPokemons[pokemon].type[0];
        let weightInKg = (allPokemons[pokemon].weight * 0.1).toFixed(1);

        weightInKg = weightInKg.endsWith('.0') ? weightInKg.slice(0, -2) : weightInKg;
        pokemonCard.innerHTML += getAllPokemonHTML(pokemon, firstType, weightInKg);
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


function openBigPokemonCard(pokemon) {
    let overflowContainer = document.getElementById(`overflow_container`);
    let cardRef = document.getElementById(`big_pokemon_card`);

    cardRef.classList.add(`pkm-card-overlay`);
    overflowContainer.classList.add(`overflow-hidden`);
    cardRef.classList.remove('d-none');

    renderBigPokemonCard(pokemon);
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
    let pokemonCard = document.getElementById('pokemon_card');

    if (searchInput.length >= 3) {
        filtertPokemons = allPokemons.filter(pokemon => pokemon.name.toLowerCase().includes(searchInput));
        isFiltert = true;
        renderFiltertPokemon();
    } else {
        currentOffset = 0;
        pokemonCard.innerHTML = '';
        isFiltert = false;
        renderPokemonCard();
    }
}


function renderFiltertPokemon() {
    let pokemonCard = document.getElementById('pokemon_card');
    let morePkmBtn = document.getElementById('load_btn');

    morePkmBtn.classList.add(`d-none`)
    pokemonCard.innerHTML = '';

    for (let i = 0; i < filtertPokemons.length; i++) {
        let firstType = filtertPokemons[i].type[0];
        let weightInKg = (filtertPokemons[i].weight * 0.1).toFixed(1);
        let filtertPokemonId = filtertPokemons[i].id - 1;

        weightInKg = weightInKg.endsWith('.0') ? weightInKg.slice(0, -2) : weightInKg;
        pokemonCard.innerHTML += getFiltertPokemonHTML(i, firstType, weightInKg, filtertPokemonId);
    }
}


function openFiltertBigPokemonCard(pokemon) {
    let overflowContainer = document.getElementById(`overflow_container`);
    let cardRef = document.getElementById(`big_pokemon_card`);

    cardRef.classList.add(`pkm-card-overlay`);
    overflowContainer.classList.add(`overflow-hidden`);
    cardRef.classList.remove('d-none');

    renderFiltertBigPokemonCard(pokemon);
}


function renderFiltertBigPokemonCard(pokemon) {
    let cardRef = document.getElementById(`big_pokemon_card`);
    let firstType = filtertPokemons[pokemon].type[0];
    let weightInKg = (filtertPokemons[pokemon].weight * 0.1).toFixed(1);
    weightInKg = weightInKg.endsWith('.0') ? weightInKg.slice(0, -2) : weightInKg;

    cardRef.innerHTML = '';
    cardRef.innerHTML = getFiltertBigPokemonCardHTML(pokemon, firstType, weightInKg);
}


function showNextBigCard(i) {
    event.stopPropagation();
    if (isFiltert == true) {
        pokemon = (i + 1 + filtertPokemons.length) % filtertPokemons.length;
        openFiltertBigPokemonCard(pokemon);
    } else {
        pokemon = (i + 1 + allPokemons.length) % allPokemons.length;
        openBigPokemonCard(pokemon);
    }

}


function showPrevBigCard(i) {
    event.stopPropagation();
    if (isFiltert == true) {
        pokemon = (i - 1 + filtertPokemons.length) % filtertPokemons.length;
        openFiltertBigPokemonCard(pokemon);
    } else {
        pokemon = (i - 1 + allPokemons.length) % allPokemons.length;
        openBigPokemonCard(pokemon);
    }

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


function openInfoContainer(weightInKg, pokemon) {
    let infoCard = document.getElementById(`stats_container`);
    event.stopPropagation();

    infoCard.innerHTML = ``;
    infoCard.innerHTML = getInfoContainerHTML(weightInKg, pokemon);
}


function openStatContainer(pokemon) {
    let statsCard = document.getElementById(`stats_container`);
    event.stopPropagation();

    statsCard.innerHTML = ``;
    statsCard.innerHTML = getPokemonStatsHTML(pokemon);
}


function loadMorePkm() {
    currentOffset += pokemonPerPage;
    if (currentOffset < allPokemons.length) {
        renderPokemonCard();
    } else {
        document.getElementById('load_btn').disabled = true;
    }
}