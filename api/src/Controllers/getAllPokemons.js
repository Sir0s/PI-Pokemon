const axios = require("axios");
const { Pokemons, Types } = require("../db");
const URL = "https://pokeapi.co/api/v2/pokemon";

const getAllPokemons = async () => {
  const count = 385;
  const arrayResultApi = await axios
    .get(`${URL}?limit=${count}&offset=0`)
    .then((response) => response.data.results);
  const arrayPromises = arrayResultApi.map((poke) => axios.get(poke.url));
  const pokemonResponses = await Promise.all(arrayPromises);

  const arrayPokemonsApi = pokemonResponses.map((poke) => ({
    id: poke.data.id,
    name: poke.data.name,
    image: poke.data.sprites.other.dream_world.front_default,
    hp: poke.data.stats[0].base_stat,
    attack: poke.data.stats[1].base_stat,
    defense: poke.data.stats[2].base_stat,
    speed: poke.data.stats[3].base_stat,
    height: poke.data.height,
    weight: poke.data.weight,
    types: poke.data.types.map((tipo) => tipo.type.name),
    created: false,
  }));

  const arrayPokemonsDb = await Pokemons.findAll({
    include: {
      model: Types,
      through: {
        attributes: [],
      },
    },
  });

  const allPokemons = arrayPokemonsApi.concat(
    arrayPokemonsDb.map((pokemonDb) => ({
      id: pokemonDb.id,
      name: pokemonDb.name,
      image: pokemonDb.image,
      hp: pokemonDb.hp,
      attack: pokemonDb.attack,
      defense: pokemonDb.defense,
      speed: pokemonDb.speed,
      height: pokemonDb.height,
      weight: pokemonDb.weight,
      types: pokemonDb.Types.map((tipo) => tipo.name),
      created: true,
    }))
  );

  return allPokemons;
};

module.exports = {
  getAllPokemons,
};
