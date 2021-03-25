import React, { useState, useEffect } from 'react';

import { Container, Card, Grid, Typography } from '@material-ui/core';
// import { makeStyles, createStyles } from '@material-ui/core/styles';
import Header from '../components/header';
import { getPokemon } from '../helper/api/pokemon';

export default function Detail(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [pokemon, setPokemon] = useState({});

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getPokemonApi = async (url) => {
    const pokemonApi = await getPokemon(url);
    if (pokemonApi) {
      setPokemon(pokemonApi);
      if (!pokemonApi) {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const id = props.match.params.id;
    console.log('pokemonstate', pokemon);
    if (Object.keys(pokemon).length === 0) {
      console.log('haloo');
      getPokemonApi(`https://pokeapi.co/api/v2/pokemon/${id}`);
    }
  }, [getPokemonApi, pokemon, props.match.params.id]);
  return (
    <div>
      <Header name='POKEMON DETAIL' />
      <Container style={{ marginTop: '40px' }}>
        {Object.keys(pokemon).length > 0 ? (
          <div style={{ textAlign: 'center' }}>
            <Grid container>
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                style={{ margin: '0 auto' }}
              >
                <Card raised={true} style={{ padding: '30px 15px' }}>
                  <img
                    src={
                      pokemon.sprites.versions['generation-v']['black-white'][
                        'animated'
                      ]['front_default']
                    }
                    alt='loading...'
                    style={{ width: 100, height: 100, margin: '10px' }}
                  />
                  <div className='main-info' style={{ margin: '10px auto' }}>
                    <h2 style={{ margin: '0 auto' }}>{pokemon.name}</h2>
                    <Typography>weight : {pokemon.weight}</Typography>
                  </div>

                  <div style={{ textAlign: 'left' }}>
                    <div className='abilities' style={{ marginBottom: '10px' }}>
                      <Typography>
                        <b>abilities : </b>
                      </Typography>
                      {pokemon.abilities.map((ability) =>
                        !ability.is_hidden ? (
                          <li> {ability.ability.name}</li>
                        ) : null
                      )}
                    </div>
                    <div className='abilities' style={{ marginBottom: '10px' }}>
                      <Typography>
                        <b>special abilities : </b>
                      </Typography>
                      {pokemon.abilities.map((ability) =>
                        ability.is_hidden ? (
                          <li> {ability.ability.name}</li>
                        ) : null
                      )}
                    </div>
                  </div>
                </Card>
              </Grid>
            </Grid>
          </div>
        ) : (
          <div>haloo</div>
        )}
      </Container>
    </div>
  );
}
