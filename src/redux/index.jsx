import { combineReducers, createStore } from 'redux';
import PokemonReducer from './pokemon/reducer';

const rootReducer = combineReducers({
  Pokemon: PokemonReducer,
});

const store = createStore(rootReducer);

export default store;
