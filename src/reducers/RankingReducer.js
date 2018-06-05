import {
  RANKING_FETCH_SUCCESS,
  RANKING_LOADING
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RANKING_LOADING:
      return { ...state, loading: true };
    case RANKING_FETCH_SUCCESS:
      if (action && action.payload) return { ...action.payload, loading: false };
      return { ...state, loading: true };
    default:
      return state;
  }
};
