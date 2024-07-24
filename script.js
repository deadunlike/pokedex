const pokeContainer = document.querySelector("#pokeContainer");
const pokemonCount = 702;
const colors = {
    fire: '#fd7d24',
    grass: '#9bcc50',
    electric: '#d7ca79',
    water: '#4592c4',
    ground: '#f4e7da',
    rock: '#da38c21',
    fairy: '#fdb9e9',
    poison: '#b97fc9',
    bug: '#729f3f',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#c3d0d5',
    fighting: '#a9b755e',
    normal: '#e5e9ea'
};

const mainTypes = Object.keys(colors);

const fetchPokemons = async () => {
    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemons(i);
    }
};

const getPokemons = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const resp = await fetch(url);
    const data = await resp.json();
    createPokemonCard(data);
};

const createPokemonCard = (poke) => {
    const card = document.createElement('div');
    card.classList.add("pokemon");

    const name = poke.name[0].toUpperCase() + poke.name.slice(1);
    const id = poke.id.toString().padStart(3, '0');

    const pokeTypes = poke.types.map(type => type.type.name);
    const type = mainTypes.find(type => pokeTypes.indexOf(type) > -1);
    const color = colors[type];

    card.style.backgroundColor = color;

    const pokemonInnerHTML = `
    <div class="imgContainer">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt="${name}">
    </div>
    <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
        <small class="type">Tipo: <span>${type}</span></small>
    </div>
    `;

    card.innerHTML = pokemonInnerHTML;

    pokeContainer.appendChild(card);
};

fetchPokemons();
