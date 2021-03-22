import React from 'react';
import { Typography, Grid } from '@material-ui/core';

export default function SinglePokemon({ name, image }) {
  return (
    <React.Fragment>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <img src={image} alt='' />
        <Typography>{name}</Typography>
      </Grid>
    </React.Fragment>
  );
}
