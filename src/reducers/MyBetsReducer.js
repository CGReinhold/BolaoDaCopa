import {
  SET_BET,
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  if (!state) state = {};
  switch (action.type) {
    case SET_BET:
      return { ...state };
    default:
      return state;
  }
};
