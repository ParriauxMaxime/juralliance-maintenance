import { TextField, Button } from '@material-ui/core';
import store from '../utils/store';
import { Action, USER_FORM_CHANGE } from '../reducer/action';
import UserTypePicker from '../component/UserTypePicker';

const onTextFieldChange = ({ target: { name, value } }) => (
  store.dispatch(new Action(USER_FORM_CHANGE, { name, value }))
);

const resp = (sm, md) => ({ sm, md: md || sm });


export default {
  keys: ['firstname', 'lastname', 'username', 'type'],
  title: 'Formulaire établissement',
  ui: {
    firstname: resp(12),
    lastname: resp(12),
    username: resp(12),
    type: resp(12),
  },
  firstname: {
    type: 'text',
    name: 'firstname',
    fullWidth: true,
    label: 'prénom',
    onChange: onTextFieldChange,
    component: TextField,
  },
  lastname: {
    type: 'text',
    fullWidth: true,
    name: 'lastname',
    label: 'nom',
    onChange: onTextFieldChange,
    component: TextField,
  },
  username: {
    type: 'text',
    fullWidth: true,
    name: 'username',
    label: 'identifiant',
    onChange: onTextFieldChange,
    component: TextField,
  },
  type: {
    type: 'text',
    fullWidth: true,
    name: 'type',
    label: 'type',
    onChange: onTextFieldChange,
    component: UserTypePicker,
  },
  actions: [{
    component: Button,
    variant: 'contained',
    label: 'valider',
    submit: true,
  }],
};
