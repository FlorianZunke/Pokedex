const BASE_URL = "https://pokeapi.co/api/v2/";
let allPokemons = [];


function init(params) {
    fetchPokemon(path = "pokemon?limit=10&offset=0")
    fetchPokemonStats(path = "pokemon/")
}

async function fetchPokemon(path = "pokemon?limit=10&offset=0") {
    let response = await fetch(BASE_URL + path);
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
    renderPokemonCard();
    console.log(allPokemons);
}


async function fetchPokemonData(url) {
    let response = await fetch(url);
    let responseToJson = await response.json();
    return responseToJson;
}


async function fetchPokemonStats(path = "pokemon/") {
    let response = await fetch(BASE_URL + path);
    let responseToJson = await response.json();
    pokemonStats = await Promise.all(responseToJson.results.map(async (result) => {
        const pokemonStatsData = await fetchPokemonData(result.url);
        return {
            stats: pokemonStatsData.stats.map(stat => stat.base_stat),
        }
    }))

}


function renderPokemonCard() {
    let pokemonCard = document.getElementById('pokemon_card');
    pokemonCard.innerHTML = '';

    for (let i = 0; i < allPokemons.length; i++) {
        let firstType = allPokemons[i].type[0];
        let weightInKg = (allPokemons[i].weight * 0.1).toFixed(1);

        weightInKg = weightInKg.endsWith('.0') ? weightInKg.slice(0, -2) : weightInKg;
        pokemonCard.innerHTML += getAllPokemonHTML(i, firstType, weightInKg);
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


function renderPokemonStatsToBigCard(i) {
    let pokemonStatsContainer = document.getElementById('pokemon_stats');
    let hp = allPokemons[i].stats[0];
    let attack = allPokemons[i].stats[1];
    let defense = allPokemons[i].stats[2];
    let spezial_attack = allPokemons[i].stats[3];
    let spezial_defense = allPokemons[i].stats[4];
    let speed = allPokemons[i].stats[5];

    pokemonStatsContainer.innerHTML = '';
    pokemonStatsContainer.innerHTML += getPokemonStatsHTML(hp, attack, defense, spezial_attack, spezial_defense, speed);
}


function openBigPokemonCard(pokemon) {
    let overflowContainer = document.getElementById(`overflow_container`);
    let cardRef = document.getElementById(`big_pokemon_card`);

    cardRef.classList.add(`pkm-card-overlay`);
    overflowContainer.classList.add(`overflow-hidden`);
    cardRef.classList.remove('d-none');

    renderBigPokemonCard(pokemon);
    renderPokemonStatsToBigCard(pokemon);
}


function closeBigPokemonCard() {
    let CardRef = document.getElementById(`big_pokemon_card`);
    let overflowContainer = document.getElementById(`overflow_container`);

    CardRef.innerHTML = '';
    CardRef.classList.remove(`pkm-card-overlay`);
    overflowContainer.classList.remove(`overflow-hidden`);
    CardRef.classList.add('d-none');

    renderPokemonCard();
}






