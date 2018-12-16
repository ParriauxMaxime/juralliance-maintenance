import React from 'react';
import {
  withStyles, Paper, Typography, TextField, Button,
} from '@material-ui/core';
import { connect } from 'react-redux';
import withRouter from 'react-router/withRouter';
import Form from '../component/Form';
import { fetchEndpoint } from '../utils/apiManager';
import { Action, LOG_IN } from '../reducer/action';

const endpoint = 'login';


function Login({
  classes, children, form, login,
}) {
  return (
    <div className={classes.root}>
      <Typography variant="h2">
        Juralliance
      </Typography>
      <div className={classes.spacer} />
      <Form
        paperClassName={classes.paper}
        reducer={endpoint}
        onSubmit={() => login(form.username, form.password)}
        form={form}
      />
    </div>
  );
}

const mapStateToProps = (store, ownProps) => ({
  ...ownProps,
  form: store.login.form,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  dispatch,
  login: async (username, password) => fetchEndpoint(endpoint, {
    username,
    password,
  }).then((res) => {
    if (res?.body?.data?.admin) {
      dispatch(new Action(LOG_IN, { type: 'admin', token: res.body.data.admin }));
      ownProps.history.replace('/');
    }
  }),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(theme => ({
  root: {
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    padding: '3em 30%',
    height: '100%',
    margin: 'auto',
    textAlign: 'center',
  },
  spacer: {
    height: theme.spacing.unit * 3,
  },
  paper: {
    padding: '1em',
  },
}))(Login)));
