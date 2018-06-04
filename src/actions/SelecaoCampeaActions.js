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
            const apostaSelecaoCampea = _.map(snapshot.val(), (val, u) => { 
                console.log(val);
                return { ...val, u }; 
            });

            dispatch({ type: SELECAOCAMPEA_SUCCESS, payload: { selecao: apostaSelecaoCampea } });
        });
    };
};


export const setSelecaoCampea = ({ selecaoSelecionada }) => {
    const { uid } = firebase.auth().currentUser;

    if (selecaoSelecionada) {
        firebase.database().ref(`/users/${uid}/dados/selecao`).set({ selecaoSelecionada });
    }

    return { type: SETSELECAOCAMPEA };
};
