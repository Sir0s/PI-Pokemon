const axios = require("axios");
const { Pokemons, Types } = require("../db");
const URL = "https://pokeapi.co/api/v2/pokemon/";

async function getPokemonById(id) {
  try {
  
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
    let poke;

    if (isUUID) {
      const dbPokemon = await Pokemons.findByPk(id, { include: { model: Types, as: "Types" } });

      if (dbPokemon) {
        poke = {
          id: dbPokemon.id,
          name: dbPokemon.name,
          image: dbPokemon.image,
          hp: dbPokemon.hp,
          attack: dbPokemon.attack,
          defense: dbPokemon.defense,
          speed: dbPokemon.speed,
          height: dbPokemon.height,
          weight: dbPokemon.weight,
          type: dbPokemon.Types.map((type) => ({
            name: type.name,
          })),
        };
      }
    }

    if (!poke) {
      const response = await axios.get(URL + id);
      const data = response.data;
      poke = {
        id: data.id,
        name: data.name,
        image: data.sprites.other.dream_world.front_default,
        hp: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        speed: data.stats[3].base_stat,
        height: data.height,
        weight: data.weight,
        type: data.types.map((tipo) => ({
          name: tipo.type.name,
        })),
      };
    }

    return poke;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { getPokemonById };
