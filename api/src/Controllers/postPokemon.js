const { Pokemons, Types } = require("../db");
const { getPokemonByName } = require("./getPokemonByName");

const postPokemon = async (req, res) => {
  const { name, image, hp, attack, defense, speed, height, weight, types } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).json({ error: "El nombre es un campo requerido" });
  }

  const nameRegex = /^[A-Za-z]+( [A-Za-z]+)*$/;
  if (!nameRegex.test(name)) {
    return res.status(400).json({ error: "El nombre debe contener solo caracteres alfabéticos y un solo espacio entre palabras" });
  }

  const formattedName = name.trim().replace(/\s+/g, " ");

  let pokeSearch = await getPokemonByName({ query: { name: formattedName } });

  if (pokeSearch.error) {
    return res.status(400).json({ error: `El nombre de Pokémon: ${formattedName} no está disponible.` });
  } else {
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
          name: formattedName,
        },
        include: [
          {
            model: Types,
            attributes: ["id", "name"],
          },
        ],
      });

      return res.status(200).json(resultPokemon);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
};

module.exports = { postPokemon };

