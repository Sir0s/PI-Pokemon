const { Router } = require('express');
const { getPokemonById } = require('../Controllers/getPokemonById');
const {getAllPokemons} = require('../Controllers/getAllPokemons');
const {getPokemonByName} = require('../Controllers/getPokemonByName');
const { getAllTypes } = require('../Controllers/getAllTypes');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/pokemon/:id", getPokemonById)
router.get("/", getAllPokemons)
router.get("/pokemon/name", async (req,res)=>{
    try{
    const name = req.query.name.toLocaleLowerCase();
    let search = await getPokemonByName(name)
    if (search)return res.status(200).json(search)
}catch(error){
    return res.status(404).json(error.message);
}
});
router.get("/types", getAllTypes)



module.exports = router;
