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

        firebase.database().ref('/teams')
        .once('value', snapshot => {
        const times = _.map(snapshot.val(), (val, uid) => { return { ...val, uid }; });

        try {
           firebase.database().ref('/groups').once('value', base => {
                const grupos = _.map(base.val(), (grupo, uid) => {
                     return { ...grupo, uid };
                });

                console.log(JSON.stringify(times));
                console.log(JSON.stringify(grupos));

                const gruposJogos = { listaGruposEJogos: grupos };               
                
                dispatch({ type: GROUPSANDGAMES_SUCCESS, payload: gruposJogos });
           }).catch((err) => {
            dispatch({ type: GROUPSANDGAMES_FAIL, payload: JSON.stringify(err) });
      });
        } catch (err) {
            dispatch({ type: GROUPSANDGAMES_FAIL, payload: { erro: JSON.stringify(err) } });
        }
        });
    };
};
