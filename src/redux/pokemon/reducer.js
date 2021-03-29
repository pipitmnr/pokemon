import { ActionType } from './actions';

const initialState = {
  pokemonList: [],
  myPokemonList: [],
};

const PokemonReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_POKEMON_LIST:
      return {
        ...state,
        pokemonList: action.payload,
      };
    case ActionType.SET_MY_POKEMON_LIST:
      return {
        ...state,
        myPokemonList: action.payload,
      };
    default:
      return { ...state };
  }
};

export default PokemonReducer;
