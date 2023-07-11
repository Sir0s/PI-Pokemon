const axios = require('axios');
const { Types } = require('../db');
const URL_API_TYPES = "https://pokeapi.co/api/v2/type";

async function getAllTypes() {
  try {
    const typeList = await Types.findAll();

    if (typeList.length === 0) {
      const response = await axios.get(URL_API_TYPES);
      const typesList = response.data.results.map((tipo) => {
        return { name: tipo.name };
      });
      await Types.bulkCreate(typesList);
      return typesList;
    } else {
      return typeList;
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { getAllTypes };