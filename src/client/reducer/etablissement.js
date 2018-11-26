import _ from 'underscore';
import {
  SORT_TABLE, ETABLISSEMENT_FORM_CHANGE, ETABLISSEMENT_OPEN_MODAL, ETABLISSEMENT_CLOSE_MODAL, SUBMIT_NEW_ETABLISSEMENT, FETCH, ETABLISSEMENT_DELETE,
} from './action';
import { Etablissement } from '../utils/mocks';

const initialState = {
  tableOptions: {
    orderBy: null,
    order: 'desc',
  },
  form: {
    name: '',
    address: '',
    agents: [],
    modal: false,
  },
  byId: {

  },
  allIds: [],
};

const etablissement = 'etablissement';

const orderToBool = (order) => {
  if (order === undefined) return undefined;
  if (order === 'asc') return true;
  return false;
};

const normalizeById = (data: [Etablissement]) => data.reduce((acc, e, i) => ({ ...acc, [e._id]: { ...e, _id: e._id } }), {});
const mapIds = (data: [Etablissement]) => data.map(e => e._id);
const unique = data => data.filter((e, i) => data.indexOf(e) === i);

const reducer = (state = initialState, { type, data }) => {
  switch (type) {
    case SORT_TABLE: {
      if (data.reducer === etablissement) {
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
    case SUBMIT_NEW_ETABLISSEMENT: {
      return { ...state, form: initialState.form };
    }
    case ETABLISSEMENT_OPEN_MODAL: {
      return {
        ...state,
        form: {
          ...state.form,
          modal: true,
        },
      };
    }
    case ETABLISSEMENT_CLOSE_MODAL: {
      return {
        ...state,
        form: {
          ...state.form,
          modal: false,
        },
      };
    }
    case ETABLISSEMENT_DELETE: {
      return {
        ...state,
        allIds: state.allIds.filter(e => e !== data._id),
        byId: { ...state.byId, [data._id]: undefined },
      };
      break;
    }
    case FETCH: {
      return {
        ...state,
        fetch: Date.now(),
        byId: {
          ...state.byId,
          ...normalizeById(data),
        },
        allId: unique([
          ...state.allIds,
          ...mapIds(data),
        ]),
      };
    }
    case ETABLISSEMENT_FORM_CHANGE: {
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
