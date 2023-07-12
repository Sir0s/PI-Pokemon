const axios = require("axios");
const { Pokemons, Types } = require("../db");
const URL = "https://pokeapi.co/api/v2/pokemon/";

async function getPokemonById(id) {
  
  
    const isUUID = isNaN(id) ? true : false ;
    let poke;

    if (isUUID) {
      const dbPokemon = await Pokemons.findByPk(id, { include: { model: Types, as: "Types" } });

      
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
      
    }else{
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
  
}

module.exports = { getPokemonById };
