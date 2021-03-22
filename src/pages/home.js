import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CircularProgress, Container, Grid } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import Header from '../components/header';
import Table from '../components/table';
// import SinglePokemon from '../components/singlePokemon';
import { columns } from '../components/columns';

import PokemonActions from '../redux/pokemon/actions';
import { getPokemonList } from '../helper/api/pokemon';

const useStyles = makeStyles((theme) =>
  createStyles({
    emptyTitle: {
      [theme.breakpoints.down('sm')]: {
        marginBottom: 20,
      },
    },
  })
);

const {
  // setDataPokemon,
  // clearDataPokemon,
  // clearErrorPokemon,
  setPokemonList,
  // setPokemonID,
} = PokemonActions;

export default function Home() {
  const [apiUrl, setApiUrl] = useState('https://pokeapi.co/api/v2/pokemon');
  const [metaPokemonList, setMetaPokemonList] = useState({
    count: 0,
    offset: 0,
    limit: 20,
    page: 0,
  });
  const [isLoadingTable, setIsLoadingTable] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { pokemonList } = useSelector((state) => state.Pokemon);

  const getAllPokemon = async (url) => {
    const pokemons = await getPokemonList(url);
    if (pokemons.results) {
      dispatch(setPokemonList(pokemons.results));
      setMetaPokemonList({
        ...metaPokemonList,
        count: pokemons.count,
      });
      if (!pokemons.results.length) {
        setIsLoadingTable(false);
      }
    } else {
      setIsLoadingTable(false);
    }
  };

  useEffect(() => {
    setIsLoadingTable(true);
    getAllPokemon(apiUrl);
  }, [apiUrl]);
  const pokemonColumns = {
    name: 'Name',
    url: 'URL',
  };
  const options = {
    filter: false,
    download: false,
    print: false,
    viewColumns: false,
    search: false,
    serverSide: true,
    count: metaPokemonList.count,
    page: metaPokemonList.page,
    rowsPerPage: metaPokemonList.limit,
    rowsPerPageOptions: [],
    textLabels: {
      body: {
        noMatch: isLoadingTable ? (
          <CircularProgress size={30} />
        ) : (
          <div className={classes.emptyTitle}>empty row</div>
        ),
      },
    },
    onChangePage: async (currentPage) => {
      await dispatch(setPokemonList([]));
      const offset = currentPage * 20;
      const limit = 20;
      await setMetaPokemonList({
        ...metaPokemonList,
        offset: offset,
        limit: limit,
        page: currentPage,
      });
      // );
      await setApiUrl(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
      );
      console.log('ini page', offset, limit);
    },
    // onRowClick: (rowData, rowMeta) => {
    //   if (listPermission.inpatientDetail === 'displayed') {
    //     router.push(
    //       '/inpatient/detail/[id]',
    //       `/inpatient/detail/${rowData[10]}`
    //     );
    //   }
    // },
    selectableRows: 'none',
  };
  return (
    <div>
      <Header name='POKEMON' />
      <Container style={{ marginTop: '40px' }}>
        <Table
          title={'Pokemon Go'}
          data={pokemonList}
          columns={columns(pokemonColumns)}
          options={options}
        />

        {/* grid with image */}
        {/* <Grid container spacing={3}>
          {pokemons.map((pokemon, index) => (
            <SinglePokemon name={pokemon.name} image={pokemon.image} />
          ))}
        </Grid> */}
      </Container>
    </div>
  );
}
