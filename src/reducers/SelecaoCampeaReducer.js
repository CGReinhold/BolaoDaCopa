import { SELECAOCAMPEA_LOADING, 
        SELECAOCAMPEA_SUCCESS,
        SETSELECAOCAMPEA
    } from '../actions/types';

const INITIAL_STATE = {};    

export default (state = INITIAL_STATE, action) => {
    if (!state) state = {};
    
    switch (action.type) {
      case SELECAOCAMPEA_LOADING:
        return { ...state, loading: true };
      case SELECAOCAMPEA_SUCCESS:
        if (action && action.payload) return { ...action.payload, loading: false };
        return { ...state, loading: true };
      case SETSELECAOCAMPEA:
        return { ...state };
      default:
        return state;
    }
  };
