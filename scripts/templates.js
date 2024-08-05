function getAllPokemonHTML(pokemon, firstType, weightInKg) {
    return `
    <div id="pokemon${pokemon}" onclick="openBigPokemonCard(${pokemon})" class="pkm-card pkm-card-hover b-${firstType}">
        <div class="d-flex-bw-c margin-8">
            <p>#${allPokemons[pokemon].id}</p>
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


function getBigPokemonCardHTML(pokemon, firstType, weightInKg) {
    return ` 
    <div class="d-flex-c-c d-clm gap16">
        <div class="d-flex-c-c gap16">
            <div class="big-pokemon-card b-${firstType}">
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
                            <div class="m-b-16 gap16 d-flex">
                                <button class="big-card-buttons bg-${firstType}"
                                    onclick="openInfoContainer(${weightInKg},${pokemon})">Info</button>
                                <button class="big-card-buttons bg-${firstType}" onclick="openStatContainer(${pokemon})">Stats</button>
                            </div>
                            <div id="stats_container" class="info-pokemon">
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
        </div>
        <div class="d-flex-ar-c width100 bg-${firstType} border-radius">
            <img onclick="showPrevBigCard(${pokemon},event)" class="prev-pkm-btn" src="./assets/img/arrow-left.png" alt="">
            <img onclick="showNextBigCard(${pokemon},event)" class="next-pkm-btn" src="./assets/img/arrow-right.png" alt="">
        </div>
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
    <div class="width100">
    <svg class="stats-container" aria-labelledby="chartinfo" viewBox="-10 0 200 300" preserveAspectRatio="none" width="100%" height="100%">
        <g class="bar hp-bar" tabindex="0">
            <rect width="${allPokemons[pokemon].stats[0]}" height="20" style="fill: rgb(255,224,230);" />
            <text x="1" y="15" fill="black">HP</text>
        </g>
        <g class="bar atk-bar" tabindex="0">
            <rect width="${allPokemons[pokemon].stats[1]}" height="20" y="50" style="fill: rgb(255,236,217);" />
            <text x="1" y="65" fill="black">Atk</text>
        </g>
        <g class="bar def-bar" tabindex="0">
            <rect width="${allPokemons[pokemon].stats[2]}" height="20" y="100" style="fill: rgb(234,224,200);" />
            <text x="1" y="115" fill="black">Def</text>
        </g>
        <g class="bar spAtk-bar" tabindex="0">
            <rect width="${allPokemons[pokemon].stats[3]}" height="20" y="150" style="fill: rgb(219,242,242);" />
            <text x="1" y="165" fill="black">Sp-Atk</text>
        </g>
        <g class="bar spDef-bar" tabindex="0">
            <rect width="${allPokemons[pokemon].stats[4]}" height="20" y="200" style="fill: rgb(215,236,251);" />
            <text x="1" y="215" fill="black">Sp-Def</text>
        </g>
        <g class="bar int-bar" tabindex="0">
            <rect width="${allPokemons[pokemon].stats[5]}" height="20" y="250" style="fill: rgb(235,224,255);" />
            <text x="1" y="265" fill="black">Int</text>
        </g>
        <g class="scale" transform="translate(0, 280)">
            <line x1="0" y1="0" x2="150" y2="0" stroke="white"/>
            <line x1="25" y1="0" x2="25" y2="5" stroke="white"/>
            <line x1="50" y1="0" x2="50" y2="5" stroke="white"/>
            <line x1="75" y1="0" x2="75" y2="5" stroke="white"/>
            <line x1="100" y1="0" x2="100" y2="5" stroke="white"/>
            <line x1="125" y1="0" x2="125" y2="5" stroke="white"/>
            <text x="0" y="15" fill="white" text-anchor="middle">0</text>
            <text x="25" y="15" fill="white" text-anchor="middle">25</text>
            <text x="50" y="15" fill="white" text-anchor="middle">50</text>
            <text x="75" y="15" fill="white" text-anchor="middle">75</text>
            <text x="100" y="15" fill="white" text-anchor="middle">100</text>
            <text x="125" y="15" fill="white" text-anchor="middle">125</text>
        </g>
    </svg>
    </div>
`;
}


function getFiltertPokemonHTML(i, firstType, weightInKg, filtertPokemonId) {
    return `
    <div onclick="openBigPokemonCard(${filtertPokemonId})" class="pkm-card b-${firstType}">
        <div class="d-flex-bw-c margin-8">
            <p>#${filtertPokemons[i].id}</p>
        </div>
        <div class="d-flex-clm-c m-t-32">
            <div class="pkm-img-container d-flex-c-c">
                <img class="pkm-img" src="${filtertPokemons[i].image}" alt="pokemon bild">
            </div>
            <div>
                <h2 class="txt-center">${filtertPokemons[i].name}</h2>
                <div class="d-flex-c-c m-t-32 m-b-32 gap32">
                    <div class="d-flex-clm-c">
                        <span>Height</span>
                        <span>${((filtertPokemons[i].height) / 10)}m</span>
                    </div>
                    <div class="d-flex-clm-c">
                        <span>weight</span>
                        <span>${weightInKg}kg</span>
                    </div>
                </div>
                <h3 class="txt-center m-b-16">Type: <b>${filtertPokemons[i].type.join(', ')}</b></h3>
            </div>
        </div>
    </div>
`;
}


function getFiltertBigPokemonCardHTML(searchPokemon, firstType, weightInKg) {
    return ` 
    <div class="d-flex-c-c d-clm gap16">
        <div class="d-flex-c-c gap16">
            <div class="big-pokemon-card b-${firstType}">
                <div class="d-flex-bw-c margin-8">
                    <p>#${filtertPokemons[searchPokemon].id}</p>
                    <div class="bg-${firstType}"></div>
                </div>
                <div class="d-flex-clm-c">
                    <div class="pkm-img-container d-flex-c-c">
                        <img class="pkm-img" src="${filtertPokemons[searchPokemon].image}" alt="pokemon bild">
                    </div>
                    <div>
                        <h2 class="txt-center">${filtertPokemons[searchPokemon].name}</h2>
                        <div class="d-flex-c-c d-clm m-t-32 m-b-16">
                            <div class="m-b-16 gap16 d-flex">
                                <button class="big-card-buttons bg-${firstType}"
                                    onclick="openInfoContainer(${weightInKg},${searchPokemon})">Info</button>
                                <button class="big-card-buttons bg-${firstType}" onclick="openStatContainer(${searchPokemon})">Stats</button>
                            </div>
                            <div id="stats_container" class="info-pokemon">
                                <div class="d-flex gap32">
                                    <div class="d-flex-clm-c">
                                        <span>Height</span>
                                        <span>${((filtertPokemons[searchPokemon].height) / 10)}m</span>
                                    </div>
                                    <div class="d-flex-clm-c">
                                        <span>weight</span>
                                        <span>${weightInKg}kg</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h3 class="txt-center m-b-32">Type: <b>${filtertPokemons[searchPokemon].type.join(', ')}</b></h3>
                </div>
            </div>
        </div>
        <div class="d-flex-ar-c width100 bg-${firstType} border-radius">
            <img onclick="showPrevBigCard(${searchPokemon},event)" class="prev-pkm-btn" src="./assets/img/arrow-left.png" alt="">
            <img onclick="showNextBigCard(${searchPokemon},event)" class="next-pkm-btn" src="./assets/img/arrow-right.png" alt="">
        </div>
    </div>
`;
}