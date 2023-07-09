const axios = require("axios");
const { Pokemons, Types } = require("../db");
const URL = "https://pokeapi.co/api/v2/pokemon";

const getAllPokemons = async () => {
  try {
    const count = 386; // Uncomment the lines below for the entire Pokemon API list
    // const apiResponse = await axios.get(URL);
    // const count = apiResponse.data.count;
    const arrayResultApi = await axios.get(`${URL}?limit=${count}&offset=0`).then(response => response.data.results);
    const arrayPromises = arrayResultApi.map(poke => axios.get(poke.url));
    const pokemonResponses = await Promise.all(arrayPromises);

    const arrayPokemonsApi = pokemonResponses.map(poke =>
      ({
        id: poke.data.id,
        name: poke.data.name,
        image: poke.data.sprites.other.dream_world.front_default,
        hp: poke.data.stats[0].base_stat,
        attack: poke.data.stats[1].base_stat,
        defense: poke.data.stats[2].base_stat,
        speed: poke.data.stats[3].base_stat,
        height: poke.data.height,
        weight: poke.data.weight,
        type: poke.data.types.map(tipo => ({ name: tipo.type.name }))
      })
    );

    const arrayPokemonsDb = await Pokemons.findAll({
      include: {
        attributes: ["name"],
        model: Types,
        through: { attributes: [] },
      },
    });

    const allPokemons = arrayPokemonsApi.concat(arrayPokemonsDb);
    return allPokemons;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  getAllPokemons,
};

