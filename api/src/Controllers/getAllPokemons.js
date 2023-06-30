const axios = require("axios");
const { Pokemon, Types } = require("../db");
const URL = "https://pokeapi.co/api/v2/pokemon";

async function getPokemonsApp() {
  let arrayPokemonsApi = [];
  await axios.get(`${URL}`).then(async (response) => {
      let arrayResultApi = response.data.results;
      let arrayPromises = [];

      arrayResultApi.map((poke) => arrayPromises.push(axios.get(poke.url)));

      await Promise.all(arrayPromises).then((pokemons) => {
          arrayPokemonsApi = pokemons.map((poke) => {
            return {
              id: poke.data.id,
              name: poke.data.name,
              image: poke.data.sprites.other.dream_world.front_default, // url imagen
              hp: poke.data.stats[0].base_stat,
              attack: poke.data.stats[1].base_stat,
              defense: poke.data.stats[2].base_stat,
              speed: poke.data.stats[3].base_stat,
              height: poke.data.height,
              weight: poke.data.weight,
              type: poke.data.types.map((tipo) => {
                return {
                  name: tipo.type.name,
                };
              }),
            };
          });
        })
        .catch((error) => {
          return error.message;
        });
    })
    .catch((error) => {
      return error.message;
    });

  return arrayPokemonsApi;
}

async function getPokemonsDB() {
  try {
    const arrayPokemonsDb = await Pokemon.findAll({
      include: {
        attributes: ["name"],
        model: Types,
        through: {
          attributes: [],
        },
      },
    });
    return arrayPokemonsDb;
  } catch (error) {
    return error.message;
  }
}
const getAllPokemons = async(req,res)=> {
  try {
    let PokemonsApp = await getPokemonsApp();
    let PokemonsDB = await getPokemonsDB(); 
    return res.status(200).json(PokemonsApp.concat(PokemonsDB));
  } catch (error) {
    return res.status(500).send('Error Code: '+error.response.status +' '+error.response.data);;
  }
};
module.exports = { getAllPokemons };
