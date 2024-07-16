const BASE_URL = "https://pokeapi.co/api/v2/";
let allPokemons = [];


async function fetchPokemon(path = "pokemon?limit=7&offset=0") {
    let response = await fetch(BASE_URL + path);
    let responseToJson = await response.json();
    allPokemons = await Promise.all(responseToJson.results.map(async (result, index) => {
        const pokemonData = await fetchPokemonData(result.url);
        console.log(pokemonData)
        return {
            name: result.name,
            id: index + 1,
            image: pokemonData.sprites.front_default,
            type: pokemonData.types.map(type => type.type.name).join(', '),
            height: pokemonData.height,
            weight: pokemonData.weight,
        } 
    }))
    displayPokemonCard();
}


async function fetchPokemonData(url) {
    let response = await fetch(url);
    let responseToJson = await response.json();
    return responseToJson;
}


function displayPokemonCard() {
    let pokemonCard = document.getElementById('pokemon-card');

    pokemonCard.innerHTML= '';

    for (let i = 0; i < allPokemons.length; i++) {
        pokemonCard.innerHTML += `
        <div  class="pkm-card bg-${allPokemons[i].type}">
            <div class="d-flex-bw-c">
                <p>#${allPokemons[i].id}</p>
                <div>Typ Color</div>
            </div>
            <div class=" pkm-img">
                <img src="${allPokemons[i].image}" alt="pokemon bild">
            </div>
            <h2 class="txt-center">${allPokemons[i].name}</h2>
            <div class="d-flex-even-c">
                <div class="d-clm">
                    <span>Height</span>
                    <span>${allPokemons[i].height} </span>
                </div>
                <div class="d-clm">
                    <span>weight</span>
                    <span>${allPokemons[i].weight}</span>
                </div>
            </div>
            <h3 class="txt-center">Type:<b>${allPokemons[i].type}</b></h3>
        </div>
        `;
    }
}





