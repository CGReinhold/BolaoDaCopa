import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import MatchesReducer from './MatchesReducer';
import MyBetsReducer from './MyBetsReducer';

export default combineReducers({
  auth: AuthReducer,
  matches: MatchesReducer,
  bets: MyBetsReducer
});
