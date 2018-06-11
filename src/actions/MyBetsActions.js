import firebase from 'firebase';
import _ from 'lodash';
import {
  BETS_FETCH_SUCCESS,
  BETS_LOADING,
  SET_BET
} from './types';


export const myBetsFetch = (uid) => {
  return (dispatch) => {
    dispatch({ type: BETS_LOADING });
    if (!uid) {
      uid = firebase.auth().currentUser.uid;
    }
    // const { uid } = firebase.auth().currentUser;

    firebase.database().ref(`/users/${uid}`)
    .once('value', snapshot => {
      const bets = _.map(snapshot.val(), (val, u) => { return { ...val, u }; });
      dispatch({ type: BETS_FETCH_SUCCESS, payload: bets });
    })
    .catch((err) => {
      dispatch({ type: BETS_FETCH_SUCCESS, payload: { erro: JSON.stringify(err) } });
    });
  };
};

export const setBet = ({ match, homeScore, awayScore }) => {
  const { uid } = firebase.auth().currentUser;

  if (match) {
    firebase.database().ref(`/users/${uid}/${match}`)
    .set({ homeScore, awayScore });
  }

  return { type: SET_BET };
};
