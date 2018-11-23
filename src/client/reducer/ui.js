import { MENU_DRAWER_CLICK } from './action';

const initialState = {
  menuDrawerOpen: false,
};

const reducer = (state = initialState, { type, data }) => {
  switch (type) {
    case MENU_DRAWER_CLICK: {
      return { ...state, menuDrawerOpen: !state.menuDrawerOpen };
    }
    default: return state;
  }
};

export default reducer;
