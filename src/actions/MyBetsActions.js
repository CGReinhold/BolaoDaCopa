import firebase from 'firebase';
import {
  MATCHES_LOADING,
  SET_BET
} from './types';


export const myBetsFetch = () => {
  return (dispatch) => {
    dispatch({ type: MATCHES_LOADING });
  };
};

export const setBet = ({ match, homeScore, awayScore }) => {
  const { uid } = firebase.auth().currentUser;

  if (match) {
    firebase.database().ref(`/users/${uid}/${match}`)
    .set({ homeScore, awayScore });
  }

  return { type: SET_BET, payload: true };
};
