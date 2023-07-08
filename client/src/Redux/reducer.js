import {  GET_DETAILS,RESET_DETAILS, GET_POKEMONS, GET_TYPES, SEARCH_POKEMON, RESET_SEARCH } from "./action_types";

const initialState = {
    pokemons: [],
    types: [],
    details:{},
    found_pokemon: null,
    error_search: null,
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

        default: return state;
    }
}

export default rootReducer;