import _ from 'underscore';
import {
  SORT_TABLE,
  USER_FORM_CHANGE,
  OPEN_MODAL,
  CLOSE_MODAL,
  SUBMIT_NEW_ETABLISSEMENT,
  DELETE,
  FETCH_ETABLISSEMENT,
  FETCH,
  INSERT,
} from './action';
import { Etablissement } from '../utils/mocks';

const initialState = {
  tableOptions: {
    orderBy: null,
    order: 'desc',
  },
  form: {
    firstname: '',
    lastname: '',
    username: '',
    type: '',
    modal: false,
  },
  byId: {

  },
  allIds: [],
};

const user = 'user';

const orderToBool = (order) => {
  if (order === undefined) return undefined;
  if (order === 'asc') return true;
  return false;
};

const normalizeById = data => data.reduce((acc, e, i) => ({ ...acc, [e._id]: { ...e, _id: e._id } }), {});
const mapIds = data => data.map(e => e._id);
const unique = data => data.filter((e, i) => data.indexOf(e) === i);

const reducer = (state = initialState, { type, data }) => {
  switch (type) {
    case SORT_TABLE: {
      if (data.reducer === user) {
        return {
          ...state,
          tableOptions: {
            ...state.tableOptions,
            orderBy: data.orderBy,
            order: data.orderBy === state.tableOptions.orderBy
              ? (orderToBool(state.tableOptions.order) ? 'desc' : 'asc')
              : state.tableOptions.order,
          },
        };
      }
      return state;
    }
    case INSERT: {
      return { ...state, form: initialState.form };
    }
    case OPEN_MODAL: {
      return {
        ...state,
        form: {
          ...state.form,
          modal: true,
        },
      };
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        form: {
          ...state.form,
          modal: false,
        },
      };
    }
    case DELETE: {
      return {
        ...state,
        allIds: state.allIds.filter(e => e !== data._id),
        byId: { ...state.byId, [data._id]: undefined },
      };
    }
    case FETCH: {
      if (data.reducer !== user) return state;
      return {
        ...state,
        fetch: Date.now(),
        byId: {
          ...state.byId,
          ...normalizeById(data[user]),
        },
        allId: unique([
          ...state.allIds,
          ...mapIds(data[user]),
        ]),
      };
    }
    case USER_FORM_CHANGE: {
      return {
        ...state,
        form: {
          ...state.form,
          [data.name]: data.value,
        },
      };
    }
    default: return state;
  }
};

export default reducer;
