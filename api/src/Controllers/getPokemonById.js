const axios = require('axios');
const URL = 'https://pokeapi.co/api/v2/pokemon/';

const getPokemonById = async(req,res)=>{
   
    try{
        const {id} = req.params
        const {data} = await axios.get(URL+id); 
        const poke =  {
            id: data.id,
            name: data.name,
            image: data.sprites.other.dream_world.front_default,  
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            speed: data.stats[3].base_stat,
            height: data.height,
            weight: data.weight,
            type: data.types.map((pokeType) => { return {name: pokeType.type.name}})
           
        }
        return res.status(200).json(poke)
        } catch (error) { 
            return res.status(404).send('Error Code: '+error.response.status +' '+error.response.data);     
        }
        
    }


module.exports={getPokemonById};