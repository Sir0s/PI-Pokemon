import axios from 'axios';
import {
  GET_POKEMONS,
  GET_TYPES,
  GET_DETAILS,
  RESET_DETAILS,
  SEARCH_POKEMON,
  RESET_SEARCH,
  ERROR_SEARCH,
  CREATE_POKEMON,
  ERROR_CREATION,
  RESET_CREATED,
  SET_SELECTED_TYPE,
  SET_FILTER_OPTION,
  SET_SORT_ORDER,
} from './action_types';

const URL_SERVER_POKEMONS = 'http://localhost:3001/pokemons';
const URL_SERVER_TYPES = 'http://localhost:3001/types';

export const getPokemons = () => {
  return function (dispatch) {
    axios
      .get(URL_SERVER_POKEMONS)
      .then((response) => {
        dispatch({
          type: GET_POKEMONS,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(`Error de conexión con el servidor. Error: ${error.message}`);
      });
  };
};

export const getTypes = () => {
  return function (dispatch) {
    axios
      .get(URL_SERVER_TYPES)
      .then((response) => {
        dispatch({
          type: GET_TYPES,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(`Error de conexión con el servidor. Error: ${error.message}`);
      });
  };
};

export const getPokemonById = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${URL_SERVER_POKEMONS}/${id}`);
      return dispatch({
        type: GET_DETAILS,
        payload: response.data,
      });
    } catch (error) {
      console.log(`No se pudo obtener la información. Error: ${error.message}`);
    }
  };
};

export const resetDetails = () => {
  return {
    type: RESET_DETAILS,
  };
};
// normalizar los datos del req.query name
function normalizePokemonData(data) {
  if (data.Types) {
    
    const types = data.Types.map((type) => type.name);

    return {
      id: data.id,
      name: data.name,
      image: data.image,
      hp: data.hp,
      attack: data.attack,
      defense: data.defense,
      speed: data.speed,
      height: data.height,
      weight: data.weight,
      types: types,
    };
  } else {
    
    const types = data.type.map((type) => type.name);

    return {
      id: data.id,
      name: data.name,
      image: data.image,
      hp: data.hp,
      attack: data.attack,
      defense: data.defense,
      speed: data.speed,
      height: data.height,
      weight: data.weight,
      types: types,
    };
  }
}
export function searchPokemon(search) {
  return function (dispatch) {
    axios
      .get(`${URL_SERVER_POKEMONS}/name?name=${search}`)
      .then((response) => {
        const data = response.data;
        const foundPokemon = normalizePokemonData(data);

        dispatch({
          type: SEARCH_POKEMON,
          payload: foundPokemon,
        });
      })
      .catch((error) => {
        dispatch({
          type: ERROR_SEARCH,
          payload: error.message,
        });
      });
  };
}


export const resetSearch = () => {
  return {
    type: RESET_SEARCH,
  };
};

export const createPokemon = (pokemon) => {
  return function (dispatch) {
    axios
      .post(URL_SERVER_POKEMONS, pokemon)
      .then((response) => {
        dispatch({
          type: CREATE_POKEMON,
          payload: response.data,
          created: true,
        });
      })
      .catch((error) => {
        dispatch({
          type: ERROR_CREATION,
          payload: error.message,
          created: false,
        });
      });
  };
};

export const resetCreated = () => {
  return {
    type: RESET_CREATED,
  };
};

export const setSelectedType = (type) => {
  return {
    type: SET_SELECTED_TYPE,
    payload: type,
  };
};

export const setFilterOption = (option) => {
  return {
    type: SET_FILTER_OPTION,
    payload: option,
  };
};

export const setSortOrder = (order) => {
  return {
    type: SET_SORT_ORDER,
    payload: order,
  };
};
