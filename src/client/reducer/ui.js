import { MENU_DRAWER_CLICK, SNACKBAR_DISPATCH, SNACKBAR_CLOSE } from './action';

const initialState = {
  menuDrawerOpen: false,
  snackbar: {
    open: false,
    variant: undefined,
    text: '',
  },
};

const reducer = (state = initialState, { type, data }) => {
  switch (type) {
    case MENU_DRAWER_CLICK: {
      return { ...state, menuDrawerOpen: !state.menuDrawerOpen };
    }
    case SNACKBAR_DISPATCH: {
      return {
        ...state,
        snackbar: {
          open: true,
          text: data.text,
          variant: data.variant,
        },
      };
    }
    case SNACKBAR_CLOSE: {
      return {
        ...state,
        snackbar: {
          open: false,
          text: '',
          variant: undefined,
        },
      };
    }
    default: return state;
  }
};

export default reducer;
