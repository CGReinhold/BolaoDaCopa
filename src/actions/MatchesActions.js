import firebase from 'firebase';
import _ from 'lodash';
import {
  MATCHES_FETCH_SUCCESS,
  MATCHES_LOADING
} from './types';
import { times } from '../Times';

export const matchesFetch = () => {
  return (dispatch) => {
    dispatch({ type: MATCHES_LOADING });
    try {
      firebase.database().ref('/matches')
      .once('value', snapshot2 => {
        const matches = _.map(snapshot2.val(), (val, uid) => { return { ...val, uid }; });
        const partidas = { partidas: [] };
        matches.forEach(match => {
          const partida = { ...match, away_team: times.filter(time => time.id === match.away_team), home_team: times.filter(time => time.id === match.home_team) };
          partidas.partidas.push(partida);
        });

        dispatch({ type: MATCHES_FETCH_SUCCESS, payload: partidas });
      })
      .catch((err) => {
        dispatch({ type: MATCHES_FETCH_SUCCESS, payload: JSON.stringify(err) });
      });
    } catch (err) {
      dispatch({ type: MATCHES_FETCH_SUCCESS, payload: { erro: JSON.stringify(err) } });
    }
  };
};
