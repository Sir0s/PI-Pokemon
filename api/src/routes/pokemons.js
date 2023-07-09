const { getPokemonById } = require('../Controllers/getPokemonById');
const {getAllPokemons} = require('../Controllers/getAllPokemons');
const {getPokemonFromApi,getPokemonFromDB}  = require('../Controllers/getPokemonByName.js');
const {postPokemon} = require('../Controllers/postPokemon')
const { Router } = require('express');
const router = Router();







router.get('/name', async (req, res, next) => {
  try {
    const { name } = req.query;

    const pokemonSearchApi = await getPokemonFromApi(name);
    const pokemonSearchDB = await getPokemonFromDB(name);

    if (pokemonSearchApi !== null) {
      return res.status(200).json(pokemonSearchApi);
    }

    if (pokemonSearchDB !== null) {
      return res.status(200).json(pokemonSearchDB);
    }

    return res.status(404).json({ message: 'Pokemon not found' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

  router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const poke = await getPokemonById(id);
      return res.status(200).json(poke);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  });

  router.get("/", async (req, res) => {
    try {
      const allPokemons = await getAllPokemons();
      return res.status(200).json(allPokemons);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });


  router.post("/", async (req, res) => {
    try {
      const { name, image, hp, attack, defense, speed, height, weight, types } = req.body;
      const newPokemon = await postPokemon(name, image, hp, attack, defense, speed, height, weight, types);
      return res.status(200).json(newPokemon);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

module.exports = router;