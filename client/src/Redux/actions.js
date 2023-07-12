import axios from "axios";
import {
  GET_DETAILS,
  RESET_DETAILS,

  GET_POKEMONS,
  GET_TYPES,

  SEARCH_POKEMON,
  RESET_SEARCH,
  ERROR_SEARCH,

  CREATE_POKEMON,
  ERROR_CREATION,
  RESET_CREATED,
  
 
  
} from "./action_types";
const URL_SERVER_POKEMONS = "http://localhost:3001/pokemons";
const URL_SERVER_TYPES = "http://localhost:3001/types";

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
        console.log(`Error de conexion Servidor. Error: ${error.message}`);
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
          payload: response.data, // obtiene los tipos
        });
      })
      .catch((error) => {
        console.log(`Error de conexion Servidor. Error: ${error.message}`);
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
      console.log(`No se pudo obtener la informacion. Error: ${error.message}`);
    }
  };
};
export const resetDetails = () => {
  return {
    type: RESET_DETAILS,
  };
}

export function searchPokemon(search) {
    return function (dispatch) {
      axios.get(`${URL_SERVER_POKEMONS}/name?name=${search}`)
        .then((response) => {
          dispatch({
            type: SEARCH_POKEMON,
            payload: response.data,
          });
        })
        .catch((error) => {  
            dispatch({
              type: ERROR_SEARCH,
              payload: error.message
            });
          
        });
    };
  }
  

export const resetSearch = () => {
    return {
      type: RESET_SEARCH,
    };
  }

export const createPokemon = (pokemon) =>{
  return function (dispatch){
    axios.post(URL_SERVER_POKEMONS, pokemon).then((response) => {
      dispatch({
        type: CREATE_POKEMON,
        payload: response.data,
        created:true,
      });
    }).catch((error) =>{dispatch({
      type: ERROR_CREATION,
      payload: error.message,
      created:false
    })})
  }
}

export function resetCreated(){
  return {
      type: RESET_CREATED,
      payload:false,
  }
}
