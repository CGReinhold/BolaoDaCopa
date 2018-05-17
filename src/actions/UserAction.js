import firebase from 'firebase';
import { AsyncStorage } from 'react-native';
import _ from 'lodash';
import {
  USER_UPDATE,
  USER_SAVE,
  USER_FETCH_SUCCESS,
  USER_LOADING
} from './types';

export const userUpdate = ({ prop, value }) => {
  return {
    type: USER_UPDATE,
    payload: { prop, value }
  };
};

export const userSave = ({ displayName, telefone, pais, estado, cidade, rua, cep, uid }) => {
  const { currentUser } = firebase.auth();
  displayName = displayName || '';
  telefone = telefone || '';
  pais = pais || '';
  estado = estado || '';
  cidade = cidade || '';
  rua = rua || '';
  cep = cep || '';
  const user = { displayName, telefone, pais, estado, cidade, rua, cep, uid };
  return (dispatch) => {
    AsyncStorage.setItem('dadosUsuario', JSON.stringify(user));
    if (uid) {
      firebase.database().ref(`/users/${currentUser.uid}/${uid}`)
      .set({ displayName, telefone, pais, estado, cidade, rua, cep })
      .then(() => {
        dispatch({ type: USER_SAVE });
      });
    } else {
      firebase.database().ref(`/users/${currentUser.uid}`)
      .push({ displayName, telefone, pais, estado, cidade, rua, cep })
      .then(() => {
        dispatch({ type: USER_SAVE });
      });
    }
  };
};

export const userFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    dispatch({ type: USER_LOADING });
    try {
      firebase.database().ref(`/users/${currentUser.uid}`)
        .on('value', snapshot => {
          const value = _.map(snapshot.val(), (val, uid) => {
            return { ...val, uid };
          });

          dispatch({ type: USER_FETCH_SUCCESS, payload: value[0] });
        })
        .catch(() => {
          AsyncStorage.getItem('dadosUsuario', (err, data) => {
            dispatch({ type: USER_FETCH_SUCCESS, payload: JSON.parse(data) });
          });
        });
    } catch (err) {
      AsyncStorage.getItem('dadosUsuario', (e, data) => {
        dispatch({ type: USER_FETCH_SUCCESS, payload: JSON.parse(data) });
      });
    }
  };
};
