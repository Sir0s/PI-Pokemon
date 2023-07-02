const { Router } = require('express');
const { getPokemonById } = require('../Controllers/getPokemonById');
const {getAllPokemons} = require('../Controllers/getAllPokemons');
const {getPokemonByName}  = require('../Controllers/getPokemonByName.js');
const { getAllTypes } = require('../Controllers/getAllTypes');
const {postPokemon} = require('../Controllers/postPokemon')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/types", getAllTypes)
router.get("/pokemons/name", async (req, res) => {
    try {
 
      const name = req.query.name.toLowerCase();
      const searchResult = await getPokemonByName(name);
      return res.status(200).json(searchResult);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  } );
router.get("/pokemons/:id", getPokemonById);
router.get("/pokemons", getAllPokemons);
router.post("/pokemons",postPokemon)



module.exports = router;
