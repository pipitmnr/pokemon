import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Typography,
  Grid,
  Card,
  CardActionArea,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  DialogTitle,
  Snackbar,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

export default function SinglePokemon({ id, name, nickname, removePokemon }) {
  const history = useHistory();
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {}, [openSnackbar]);
  return (
    <React.Fragment>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity='success'>
          <b>Pokemon has been removed</b>
        </Alert>
      </Snackbar>
      <Dialog
        open={openDialog}
        onClose={async () => await setOpenDialog(false)}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>
          Remove {nickname} ({name})
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure to remove this pokemon?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={async () => {
              await setOpenDialog(false);
            }}
            variant='contained'
          >
            <b>Cancel</b>
          </Button>
          <Button
            color='secondary'
            variant='contained'
            onClick={() => {
              removePokemon(nickname);
              setOpenDialog(false);
              setOpenSnackbar(true);
            }}
          >
            <b>Remove</b>
          </Button>
        </DialogActions>
      </Dialog>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card>
          {/* {nickname ? (
            <IconButton color='secondary' style={{ float: 'right' }}>
              <Delete
                onClick={() => {
                  setOpenDialog(true);
                }}
              />
            </IconButton>
          ) : null} */}

          <CardActionArea onClick={() => history.push(`/detail/${id}`)}>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
              alt=''
              style={{ height: 80, margin: '10px' }}
            />
            <Typography>
              <h3>{name}</h3>
              {nickname ? <Typography>Nickname : {nickname}</Typography> : null}
              {nickname ? (
                <Button
                  variant='contained'
                  color='secondary'
                  onMouseDown={(event) => event.stopPropagation()}
                  onClick={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    setOpenDialog(true);
                  }}
                  style={{ margin: '10px 0' }}
                >
                  <b>Remove</b>
                </Button>
              ) : null}
            </Typography>
          </CardActionArea>
        </Card>
      </Grid>
    </React.Fragment>
  );
}
