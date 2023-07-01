const { Pokemons, Types } = require('../db');
const getPokemonByName = require('./getPokemonByName');

const postPokemon = async (req, res) => {
  const { name, image, hp, attack, defense, speed, height, weight, types } = req.body;
  
  if (!name || !image) {
    return res.status(400).json({ error: 'El nombre y la imagen son campos requeridos' });
  }

  let pokeSearch = await getPokemonByName(name);
  if (pokeSearch) {
    return res.status(400).json({ error: 'Nombre de Pokémon no disponible' });
  }

  try {
    const newPokemon = await Pokemons.create(req.body);

    if (newPokemon && types && Array.isArray(types)) {
      const promisesTypes = types.map(async (tipo) => {
        let type = await Types.findAll({
          where: { name: tipo.name },
        });

        return newPokemon.setTypes(type);
      });

      await Promise.all(promisesTypes);
    }

    let resultPokemon = await Pokemons.findAll({
      where: {
        name: name,
      },
      include: [
        {
          model: Types,
          attributes: ['id', 'name'],
        },
      ],
    });

    return res.status(200).json(resultPokemon[0]);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = postPokemon;