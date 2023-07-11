const { getPokemonFromApi, getPokemonFromDB } = require('../Controllers/getPokemonByName');

const searchPokemonByNameHandler = async (req, res, next) => {
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
};

module.exports = searchPokemonByNameHandler;
