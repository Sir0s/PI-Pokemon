const { postPokemon } = require('../Controllers/postPokemon');
const { getAllPokemons } = require('../Controllers/getAllPokemons');

const createPokemonHandler = async (req, res) => {
  const { name, image, hp, attack, defense, speed, height, weight, types } = req.body;

  try {
    const newPokemon = await postPokemon(name, image, hp, attack, defense, speed, height, weight, types);
    if (newPokemon !== null) {
      // Update the Pokemon list
      const allPokemons = await getAllPokemons();
      // Do any additional processing or filtering on the updated list as needed
      // For example, you can sort the list or filter it based on certain criteria

      return res.status(201).json({ newPokemon, allPokemons });
    } else {
      return res.status(400).json({ error: "Fallo en la creacion" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = createPokemonHandler;
