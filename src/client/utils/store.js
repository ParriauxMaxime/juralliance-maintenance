import { createStore, combineReducers } from 'redux';
import ui from '../reducer/ui';
import etablissement from '../reducer/etablissement';
import login from '../reducer/login';

const store = createStore(combineReducers({
  ui,
  etablissement,
  login,
}));

export default store;
