import React from 'react';
import { useHistory } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@material-ui/core';

export default function Header({ name }) {
  const history = useHistory();

  return (
    <React.Fragment>
      <AppBar style={{ backgroundColor: '#ffcb05' }}>
        <Toolbar style={{ position: 'relative', padding: 0, margin: '0 24px' }}>
          <div style={{ margin: '10px 0' }}>
            <img
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1024px-International_Pok%C3%A9mon_logo.svg.png'
              alt=''
              style={{ height: 50, cursor: 'pointer' }}
              onClick={() => history.push('/')}
            />
          </div>
          <div style={{ position: 'absolute', right: 0 }}>
            {name === 'HOME' ? (
              <Button
                style={{
                  color: '#3c5aa6',
                  marginLeft: '10px',
                  borderBottom: '1px solid',
                }}
                onClick={() => history.push('/')}
              >
                <b>Home</b>
              </Button>
            ) : (
              <Button
                style={{
                  color: '#3c5aa6',
                  marginLeft: '10px',
                }}
                onClick={() => history.push('/')}
              >
                <b>Home</b>
              </Button>
            )}
            {name === 'MY POKEMON' ? (
              <Button
                style={{
                  color: '#3c5aa6',
                  marginLeft: '10px',
                  borderBottom: '1px solid',
                }}
                onClick={() => history.push('/my-pokemon-list')}
              >
                <b>My Pokemon</b>
              </Button>
            ) : (
              <Button
                style={{
                  color: '#3c5aa6',
                  marginLeft: '10px',
                }}
                onClick={() => history.push('/my-pokemon-list')}
              >
                <b>My Pokemon</b>
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}
