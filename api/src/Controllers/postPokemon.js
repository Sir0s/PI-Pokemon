const { Pokemons, Types } = require("../db");
const { getPokemonFromApi, getPokemonFromDB } = require("./getPokemonByName");

const postPokemon = async (name, image, hp, attack, defense, speed, height, weight, types) => {
  if (!name || name.trim() === "") {
    throw new Error("El nombre es un campo requerido");
  }

  const nameRegex = /^[A-Za-z]+( [A-Za-z]+)*$/;
  if (!nameRegex.test(name)) {
    throw new Error("El nombre debe contener solo caracteres alfabéticos y un solo espacio entre palabras");
  }

  const formattedName = name.trim().replace(/\s+/g, " ");

  try {
    // Verificar que el nombre esté disponible.
    let pokemonSearch = await getPokemonFromApi(formattedName);
    
    // Búsqueda en la base de datos
    if (pokemonSearch === null) {
      pokemonSearch = await getPokemonFromDB(formattedName);
    }

    if (pokemonSearch) {
      throw new Error(`El nombre de Pokémon: ${formattedName} no está disponible.`);
    }

    const newPokemon = await Pokemons.create({
      name: formattedName,
      image,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
    });

    if (newPokemon && types && Array.isArray(types)) {
      const promisesTypes = types.map(async (tipo) => {
        let type = await Types.findAll({
          where: { name: tipo.name },
        });

        return newPokemon.setTypes(type);
      });

      await Promise.all(promisesTypes);
    }

    return newPokemon;
  } catch (error) {
    return null;
  }
};

module.exports = { postPokemon };
