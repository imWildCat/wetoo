import {combineReducers} from 'redux';
import navigationState from './navigations';

const appReducers = combineReducers({
  navigationState,
});

export default appReducers;
