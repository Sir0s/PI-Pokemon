const axios = require("axios");
const { Pokemons, Types } = require("../db");
const URL = "https://pokeapi.co/api/v2/pokemon";

const getAllPokemons = async (req, res) => {
  try {
    //const apiResponse = await axios.get(URL);
    //const count = apiResponse.data.count;
    const count = 386; //descomentar las lineas anteriores para una lista entera de la api de pokemon
    // o usar los 386 pokemos hasta jhoto
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
      type: poke.data.types.map(tipo => ({name: tipo.type.name}))    
    })
  );

    const arrayPokemonsDb = await Pokemons.findAll({
      include: {
        attributes: ["name"],
        model: Types,
        through: {
          attributes: [],
        },
      },
    });
    console.log(arrayPokemonsDb)
    const allPokemons = arrayPokemonsApi.concat(arrayPokemonsDb);
    return res.status(200).json(allPokemons);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllPokemons,
};
