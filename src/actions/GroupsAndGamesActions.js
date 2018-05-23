import firebase from 'firebase';
import _ from 'lodash';
import {
    GROUPSANDGAMES_LOADING,
    GROUPSANDGAMES_SUCCESS,
    GROUPSANDGAMES_FAIL
} from './types';

export const groupsAndGamesFetch = () => {
    return (dispatch) => {
        dispatch({ type: GROUPSANDGAMES_LOADING });

        try {
           firebase.database().ref('/groups').once('value', snapshot => {
                const grupos = _.map(snapshot.val(), (grupo, uid) => {
                     return { ...grupo, uid };
                });

                const gruposJogos = { listaGruposEJogos: grupos };
                console.log(JSON.stringify(gruposJogos));
                dispatch({ type: GROUPSANDGAMES_SUCCESS, payload: gruposJogos });
           }).catch((err) => {
            dispatch({ type: GROUPSANDGAMES_FAIL, payload: JSON.stringify(err) });
      });
        } catch (err) {
            dispatch({ type: GROUPSANDGAMES_FAIL, payload: { erro: JSON.stringify(err) } });
        }
    };
};
