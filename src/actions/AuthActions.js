import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import firebase from 'firebase';
import {
  NAME_CHANGED,
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  CHANGE_TO_REGISTER
} from './types';

export const nameChanged = text => ({ type: NAME_CHANGED, payload: text });
export const emailChanged = text => ({ type: EMAIL_CHANGED, payload: text });
export const passwordChanged = text => ({ type: PASSWORD_CHANGED, payload: text });
export const changeToRegister = () => ({ type: CHANGE_TO_REGISTER });

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
    if (!email) {
      loginUserFail(dispatch, 'É necessário preencher o email.');
    } else if (!password) {
      loginUserFail(dispatch, 'É necessário preencher a senha.');
    } else {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(firebaseUser => { loginUserSuccess(dispatch, firebaseUser); })
        .catch(() => { loginUserFail(dispatch, 'Email ou senha inválido.'); });
    }
  };
};

export const createUser = ({ name, email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
    if (!email) {
      loginUserFail(dispatch, 'É necessário preencher o email.');
    } else if (!name) {
      loginUserFail(dispatch, 'É necessário preencher o nome.');
    } else if (!password) {
      loginUserFail(dispatch, 'É necessário preencher a senha.');
    } else if (password.length < 6) {
      loginUserFail(dispatch, 'A senha deve possuir seis caracteres ou mais.');
    } else {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('cadastrou usuário');
          if (firebase.auth().currentUser) {
            const { uid } = firebase.auth().currentUser;
            if (uid) {
              //firebase.database().ref(`users/${uid}`).push({ displayName: name });
              firebase.database().ref(`users/${uid}/dados`).set({ displayName: name, pontuacao: 0, pontuacaoVeia: 0 });
            }
          }
          loginUserSuccess(dispatch);
        })
        .catch(err => loginUserFail(dispatch, `Erro ao cadastrar usuário: ${JSON.stringify(err)}`));
    }
  };
};

const loginUserFail = (dispatch, error) => {
  dispatch({ type: LOGIN_USER_FAIL, payload: error });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({ type: LOGIN_USER_SUCCESS });
  AsyncStorage.setItem('firebaseUser', JSON.stringify(user));
  Actions.main({ type: 'reset' });
};
