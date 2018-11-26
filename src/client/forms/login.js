import { TextField, Button } from '@material-ui/core';
import store from '../utils/store';
import { Action, LOGIN_FORM_CHANGE } from '../reducer/action';

const onTextFieldChange = ({ target: { name, value } }) => (
  store.dispatch(new Action(LOGIN_FORM_CHANGE, { name, value }))
);

export default {
  keys: ['username', 'password'],
  title: 'Connexion',
  ui: {
    username: { sm: 12 },
    password: { sm: 12 },
  },
  username: {
    type: 'text',
    name: 'username',
    label: 'identifiant',
    fullWidth: true,
    onChange: onTextFieldChange,
    component: TextField,
  },
  password: {
    type: 'password',
    name: 'password',
    label: 'mot de passe',
    fullWidth: true,
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
