const { getAllPokemons } = require('../Controllers/getAllPokemons');

const getAllPokemonsHandler = async (req, res) => {
  try {
    const allPokemons = await getAllPokemons();
    return res.status(200).json(allPokemons);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getAllPokemonsHandler;