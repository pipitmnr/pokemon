import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  CircularProgress,
  Container,
  Grid,
  TablePagination,
  Snackbar,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

import Header from '../components/header';
import SinglePokemon from '../components/singlePokemon';

import PokemonActions from '../redux/pokemon/actions';

const { setMyPokemonList } = PokemonActions;
function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

export default function MyPokemonList(props) {
  const pokemonListFromLS = JSON.parse(localStorage.getItem('myPokemon'));
  const history = useHistory();
  const [metaMyPokemonList, setMetaMyPokemonList] = useState({
    count: 0,
    offset: 0,
    limit: 2,
    page: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const dispatch = useDispatch();
  const { myPokemonList } = useSelector((state) => state.Pokemon);

  const removePokemon = async (nickname) => {
    const pokemonListToLS = pokemonListFromLS.filter(function (obj) {
      return obj.nickname !== nickname;
    });
    localStorage.setItem('myPokemon', JSON.stringify(pokemonListToLS));
    setMetaMyPokemonList({
      ...metaMyPokemonList,
      count: pokemonListToLS.length,
    });
    if (pokemonListToLS.length % metaMyPokemonList.limit === 0) {
      history.go(0);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    if (pokemonListFromLS) {
      dispatch(setMyPokemonList(pokemonListFromLS));
      setMetaMyPokemonList({
        ...metaMyPokemonList,
        count: pokemonListFromLS.length,
      });
    } else {
      setIsLoading(false);
    }
    if (myPokemonList.length) {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metaMyPokemonList.count, metaMyPokemonList.offset]);

  return (
    <React.Fragment>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity='success'>
          <b>Pokemon has been caught</b>
        </Alert>
      </Snackbar>
      <Header name='MY POKEMON' />
      <Container style={{ marginTop: '40px' }}>
        <h2 style={{ textAlign: 'left' }}>My Pokemon List</h2>
        {isLoading ? (
          <CircularProgress size={30} />
        ) : (
          <React.Fragment>
            <Grid container spacing={5}>
              {myPokemonList.map((pokemon, index) =>
                index >= metaMyPokemonList.offset &&
                index < metaMyPokemonList.offset + metaMyPokemonList.limit ? (
                  <React.Fragment>
                    <SinglePokemon
                      id={pokemon.id}
                      name={pokemon.name}
                      nickname={pokemon.nickname}
                      removePokemon={(nickname) => removePokemon(nickname)}
                    />
                  </React.Fragment>
                ) : null
              )}
            </Grid>
            <TablePagination
              style={{ float: 'right', margin: '20px 0' }}
              count={metaMyPokemonList.count}
              page={metaMyPokemonList.page}
              rowsPerPage={metaMyPokemonList.limit}
              rowsPerPageOptions={[]}
              onChangePage={async (event, currentPage) => {
                await setIsLoading(true);
                const limit = metaMyPokemonList.limit;
                await setMetaMyPokemonList({
                  ...metaMyPokemonList,
                  offset: currentPage * limit,
                  page: currentPage,
                });
              }}
            />
          </React.Fragment>
        )}
      </Container>
    </React.Fragment>
  );
}
