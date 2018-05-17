import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import UserReducer from './UserReducer';
import MatchesReducer from './MatchesReducer';

export default combineReducers({
  auth: AuthReducer,
  user: UserReducer,
  matches: MatchesReducer
});
