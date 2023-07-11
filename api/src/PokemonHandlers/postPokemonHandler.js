const { postPokemon } = require('../Controllers/postPokemon');

const postPokemonHandler = async (req, res) => {
  const { name, image, hp, attack, defense, speed, height, weight, types } = req.body;

  try {
    const newPokemon = await postPokemon(name, image, hp, attack, defense, speed, height, weight, types);
    if (newPokemon !== null) {
      return res.status(200).json(newPokemon);
    } else {
      return res.status(400).json({ error: "Fallo en la creacion" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = postPokemonHandler;
