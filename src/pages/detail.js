import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import {
  Container,
  Card,
  Grid,
  Typography,
  CircularProgress,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';

import Header from '../components/header';
import { getPokemon } from '../helper/api/pokemon';

export default function Detail(props) {
  const pokemonFromLS = JSON.parse(localStorage.getItem('myPokemon'));
  const history = useHistory();

  const [pokemon, setPokemon] = useState({});
  const [errorNickname, setErrorNickname] = useState({
    helperText: 'nickname can not be empty',
    isError: true,
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [myPokemon, setMyPokemon] = useState({
    nickname: '',
    id: '',
    name: '',
  });
  const [pokemonList, setPokemonList] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getPokemonApi = async (url) => {
    const pokemonApi = await getPokemon(url);
    if (pokemonApi) {
      setPokemon(pokemonApi);
    }
  };
  const handleChange = async (value) => {
    await setMyPokemon({ ...myPokemon, nickname: value });
    const duplicateNickname = () => {
      if (!value.length) {
        return [true, 'nickname can not be empty'];
      }
      if (pokemonFromLS) {
        for (let index = 0; index < pokemonFromLS.length; index++) {
          const element = pokemonFromLS[index];
          if (element.nickname === value) {
            return [true, 'duplicate nickname'];
          }
        }
      }
      return [false, ''];
    };
    await setErrorNickname({
      helperText: duplicateNickname()[1],
      isError: duplicateNickname()[0],
    });
  };
  const savePokemon = async () => {
    if (pokemonFromLS) {
      await setPokemonList([...pokemonFromLS, myPokemon]);
    } else {
      await setPokemonList([...[], myPokemon]);
    }
    await setOpenDialog(false);
    history.push('/my-pokemon-list');
  };

  useEffect(() => {
    const id = props.match.params.id;
    if (Object.keys(pokemon).length === 0) {
      getPokemonApi(`https://pokeapi.co/api/v2/pokemon/${id}`);
    }
  }, [getPokemonApi, pokemon, props.match.params.id]);
  useEffect(() => {
    if (pokemonList.length) {
      localStorage.setItem('myPokemon', JSON.stringify(pokemonList));
    }
  }, [pokemonList]);
  return (
    <React.Fragment>
      <Header name='POKEMON DETAIL' />
      <Container style={{ marginTop: '40px' }}>
        {Object.keys(pokemon).length > 0 ? (
          <div style={{ textAlign: 'center' }}>
            <Grid container>
              <Grid
                item
                xs={12}
                sm={12}
                md={8}
                lg={8}
                style={{ margin: '0 auto' }}
              >
                <Card raised={true} style={{ padding: '30px 15px' }}>
                  <img
                    src={
                      pokemon.sprites.other['official-artwork']['front_default']
                    }
                    alt='loading...'
                    style={{
                      height: 250,
                      margin: '10px',
                      borderBottom: 'solid 1px rgba(0,0,0,0.25)',
                    }}
                  />
                  <div className='main-info' style={{ margin: '10px auto' }}>
                    <h2 style={{ margin: '0 auto' }}>{pokemon.name}</h2>
                  </div>
                  <div className='catch-button' style={{ margin: '10px 0' }}>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={async () => {
                        await setOpenDialog(true);
                        await setMyPokemon({
                          ...myPokemon,
                          id: pokemon.id,
                          name: pokemon.name,
                        });
                      }}
                    >
                      <b>catch !!</b>
                    </Button>
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div className='info' style={{ marginBottom: '10px' }}>
                      <Typography>
                        <b>weight : </b>
                        {pokemon.weight}
                      </Typography>
                    </div>
                    <div className='info' style={{ marginBottom: '10px' }}>
                      <Typography>
                        <b>height : </b>
                        {pokemon.height}
                      </Typography>
                    </div>
                    <div className='info' style={{ marginBottom: '10px' }}>
                      <Typography>
                        <b>stat : </b>
                      </Typography>
                      {pokemon.stats.map((stat) => (
                        <li>
                          {stat.stat.name} : {stat.base_stat}
                        </li>
                      ))}
                    </div>
                    <div className='info' style={{ marginBottom: '10px' }}>
                      <Typography>
                        <b>types : </b>
                      </Typography>
                      <Grid container>
                        {pokemon.types.map((type) => (
                          <Grid
                            item
                            xs={6}
                            sm={4}
                            md={3}
                            lg={3}
                            style={{ margin: 0 }}
                          >
                            <li> {type.type.name}</li>
                          </Grid>
                        ))}
                      </Grid>
                    </div>
                    <div className='info' style={{ marginBottom: '10px' }}>
                      <Typography>
                        <b>moves : </b>
                      </Typography>
                      <Grid container>
                        {pokemon.moves.map((move) => (
                          <Grid
                            item
                            xs={6}
                            sm={4}
                            md={3}
                            lg={3}
                            style={{ margin: 0 }}
                          >
                            <li> {move.move.name}</li>
                          </Grid>
                        ))}
                      </Grid>
                    </div>
                  </div>
                </Card>
              </Grid>
            </Grid>
          </div>
        ) : (
          <CircularProgress size={30} />
        )}
      </Container>
      <Dialog
        open={openDialog}
        onClose={async () => await setOpenDialog(false)}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Catch {pokemon.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter new nickname for this pokemon
          </DialogContentText>
          <TextField
            error={errorNickname.isError}
            autoFocus
            margin='dense'
            id='nickname'
            label='Nickname'
            fullWidth
            onChange={(e) => {
              handleChange(e.target.value);
            }}
            helperText={errorNickname.helperText}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={async () => await setOpenDialog(false)}
            variant='contained'
          >
            <b>Cancel</b>
          </Button>
          <Button
            disabled={errorNickname.isError}
            color='primary'
            variant='contained'
            onClick={() => savePokemon()}
          >
            <b>Save</b>
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
