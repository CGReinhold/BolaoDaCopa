import {
  SET_BET,
  BETS_FETCH_SUCCESS,
  BETS_LOADING,
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BETS_FETCH_SUCCESS:
      return { myBets: action.payload, loading: false };
    case BETS_LOADING:
      return { ...state, loading: true };
    case SET_BET:
      return { ...state };
    default:
      return state;
  }
};
