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
          listRanking.push({ 
            id: users, 
            nome: user.dados.dadosUsuario.displayName || 'Anônimo', 
            pontuacao: user.dados.dadosUsuario.pontuacao || 0, 
            pontuacaoVeia: user.dados.dadosUsuario.pontuacaoVeia || 0
          });
        }

        listRanking.sort(compare);
        dispatch({ type: RANKING_FETCH_SUCCESS, payload: { users: listRanking } });
      })
      .catch((err) => {
        dispatch({ type: RANKING_FETCH_SUCCESS, payload: JSON.stringify(err) });
      });
    } catch (err) {
      dispatch({ type: RANKING_FETCH_SUCCESS, payload: { erro: JSON.stringify(err) } });
    }
  };
};

function compare(a, b) {
  if (a.pontuacao < b.pontuacao) {
    return 1;
  } if (a.pontuacao > b.pontuacao) {
    return -1;
  }
  if (a.pontuacaoVeia > b.pontuacaoVeia) {
    return -1;
  }
  return 1;
}
