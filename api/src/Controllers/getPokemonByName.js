const axios = require("axios");
const { Pokemons } = require("../db");
const { Sequelize } = require("sequelize");

const URL = "https://pokeapi.co/api/v2/pokemon/";

async function getPokemonByName(name) {
  try {
    
    const response = await axios.get(`${URL}/${name}`);
    const data = response.data;

     const searchDB = await Pokemons.findOne({
      where: {
        name: {
          [Sequelize.Op.eq]: name,
        },
      },
    });
    
    if (!data && !searchDB) {
      const error = new Error("Pokémon not found");
      error.statusCode = 404;
      throw error;
    }
 
    const poke = {
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

    const searchResult = { ...poke, ...searchDB };
    return searchResult;
  } catch (error) {
    return error.message ;
  }
};

module.exports = { getPokemonByName };