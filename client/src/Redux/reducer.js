import {  ERROR_CREATION, CREATE_POKEMON, GET_DETAILS,RESET_DETAILS, GET_POKEMONS, GET_TYPES, SEARCH_POKEMON, RESET_SEARCH } from "./action_types";

const initialState = {
    pokemons: [],
    types: [],
    details:{},

    found_pokemon: null,
    error_search: null,

    created: false,
    error:''
}

const rootReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case GET_POKEMONS: {
            return{
                ...state,
                pokemons: payload,
            }
        }
       case GET_TYPES:{
        return{
            ...state,
            types: payload,
        }
       }
       case RESET_DETAILS:
        {
            return {
                ...state,
                details: {},
            }
        }
       case GET_DETAILS:{
        return {
            ...state,
            details: payload,
        }
       }
       case SEARCH_POKEMON:{
        return{
            ...state,
            found_pokemon: payload,
            error_search: null,
        }
       }
        case RESET_SEARCH: {
            return {
                ...state,
                found_pokemon: null,
                error_search: null,
            }
        }
        case ERROR_CREATION:{
            return{
                ...state,
                error: payload,
            }
        }
        case CREATE_POKEMON: {
            const { id, name, image, types, attack, defense, speed, hp } = payload;
           // const mappedTypes = types.map((type) => ({ name: type.name }));
          
            const newPokemon = {
              id,
              name,
              image,
              types, 
              attack,
              defense,
              speed,
              hp,
            };
          
            return {
              ...state,
              pokemons: [...state.pokemons, newPokemon],
              created: true,
              error: '',
            };
          }
          

        default: return state;
    }
}

export default rootReducer;