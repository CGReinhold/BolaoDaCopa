import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import reducers from './reducers';
import Router from './Router';

class App extends Component {

  componentDidMount() {
    console.ignoredYellowBox = ['Setting a timer'];
      
    firebase.initializeApp({
      apiKey: 'AIzaSyAoOXStY9OmYkuiob-z21_gd-gxPAKB53g',
      authDomain: 'bolaodacopa-6a79b.firebaseapp.com',
      databaseURL: 'https://bolaodacopa-6a79b.firebaseio.com',
      projectId: 'bolaodacopa-6a79b',
      storageBucket: 'bolaodacopa-6a79b.appspot.com',
      messagingSenderId: '908824913699'
    });

    // firebase.auth().onAuthStateChanged((user) => {
    // });
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
