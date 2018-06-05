import firebase from 'firebase';
import _ from 'lodash';
import {
  RANKING_FETCH_SUCCESS,
  RANKING_LOADING
} from './types';


export const usersFetch = () => {
  return (dispatch) => {
    console.log('caiu aqui');
    dispatch({ type: RANKING_LOADING });
    try {
      firebase.database().ref('/users')
      .once('value', snapshot => {
        const listRanking = [];
        for (const users in snapshot.val()) {
          const user = snapshot.val()[users];
          listRanking.push({ id: users, nome: user.dados.displayName || 'Anônimo', pontuacao: user.dados.pontuacao || 0 });
        }
        dispatch({ type: RANKING_FETCH_SUCCESS, payload: { users: listRanking } });
      })
      .catch((err) => {
        console.log('erro');
        dispatch({ type: RANKING_FETCH_SUCCESS, payload: JSON.stringify(err) });
      });
    } catch (err) {
      console.log('erro');
      dispatch({ type: RANKING_FETCH_SUCCESS, payload: { erro: JSON.stringify(err) } });
    }
  };
};
