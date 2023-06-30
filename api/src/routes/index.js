const { Router } = require('express');
const { getPokemonById } = require('../Controllers/getPokemonById');
const {getAllPokemons} = require('../Controllers/getAllPokemons')
//const { getAllPokes } = require('../Controllers/getAllPokes');


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');




const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/pokemon/:id", getPokemonById)
router.get("/pokemon", getAllPokemons)



module.exports = router;
