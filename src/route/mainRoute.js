import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../pages/home';
import Detail from '../pages/detail';
import MyPokemonList from '../pages/myPokemonList';

const MainRoute = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/detail/:id' component={Detail} />
        <Route exact path='/my-pokemon-list' component={MyPokemonList} />
      </Switch>
    </BrowserRouter>
  );
};

export default MainRoute;
