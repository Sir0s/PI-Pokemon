const { Router } = require('express');
const router = Router();

const getAllPokemonsHandler = require('../PokemonHandlers/getAllPokemonsHandler');
const searchPokemonByNameHandler = require('../PokemonHandlers/searchPokemonByNameHandler');
const getPokemonByIdHandler = require('../PokemonHandlers/getPokemonByIdHandler');
const createPokemonHandler = require('../PokemonHandlers/postPokemonHandler');

router.get("/", getAllPokemonsHandler);

router.get('/name', searchPokemonByNameHandler);

router.get("/:id", getPokemonByIdHandler);

router.post('/', createPokemonHandler);

module.exports = router;
