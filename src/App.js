import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import './App.css';
import HomePage from './components/pages/homepage/homepage.component'
import ShopPage from './components/pages/shop/shop.component';
import Header from './components/header/header.component';
import CheckoutPage from './components/pages/checkout/checkout.component';

//import { auth, createUserProfileDocument, addCollectionAndDocuments } from './firebase/firebase.utils';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { createStructuredSelector } from 'reselect';
import {connect} from 'react-redux';
import {setCurrentUser} from './redux/user/user.actions';
import SignInAndSignUpPage from './components/pages/sign-in-sign-up/sign-in-sign-up.component';
import {selectCurrentUser } from './redux/user/user.selectors';
//import {selectCollectionsForPreview} from './redux/shop/shop.selectors';


class App extends React.Component {
  
    unsubscribeFromAuth = null;

    componentDidMount() {

      //const {setCurrentUser, collectionArray} = this.props;
      const {setCurrentUser} = this.props;

      this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {        
        if(userAuth){
          const userRef = await createUserProfileDocument(userAuth);
          userRef.onSnapshot(snapshot => {
            setCurrentUser({
              currentUser: {
                id: snapshot.id,
                ...snapshot.data()
              }
            }/*, () => console.log(this.state)*/)
          })
        }else {
          setCurrentUser(userAuth);
          //addCollectionAndDocuments('collections', collectionArray.map(({title, items}) => ({title, items})))          
        }   
      })
    }

    componentWillUnmount() {
      this.unsubscribeFromAuth();
    }

  render() {
    return (
    <div>      
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage}></Route>
        <Route exact path='/shop' component={ShopPage}></Route>
        <Route exact path='/checkout' component={CheckoutPage}></Route>
        <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage />)}></Route>
      </Switch>
    </div>
  )};
}


const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser //,
 // collectionArray: selectCollectionsForPreview
});

const mapDispatchToProps = dispatch => ({
   setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
