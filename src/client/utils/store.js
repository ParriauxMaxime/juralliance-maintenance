import { createStore, combineReducers } from 'redux';
import ui from '../reducer/ui';

const store = createStore(combineReducers({
  ui,
}));

export default store;
