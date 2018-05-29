import firebase from 'firebase';
import _ from 'lodash';
import { SELECOES_LOADING, 
       SELECOES_SUCCESS
        } from './types';

export const selecoesFetch = () => {
    return (dispatch) => {
        dispatch({ type: SELECOES_LOADING });

        firebase.database().ref('/teams').once('value', snapshot => {
            const times = _.map(snapshot.val(), (val, uid) => { return { ...val, uid }; });
            dispatch({ type: SELECOES_SUCCESS, payload: times });
        });
    };
};    
