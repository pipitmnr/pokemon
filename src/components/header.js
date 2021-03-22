import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

export default function Header({ name }) {
  return (
    <React.Fragment>
      <AppBar style={{ backgroundColor: '#ffcb05' }}>
        <Toolbar>
          <Typography variant='h6' style={{ color: '#2a75bb' }}>
            {name}
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}
