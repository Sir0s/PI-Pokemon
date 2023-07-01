const axios = require('axios');
const {Types} = require('../db');
const URL = "https://pokeapi.co/api/v2/type";

const getAllTypes =  async (req, res) => {
    try 
    {
        const typeList = await Types.findAll();
        
        if (typeList.length === 0) {
           
            try{
                const response = await axios.get(URL);
                const typesList = response.data.results.map((tipo) => {
                                            return { name: tipo.name }
                                            });
                await Types.bulkCreate(typesList);
                res.status(200).json(typesList);
            }
            catch(error){
                return res.status(500).send(error.message)
            }
        }
        else {
            return res.status(200).json(typeList); 
        }
    } 
    catch (error)
    {
        return res.status(500).send(error.message)
    }
}




module.exports = {getAllTypes};