import { ActionType } from './actions';

const initialState = {
  // username: '',
  // password: '',
  dataPokemon: {
    name: '',
    url: '',
  },
  errorDataPokemon: {
    name: '',
    url: '',
  },
  pokemonList: [],
  // metaPokemonList: {
  //   count: 0,
  //   next: '',
  //   previous: '',
  //   offset: 0,
  //   limit: 20,
  //   page: 0,
  // },
  metaPokemonSearch: {
    offset: 1,
    limit: 20,
    general: '',
  },
  countPokemon: 0,
  pokemonID: '',
};

const PokemonReducer = (state = initialState, action) => {
  switch (action.type) {
    // case ActionType.SET_USERNAME:
    //   return {
    //     ...state,
    //     username: action.payload,
    //   };
    // case ActionType.SET_PASSWORD:
    //   return {
    //     ...state,
    //     password: action.payload,
    //   };
    case ActionType.SET_DATA_POKEMON:
      return {
        ...state,
        dataPokemon: action.payload,
      };
    case ActionType.CLEAR_DATA_POKEMON:
      return {
        ...state,
        dataPokemon: initialState.dataPokemon,
      };
    case ActionType.CLEAR_ERROR_POKEMON:
      return {
        ...state,
        errorDataPokemon: initialState.errorDataPokemon,
      };
    case ActionType.SET_POKEMON_LIST:
      return {
        ...state,
        pokemonList: action.payload,
      };
    case ActionType.SET_POKEMON_ID:
      return {
        ...state,
        pokemonID: action.payload,
      };
    // case ActionType.SET_META_POKEMON_LIST:
    //   return {
    //     ...state,
    //     metaPokemonList: action.payload,
    //   };
    case ActionType.SET_META_POKEMON_SEARCH:
      return {
        ...state,
        metaPokemonSearch: action.payload,
      };
    case ActionType.SET_COUNT_POKEMON:
      return {
        ...state,
        countPokemon: action.payload,
      };
    case ActionType.SET_ERROR_POKEMON:
      return {
        ...state,
        errorDataPokemon: action.payload,
      };
    // case ActionType.SET_LOGOUT:
    //   return initialState;
    // case ActionType.SET_TOKEN_EXP:
    //   return initialState;
    default:
      return { ...state };
  }
};

export default PokemonReducer;
