import React from 'react';
import {Route, Switch} from 'react-router-dom';

import './App.css';
import HomePage from './components/pages/homepage/homepage.component'
import ShopPage from './components/pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInSignUp from './components/pages/sign-in-sign-up/sign-in-sign-up.component';
import { auth } from './firebase/firebase.utils';


class App extends React.Component {
    constructor() {
        super();
        this.state = {
          currentUser: null
        }
    }

    unsubscribeFromAuth = null;

    componentDidMount() {
      this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
        this.setState({currentUser: user});        
      })
    }

    componentWillUnmount() {
      this.unsubscribeFromAuth();
    }

  render() {
    return (
    <div>      
      <Header currrentUser={this.state.currentUser} />
      <Switch>
        <Route exact path='/' component={HomePage}></Route>
        <Route exact path='/shop' component={ShopPage}></Route>
        <Route exact path='/signin' component={SignInSignUp}></Route>
      </Switch>
    </div>
  )};
}

export default App;
