function getBigPokemonCardHTML(pokemon, firstType, weightInKg) {
    return `
    <div class="pkm-card bg-${firstType}">
        <div class="d-flex-bw-c margin-8">
            <p>#${allPokemons[pokemon].id}</p>
            <div>Typ Color</div>
        </div>
        <div class="d-flex-clm-c m-t-32">
            <div class="pkm-img-container d-flex-c-c">
                <img class="pkm-img" src="${allPokemons[pokemon].image}" alt="pokemon bild">
            </div>
            <div>
                <h2 class="txt-center">${allPokemons[pokemon].name}</h2>
                <div class="d-flex-c-c m-t-32 m-b-32 gap">
                    <div class="d-flex-clm-c">
                        <span>Height</span>
                        <span>${((allPokemons[pokemon].height) / 10)}m</span>
                    </div>
                    <div class="d-flex-clm-c">
                        <span>weight</span>
                        <span>${weightInKg}kg</span>
                    </div>
                </div>
                <h3 class="txt-center">Type: <b>${allPokemons[pokemon].type.join(', ')}</b></h3>
            </div>
        </div>
    </div>
    <div class="d-flex-clm-st">
        <div class="stats-container">
            <h3>Evolutions</h3>
        </div>
        <div id="pokemon_stats" class="stats-container">
            <h3>Stats</h3>
        </div>
    </div>
    `;
}


function getPokemonStatsHTML(hp, attack, defense, spezial_attack, spezial_defense, speed) {
    return `
    <div>
        <table>
            <tr class="d-clm">
                <td>HP: ${hp}</td>
                <td>Attack: ${attack}</td>
                <td>Defense: ${defense}</td>
                <td>Spezial-Attack: ${spezial_attack}</td>
                <td>Spezial-Defense: ${spezial_defense}</td>
                <td>Speed: ${speed}</td>
            <tr>
        </table>
    </div>
    `;
}


function getAllPokemonHTML(i, firstType, weightInKg) {
    return `
    <div onclick="openBigPokemonCard(${i})" class="pkm-card bg-${firstType}">
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