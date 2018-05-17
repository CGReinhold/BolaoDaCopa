import {
  MATCHES_FETCH_SUCCESS,
  MATCHES_LOADING
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  if (!state) state = {};
  switch (action.type) {
    case MATCHES_LOADING:
      return { ...state, loading: true };
    case MATCHES_FETCH_SUCCESS:
      if (action && action.payload) return { ...action.payload, loading: false };
      return { ...state, loading: true };
    default:
      return state;
  }
};
