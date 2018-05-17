import {
  EMAIL_CHANGED,
  NAME_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  CHANGE_TO_REGISTER
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  name: '',
  password: '',
  error: '',
  loading: false,
  registering: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_TO_REGISTER:
    return { ...state, error: '', registering: true };
    case EMAIL_CHANGED:
      return { ...state, error: '', email: action.payload };
    case NAME_CHANGED:
      return { ...state, error: '', name: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, error: '', password: action.payload };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state, error: '', loading: false };
    case LOGIN_USER_FAIL:
      return { ...state, error: action.payload, email: '', password: '', loading: false };
    default:
      return state;
  }
};
