import { LOGIN_FORM_CHANGE, LOG_IN, LOG_OUT } from './action';

const initialState = {
  form: {
    username: '',
    password: '',
  },
  token: undefined,
  type: undefined,
};

const reducer = (state = initialState, { type, data }) => {
  switch (type) {
    case LOGIN_FORM_CHANGE: {
      return {
        ...state,
        form: {
          ...state.form,
          [data.name]: data.value,
        },
      };
    }
    case LOG_IN: {
      localStorage.setItem('admin-access-token', data.token);
      return {
        ...state,
        token: data.token,
        type: data.type,
      };
    }
    case LOG_OUT: {
      localStorage.clear();
      return {
        ...state,
        token: undefined,
        type: undefined,
      };
    }
    default: return state;
  }
};

export default reducer;
