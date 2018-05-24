import {
    GROUPSANDGAMES_FAIL,
    GROUPSANDGAMES_SUCCESS,
    GROUPSANDGAMES_LOADING
  } from '../actions/types';

  const INITIAL_STATE = {};

  export default (state = INITIAL_STATE, action) => {
    if (!state) {
        state = {};
    }
    
    switch (action.type) {
      case GROUPSANDGAMES_LOADING:
        return { ...state, loading: true };
      case GROUPSANDGAMES_SUCCESS:
        if (action && action.payload) return { ...action.payload, loading: false };
        return { ...state, loading: true };
        case GROUPSANDGAMES_FAIL:
        return state;
      default:
        return state;
    }
  };
