const { getPokemonById } = require('../Controllers/getPokemonById');

const getPokemonByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const poke = await getPokemonById(id);
    return res.status(200).json(poke);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

module.exports = getPokemonByIdHandler;
