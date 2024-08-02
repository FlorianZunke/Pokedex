function getBigPokemonCardHTML(pokemon, firstType, weightInKg) {
    return `
    <div class="d-flex-c-c gap32">
        <img onclick="showPrevBigCard(${pokemon},event)" class="prev-pkm-btn" src="./assets/img/arrow-left.png" alt="">
        <div class="d-flex-c-c gap32">
            <div class="pkm-card b-${firstType}">
                <div class="d-flex-bw-c margin-8">
                    <p>#${allPokemons[pokemon].id}</p>
                    <div class="bg-${firstType}"></div>
                </div>
                <div class="d-flex-clm-c">
                    <div class="pkm-img-container d-flex-c-c">
                        <img class="pkm-img" src="${allPokemons[pokemon].image}" alt="pokemon bild">
                    </div>
                    <div>
                        <h2 class="txt-center">${allPokemons[pokemon].name}</h2>
                        <div class="d-flex-c-c d-clm m-t-32 m-b-16">
                            <div class="m-b-16">
                                <button class="big-card-buttons" onclick="openInfoContainer(${weightInKg},${pokemon})">Info</button>
                                <button class="big-card-buttons" onclick="openStatContainer(${pokemon})">Stats</button>
                            </div>
                            <div id="stats_container">
                                <div class="d-flex gap32">
                                    <div class="d-flex-clm-c">
                                        <span>Height</span>
                                        <span>${((allPokemons[pokemon].height) / 10)}m</span>
                                    </div>
                                    <div class="d-flex-clm-c">
                                        <span>weight</span>
                                        <span>${weightInKg}kg</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h3 class="txt-center m-b-32">Type: <b>${allPokemons[pokemon].type.join(', ')}</b></h3>
                </div>
            </div>
        <div>
        <img onclick="showNextBigCard(${pokemon},event)" class="next-pkm-btn" src="./assets/img/arrow-right.png" alt="">
    </div>
    `;
}


function getInfoContainerHTML(weightInKg, pokemon) {
    return `
    <div class="d-flex gap32">
        <div class="d-flex-clm-c">
            <span>Height</span>
            <span>${((allPokemons[pokemon].height) / 10)}m</span>
        </div>
        <div class="d-flex-clm-c">
            <span>weight</span>
            <span>${weightInKg}kg</span>
        </div>
    </div>
`;
}


function getPokemonStatsHTML(pokemon) {
    return `
    <div>
        <h3 class="margin-8">Stats</h3>
        <table>
            <tr class="d-clm margin-8 gap8">
                <td>HP: ${allPokemons[pokemon].stats[0]}</td>
                <td>Atk: ${allPokemons[pokemon].stats[1]}</td>
                <td>Def: ${allPokemons[pokemon].stats[2]}</td>
                <td>Sp-Atk: ${allPokemons[pokemon].stats[3]}</td>
                <td>Sp-Def: ${allPokemons[pokemon].stats[4]}</td>
                <td>Int: ${allPokemons[pokemon].stats[5]}</td>
            <tr>
        </table>
    </div>
    `;
}


// function getPokemonEvolutionsHTML(evoUrl, pokemonId) {
//     return `
//     <div>
//         <h4 class="margin-8">Evolutions</h4>
//         <div class="d-flex gap8">
//             <div class="d-clm margin-8">
//                 <img>
//                 <span>${pokemonId}</span>
//             </div>
//             <div class="d-clm margin-8">
//                 <img>
//                 <span>${pokemonId}</span>
//             </div>
//             <div class="d-clm margin-8">
//                 <img>
//                 <span>${pokemonId}</span>
//             </div>
//         </div>
//     </div>
//     `;
// }


function getAllPokemonHTML(pokemon, firstType, weightInKg) {
    return `
    <div id="pokemon${pokemon}" onclick="openBigPokemonCard(${pokemon})" class="pkm-card b-${firstType}">
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
                <div class="d-flex-c-c m-t-32 m-b-32 gap32">
                    <div class="d-flex-clm-c">
                        <span>Height</span>
                        <span>${((allPokemons[pokemon].height) / 10)}m</span>
                    </div>
                    <div class="d-flex-clm-c">
                        <span>weight</span>
                        <span>${weightInKg}kg</span>
                    </div>
                </div>
                <h3 class="txt-center m-b-16">Type: <b>${allPokemons[pokemon].type.join(', ')}</b></h3>
            </div>
        </div>
    </div>
`;
}


function getFilteredPokemonHTML(i, firstType, weightInKg) {
    return `
    <div onclick="openBigPokemonCard(${i})" class="pkm-card b-${firstType}">
        <div class="d-flex-bw-c margin-8">
            <p>#${filtertPokemon[i].id}</p>
            <div>Typ Color</div>
        </div>
        <div class="d-flex-clm-c m-t-32">
            <div class="pkm-img-container d-flex-c-c">
                <img class="pkm-img" src="${filtertPokemon[i].image}" alt="pokemon bild">
            </div>
            <div>
                <h2 class="txt-center">${filtertPokemon[i].name}</h2>
                <div class="d-flex-c-c m-t-32 m-b-32 gap32">
                    <div class="d-flex-clm-c">
                        <span>Height</span>
                        <span>${((filtertPokemon[i].height) / 10)}m</span>
                    </div>
                    <div class="d-flex-clm-c">
                        <span>weight</span>
                        <span>${weightInKg}kg</span>
                    </div>
                </div>
                <h3 class="txt-center m-b-16">Type: <b>${filtertPokemon[i].type.join(', ')}</b></h3>
            </div>
        </div>
    </div>
`;
}