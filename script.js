const BASE_URL = "https://pokeapi.co/api/v2/";
let allPokemons = [];



async function fetchPokemon(path = "pokemon?limit=151&offset=0") {
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
        }
    }))
    displayPokemonCard()/20;
}


async function fetchPokemonData(url) {
    let response = await fetch(url);
    let responseToJson = await response.json();
    return responseToJson;
}


function displayPokemonCard() {
    let pokemonCard = document.getElementById('pokemon-card');
    console.log(allPokemons);
    pokemonCard.innerHTML = '';

    for (let i = 0; i < allPokemons.length; i++) {
        let firstType = allPokemons[i].type[0];
        let weightInKg = (allPokemons[i].weight * 0.1).toFixed(1);
        weightInKg = weightInKg.endsWith('.0') ? weightInKg.slice(0, -2) : weightInKg;
        pokemonCard.innerHTML += `
        <div  class="pkm-card bg-${firstType}">
            <div class="d-flex-bw-c margin-8">
                <p>#${allPokemons[i].id}</p>
                <div>Typ Color</div>
            </div>
            <div class="d-flex-clm-c m-t-32">
                <div class="pkm-img-container d-flex-c-c">
                    <img class="pkm-img" src="${allPokemons[i].image}" alt="pokemon bild">
                </div>
                <div>
                    <h2 class="txt-center">${allPokemons[i].name}</h2>
                    <div class="d-flex-c-c m-t-32 m-b-32 gap">
                        <div class="d-flex-clm-c">
                            <span>Height</span>
                            <span>${((allPokemons[i].height) / 10)}m</span>
                        </div>
                        <div class="d-flex-clm-c">
                            <span>weight</span>
                            <span>${weightInKg}kg</span>
                        </div>
                    </div>
                    <h3 class="txt-center">Type: <b>${allPokemons[i].type.join(', ')}</b></h3>
                </div>
            </div>
        </div>
        `;
    }
}





