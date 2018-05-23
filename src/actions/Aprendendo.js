import firebase from 'firebase';
import _ from 'lodash';
import {
  APRENDENDO,
  MATCHES_LOADING,
  MATCHES_FETCH_ERROR
} from './types';

export const testeFetch = () => {
    return (dispatch) => {
        dispatch({ type: MATCHES_LOADING });
        try {
           firebase.database().ref('/groups').once('value', snapshot => {
                const grupos = _.map(snapshot.val(), (grupo, uid) => {
                     return { ...grupo, uid };
                });

                const gruposObj = { listaGrupos: grupos };
                debugger;
                //Console.log(JSON.stringify(gruposObj));
                dispatch({ type: APRENDENDO, payload: gruposObj });
           }).catch((err) => {
            dispatch({ type: MATCHES_FETCH_ERROR, payload: JSON.stringify(err) });
      });
        } catch (err) {
            dispatch({ type: MATCHES_FETCH_ERROR, payload: { erro: JSON.stringify(err) } });
        }
    };
};
