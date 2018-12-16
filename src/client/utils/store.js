import { createStore, combineReducers } from 'redux';
import ui from '../reducer/ui';
import etablissement from '../reducer/etablissement';
import user from '../reducer/user';
import login from '../reducer/login';

const store = createStore(combineReducers({
  ui,
  user,
  etablissement,
  login,
}));

store.subscribe((args) => {
  console.info(store.getState());
});

export default store;
