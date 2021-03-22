//Action Types
export const ActionType = {
  SET_DATA_POKEMON: 'SET_DATA_POKEMON',
  CLEAR_DATA_POKEMON: 'CLEAR_DATA_POKEMON',
  SET_POKEMON_LIST: 'SET_POKEMON_LIST',
  SET_POKEMON_ID: 'SET_POKEMON_ID',
  // SET_META_POKEMON_LIST: 'SET_META_POKEMON_LIST',
  SET_COUNT_POKEMON: 'SET_COUNT_POKEMON',
  SET_META_POKEMON_SEARCH: 'SET_META_POKEMON_SEARCH',
  SET_ERROR_POKEMON: 'SET_ERROR_POKEMON',
  CLEAR_ERROR_POKEMON: 'CLEAR_ERROR_POKEMON',
};

const setDataPokemon = (payload) => ({
  type: ActionType.SET_DATA_POKEMON,
  payload: payload,
});

const clearDataPokemon = () => ({
  type: ActionType.CLEAR_DATA_POKEMON,
});

const clearErrorPokemon = () => ({
  type: ActionType.CLEAR_ERROR_POKEMON,
});

const setPokemonList = (payload) => ({
  type: ActionType.SET_POKEMON_LIST,
  payload: payload,
});

const setPokemonID = (payload) => ({
  type: ActionType.SET_POKEMON_ID,
  payload: payload,
});

// const setMetaPokemonList = (payload) => ({
//   type: ActionType.SET_META_POKEMON_LIST,
//   payload: payload,
// });

const setCountPokemon = (payload) => ({
  type: ActionType.SET_COUNT_POKEMON,
  payload: payload,
});

const setMetaPokemonSearch = (payload) => ({
  type: ActionType.SET_META_POKEMON_SEARCH,
  payload: payload,
});

const setErrorPokemon = (payload) => ({
  type: ActionType.SET_ERROR_POKEMON,
  payload: payload,
});

const PokemonActions = {
  setDataPokemon,
  clearDataPokemon,
  clearErrorPokemon,
  setPokemonList,
  setPokemonID,
  // setMetaPokemonList,
  setCountPokemon,
  setMetaPokemonSearch,
  setErrorPokemon,
};

export default PokemonActions;
