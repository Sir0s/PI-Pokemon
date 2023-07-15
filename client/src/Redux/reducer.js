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

const initialState = {
  pokemons: [],
  types: [],
  details: [],
  found_pokemon: null,
  error_search: false,
  error_search_message: '',
  created: false,
  error: '',
  selectedType: '',
  filterOption: 'All',
  sortOrder: '',
 
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
        error_search_message: '',
      };
    }
    case ERROR_CREATION: {
      return {
        ...state,
        created: false,
        error: payload,
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
        error: '',
      };
    }
    case RESET_CREATED: {
      return {
        ...state,
        created: false,
        error: '',
      };
    }
    case ERROR_SEARCH: {
      return {
        ...state,
        error_search: true,
        error_search_message: 'Pokemon not found.',
      };
    }
    case SET_SELECTED_TYPE: {
      return {
        ...state,
        selectedType: payload,
      };
    }
    case SET_FILTER_OPTION: {
      return {
        ...state,
        filterOption: payload,
      };
    }
    case SET_SORT_ORDER: {
      return {
        ...state,
        sortOrder: payload,
      };
    }
    default:
      return state;
  }
};

export default rootReducer;
