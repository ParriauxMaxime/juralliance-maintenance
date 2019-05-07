import store from './store';
import {
  Action, SNACKBAR_DISPATCH, FETCH, INSERT, DELETE,
} from '../reducer/action';

const getActionType = (type) => {
  switch (type) {
    case 'find': return FETCH;
    case 'insert': return INSERT;
    case 'delete': return DELETE;
    default: return '';
  }
};

export const fetchAPI = async (api, body, type = 'find') => {
  const url = `http://localhost:8080/api/${api}`;

  const options = {
    method: 'post',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({
      ...body,
      type,
    }),
  };
  // eslint-disable-next-line
  return fetch(url, options)
    .then(async res => ({ body: await res.json(), res }))
    .then(({ body }) => {
      store.dispatch(new Action(getActionType(type), { [api]: body.data, reducer: api }));
      return body.data;
    });
};

export const fetchEndpoint = async (endpoint, body) => {
  const url = `http://localhost:8080/${endpoint}`;

  const options = {
    method: 'post',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({
      ...body,
    }),
  };
  // eslint-disable-next-line
  return fetch(url, options)
    .then(async res => ({ body: await res.json(), res }))
    .then(({ body, res }) => { if (body.error) throw { err: body.error, body, res }; return { body, res }; })
    .catch(({ err, res, body }) => {
      store.dispatch(new Action(SNACKBAR_DISPATCH, { variant: 'error', text: err }));
      return { res, body };
    });
};
