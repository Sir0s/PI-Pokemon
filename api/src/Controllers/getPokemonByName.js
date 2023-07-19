const axios = require("axios");
const { Pokemons, Types } = require("../db");


const URL = "https://pokeapi.co/api/v2/pokemon/";

async function getPokemonFromApi(name) {
  try {
    const response = await axios.get(`${URL}/${name.toLowerCase()}`);
    const data = response.data;

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
    return poke;
  } catch (error) {
   return null
  }
}

async function getPokemonFromDB(name) {
  try {
    const searchDB = await Pokemons.findOne({
      where: {name : name.toLowerCase()},
      include: { model: Types, as: "Types" }
    });
   
    return searchDB
    
  } catch (error) {
   return null
  }
}

module.exports = { getPokemonFromApi,getPokemonFromDB };
