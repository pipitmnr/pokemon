//Action Types
export const ActionType = {
  SET_POKEMON_LIST: 'SET_POKEMON_LIST',
  SET_MY_POKEMON_LIST: 'SET_MY_POKEMON_LIST',
};

const setPokemonList = (payload) => ({
  type: ActionType.SET_POKEMON_LIST,
  payload: payload,
});

const setMyPokemonList = (payload) => ({
  type: ActionType.SET_MY_POKEMON_LIST,
  payload: payload,
});

const PokemonActions = {
  setPokemonList,
  setMyPokemonList,
};

export default PokemonActions;
