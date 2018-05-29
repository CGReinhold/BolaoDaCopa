import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import MatchesReducer from './MatchesReducer';
import MyBetsReducer from './MyBetsReducer';
import GroupsAndGamesReducer from './GroupsAndGamesReducer';
import SelecoesReducer from './SelecoesReducer';

export default combineReducers({
  auth: AuthReducer,
  matches: MatchesReducer,
  bets: MyBetsReducer,
  groupsAndGames: GroupsAndGamesReducer,
  selecoes: SelecoesReducer
});
