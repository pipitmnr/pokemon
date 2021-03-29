import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  CircularProgress,
  Container,
  Grid,
  TablePagination,
} from '@material-ui/core';

import Header from '../components/header';
import SinglePokemon from '../components/singlePokemon';

import PokemonActions from '../redux/pokemon/actions';
import { getPokemonList } from '../helper/api/pokemon';

const { setPokemonList } = PokemonActions;

export default function Home(props) {
  const [metaPokemonList, setMetaPokemonList] = useState({
    count: 0,
    offset: 0,
    limit: 12,
    page: 0,
  });
  const [apiUrl, setApiUrl] = useState(
    `https://pokeapi.co/api/v2/pokemon?offset=${metaPokemonList.offset}&limit=${metaPokemonList.limit}`
  );
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { pokemonList } = useSelector((state) => state.Pokemon);

  const getAllPokemon = async (url) => {
    const pokemons = await getPokemonList(url);
    if (pokemons.results) {
      const pokemonNewList = pokemons.results.map((pokemon) => {
        const id = pokemon.url
          .split('https://pokeapi.co/api/v2/pokemon/')[1]
          .replace('/', '');
        return { ...pokemon, id: id };
      });
      dispatch(setPokemonList(pokemonNewList));
      setMetaPokemonList({
        ...metaPokemonList,
        count: pokemons.count,
      });
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getAllPokemon(apiUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metaPokemonList.page]);

  return (
    <div>
      <Header name='HOME' />

      <Container style={{ marginTop: '40px' }}>
        <h2 style={{ textAlign: 'left' }}>Pokemon List</h2>
        {isLoading ? (
          <CircularProgress size={30} />
        ) : (
          <React.Fragment>
            <Grid container spacing={5}>
              {pokemonList.map((pokemon, index) => (
                <SinglePokemon id={pokemon.id} name={pokemon.name} />
              ))}
            </Grid>
            <TablePagination
              style={{ float: 'right', margin: '20px 0' }}
              count={metaPokemonList.count}
              page={metaPokemonList.page}
              rowsPerPage={metaPokemonList.limit}
              rowsPerPageOptions={[]}
              onChangePage={async (event, currentPage) => {
                setIsLoading(true);
                const limit = metaPokemonList.limit;
                const offset = currentPage * limit;
                await setApiUrl(
                  `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
                );
                await setMetaPokemonList({
                  ...metaPokemonList,
                  offset: offset,
                  page: currentPage,
                });
              }}
            />
          </React.Fragment>
        )}
      </Container>
    </div>
  );
}
