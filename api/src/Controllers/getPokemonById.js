const axios = require("axios");
const { Pokemons, Types } = require("../db");
const URL = "https://pokeapi.co/api/v2/pokemon/";

const getPokemonById = async (req, res) => {
  try {
    const { id } = req.params;
    const isUUID =/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
    let poke;
    if (isUUID) {
      const dbPokemon = await Pokemons.findOne({
        where: { id: id },
        include: {
          attributes: ["name"],
          model: Types,
          through: {
            attributes: [],
          },
        },
      });

      if (dbPokemon) {
        poke = {
          id: dbPokemon.id,
          name: dbPokemon.name,
          image: dbPokemon.sprites.other.dream_world.front_default,
          hp: dbPokemon.stats[0].base_stat,
          attack: dbPokemon.stats[1].base_stat,
          defense: dbPokemon.stats[2].base_stat,
          speed: dbPokemon.stats[3].base_stat,
          height: dbPokemon.height,
          weight: dbPokemon.weight,
          type: dbPokemon.types.map((tipo) => ({
            name: tipo.type.name,
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

    return res.status(200).json(poke);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

module.exports = { getPokemonById };