let previous, next = null;
const prevBtnEl = document.getElementById("previous");
const nextBtnEl = document.getElementById("next");
const pokemonCards = document.getElementById("pokemon-cards");
const loader = document.getElementById("loader");
const pokedex = document.getElementById("pokedex");
const typeColor = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
};

const fetchApi = async (url) => {
    return (await fetch(url)).json();
}

const showData = async (url) => {
    loader.classList.remove("d-none");
    const data = await fetchApi(url)
    const results = data.results;
    const resultsLength = results.length;
    const list = [];
    previous = data.previous;
    next = data.next;

    for (let i = 0; i < resultsLength; i++) {
        list.push(fetchApi(results[i].url))
    }

    Promise.all(list).then(data => {
        while (pokemonCards.hasChildNodes()) {
            pokemonCards.removeChild(pokemonCards.firstChild)
        }
        display(data)
        loader.classList.add("d-none");
    })
}

const display = async (data) => {
    try {
        for (let i = 0; i < data.length; i++) {
            const pokeId = data[i].id
            const pokeName = data[i].name
            const pokeImg = data[i].sprites.other['official-artwork'].front_default;
            const pokeTypes = data[i].types.map((pokemon) => {
                let bgColor;
                for (const type in typeColor) {
                    if (pokemon.type.name === type) {
                        bgColor = typeColor[type];
                    }
                }
                return `<li class="list-group-item" style="background:${bgColor}">${pokemon.type.name}</li>`
            }).join("")

            pokemonCards.innerHTML += `
            <div class="card shadow-sm" onclick="selectCard(${pokeId})">
                <img src="${pokeImg}" class="card-img-top p-3" alt="${pokeName}">
                <div class="card-body px-0">
                    <h5 class="card-title text-center">${pokeName}</h5>
                    <div class="card-text pokemon-types d-flex justify-content-center gap-1">${pokeTypes}</div>
                    <div class="card-text pokemon-id">${pokeId}</div>
                </div>
            </div>
            `
        }
    } catch (error) {
        console.log("Error", error)
    }
}

const selectCard = async (id) => {
    const link = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(link);
    const poke = await res.json();
    displayPopup(poke);
}

const displayPopup = (poke) => {
    const height = poke.height * 0.1;
    const weight = poke.weight * 0.1;
    let bgColor;
    for (const type in typeColor) {
        if (poke.types[0].type.name === type) {
            bgColor = typeColor[type];
        }
    }
    const pokeAbilities = poke.abilities.map((pokemon) => {
        return `<li class="list-group-item">${pokemon.ability.name}</li>`
    }).join("|")
    const htmlString = `
    <div class="popup" style="background:${bgColor}99">
        <button id="closeBtn" onclick="closePopup()">Close</button>
        <div class="pokeCard">
            <img class="card-image" src="${poke.sprites.front_default}"/>
            <h2 class="card-title" style="text-align:center;">${poke.name}</h2>
            <p>Height: ${height.toFixed(1)}m | Weight: ${weight.toFixed(1)}kg</p>
            <h5 class="ability-title" style="text-align:center;">Abilities</h5>
            <div class="card-text pokemon-abilities d-flex justify-content-center gap-1">${pokeAbilities}</div>
    </div>
    `;
    pokedex.innerHTML += htmlString;
};

const closePopup = () => {
    const popup = document.querySelector('.popup');
    popup.parentElement.removeChild(popup);
}

const prevBtn = async () => (previous != null) ? await showData(previous) : alert("Lowest ID");
const nextBtn = async () => (next != null) ? await showData(next) : alert("Highest ID");

prevBtnEl.addEventListener("click", prevBtn);
nextBtnEl.addEventListener("click", nextBtn);

showData(`https://pokeapi.co/api/v2/pokemon/`)