import { TextField, Button } from '@material-ui/core';
import store from '../utils/store';
import { ETABLISSEMENT_FORM_CHANGE, Action } from '../reducer/action';

const onTextFieldChange = ({ target: { name, value } }) => (
  store.dispatch(new Action(ETABLISSEMENT_FORM_CHANGE, { name, value }))
);

const resp = (sm, md) => ({ sm, md: md || sm });

export default {
  keys: ['name', 'address', 'agents'],
  title: 'Formulaire établissement',
  ui: {
    name: resp(12),
    address: resp(12),
    agents: resp(12),
  },
  name: {
    type: 'text',
    name: 'name',
    fullWidth: true,
    label: 'nom',
    onChange: onTextFieldChange,
    component: TextField,
  },
  address: {
    type: 'text',
    fullWidth: true,
    name: 'address',
    label: 'addresse',
    onChange: onTextFieldChange,
    component: TextField,
  },
  agents: {
    type: 'text',
    fullWidth: true,
    name: 'agents',
    label: 'agents',
    onChange: onTextFieldChange,
    component: TextField,
  },
  actions: [{
    component: Button,
    variant: 'contained',
    label: 'valider',
    submit: true,
  }],
};
