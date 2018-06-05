import firebase from 'firebase';
import _ from 'lodash';
import {
    SELECAOCAMPEA_LOADING,
    SELECAOCAMPEA_SUCCESS,
    SETSELECAOCAMPEA 
} from './types';

export const selecaoCampeaFetch = () => {
    return (dispatch) => {
        dispatch({ type: SELECAOCAMPEA_LOADING });

        const { uid } = firebase.auth().currentUser;

        firebase.database().ref(`/users/${uid}/dados/selecao`).once('value', snapshot => {
            console.log(snapshot.val());
            let apostaSelecaoCampea = snapshot.val();

            if (apostaSelecaoCampea) {
                apostaSelecaoCampea = snapshot.val().selecaoSelecionada;
            }
            
            dispatch({ type: SELECAOCAMPEA_SUCCESS, payload: { selecao: apostaSelecaoCampea } });
        });

        dispatch({ type: SELECAOCAMPEA_SUCCESS, payload: { selecao: 'BRA' } }); 
    };
};


export const setSelecaoCampea = (selecaoSelecionada) => {
    const { uid } = firebase.auth().currentUser;

    if (selecaoSelecionada) {
        firebase.database().ref(`/users/${uid}/dados/selecao`).set({ selecaoSelecionada });
    }

    return { type: SETSELECAOCAMPEA, payload: { selecao: selecaoSelecionada } };
};
