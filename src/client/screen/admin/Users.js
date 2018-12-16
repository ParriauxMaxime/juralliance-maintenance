// @flow
import React from 'react';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  OPEN_MODAL, Action, CLOSE_MODAL, DELETE, INSERT,
} from '../../reducer/action';
import store from '../../utils/store';
import { unnormalize } from '../../utils';
import TableData from '../../component/TableData';
import { fetchAPI } from '../../utils/apiManager';


const reducer = 'user';

function Users({
  classes,
  rows,
  fields,
  mapping,
  form,
  openModal,
  closeModal,
  fetch,
  insertUser,
  fetchUser,
  deleteUser,
  history,
}: {
  classes: Object,
  fetch: number,
  rows: [Object],
  fields: [string],
  mapping: Object,
  form: Object,
  openModal: Function,
  history: {push: Function},
  closeModal: Function,
  insertUser: Function,
  deleteUser: Function,
  fetchUser: Function,
}) {
  return (
    <TableData
      reducer={reducer}
      classes={classes}
      rows={rows}
      fields={fields}
      mapping={mapping}
      form={form}
      history={history}
      openModal={openModal}
      closeModal={closeModal}
      fetch={fetch}
      fetchData={fetchUser}
      insertData={insertUser}
      deleteData={deleteUser}

    />
  );
}

const ms = ({ user: { form, byId, fetch } }, ownProps) => ({
  ...ownProps,
  fields: ['firstname', 'lastname', 'username', 'type'],
  rows: unnormalize(byId),
  mapping: {},
  fetch,
  form,
  byId,
});


const md = (dispatch, ownProps) => ({
  fetchUser: async () => fetchAPI(reducer),
  insertUser: async () => {
    const { user } = store.getState();
    const data = {
      ...user.form,
      modal: undefined,
    };
    return fetchAPI(reducer, data, 'insert')
      .then(async () => {
        dispatch(new Action(INSERT));
        return fetchAPI(reducer);
      })
      .catch((err) => {
        console.warn(err);
      });
  },
  deleteUser: async idEtablissement => fetchAPI(reducer, { _id: idEtablissement }, 'delete')
    .then((res) => {
      dispatch(new Action(DELETE, { _id: idEtablissement }));
    }).catch((e) => {
      console.warn(e);
    }),
  updateEtablissement: () => {

  },
  openModal: () => dispatch(new Action(OPEN_MODAL)),
  closeModal: () => dispatch(new Action(CLOSE_MODAL)),
});


export default withRouter(connect(ms, md)(withStyles(theme => ({
  root: {

  },
  modal: {
    margin: 50,
    top: '20vh',
  },
}))(Users)));
