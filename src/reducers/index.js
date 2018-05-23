import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import MatchesReducer from './MatchesReducer';
import MyBetsReducer from './MyBetsReducer';
import GroupsAndGamesReducer from './GroupsAndGamesReducer';

export default combineReducers({
  auth: AuthReducer,
  matches: MatchesReducer,
  bets: MyBetsReducer,
  groupsAndGames: GroupsAndGamesReducer
});
