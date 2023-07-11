import {
  RESET_CREATED,
  ERROR_SEARCH,
  ERROR_CREATION,
  CREATE_POKEMON,
  GET_DETAILS,
  RESET_DETAILS,
  GET_POKEMONS,
  GET_TYPES,
  SEARCH_POKEMON,
  RESET_SEARCH,
} from "./action_types";

const initialState = {
  pokemons: [],
  types: [],
  details: {},

  found_pokemon: null,
  error_search: false,
  error_search_message: "",

  created: false,
  error: "",
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_POKEMONS: {
      return {
        ...state,
        pokemons: payload,
      };
    }
    case GET_TYPES: {
      return {
        ...state,
        types: payload,
      };
    }
    case RESET_DETAILS: {
      return {
        ...state,
        details: {},
      };
    }
    case GET_DETAILS: {
      return {
        ...state,
        details: payload,
      };
    }
    case SEARCH_POKEMON: {
      return {
        ...state,
        found_pokemon: payload,
      };
    }
    case RESET_SEARCH: {
      return {
        ...state,
        found_pokemon: null,
        error_search: false,
      };
    }
    case ERROR_CREATION: {
      return {
        ...state,
        error: payload,
        created: false,
      };
    }
    case CREATE_POKEMON: {
      const { id, name, image, types, attack, defense, speed, hp } = payload;
      let mappedTypes = types.map((type) => {
        return { name: type.name };
      });

      let newPokemon = {
        id,
        name,
        image,
        types: mappedTypes,
        attack,
        defense,
        speed,
        hp,
      };

      return {
        ...state,
        pokemons: [...state.pokemons, newPokemon],
        created: true,
        error: "",
      };
    }

    case RESET_CREATED: {
      return {
        ...state,
        created: false,
        error: "",
      };
    }

    case ERROR_SEARCH: {
      return {
        ...state,
        error_search: true,
        error_search_message: "Pokemon not found.",
      };
    }

    default:
      return state;
  }
};

export default rootReducer;
