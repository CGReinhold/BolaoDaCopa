import { SELECOES_LOADING, 
        SELECOES_SUCCESS
    } from '../actions/types';

const INITIAL_STATE = {};    

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case SELECOES_LOADING:
        return { ...state, loading: true };
      case SELECOES_SUCCESS:
        if (action && action.payload) return { ...action.payload, loading: false };
        return { ...state, loading: true };
      default:
        return state;
    }
  };
