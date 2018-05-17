import {
  USER_UPDATE,
  USER_SAVE,
  USER_FETCH_SUCCESS,
  USER_LOADING
} from '../actions/types';

const INITIAL_STATE = {
  displayName: '',
  telefone: '',
  pais: '',
  estado: '',
  cidade: '',
  rua: '',
  cep: '',
  uid: '',
  loading: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case USER_LOADING:
      return { ...state, loading: true };
    case USER_SAVE:
      return state;
    case USER_FETCH_SUCCESS:
      return { ...action.payload, loading: false };
    default:
      return state;
  }
};
