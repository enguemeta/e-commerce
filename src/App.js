import React from 'react';
import {Route, Switch} from 'react-router-dom';

import './App.css';
import HomePage from './components/pages/homepage/homepage.component'
import ShopPage from './components/pages/shop/shop.component';


function App() {
  return (
    <div>
      {/* <HomePage />*/}
      <Switch>
        <Route exact path='/' component={HomePage}></Route>
        <Route exact path='/shop' component={ShopPage}></Route>
      </Switch>
    </div>
  );
}

export default App;
