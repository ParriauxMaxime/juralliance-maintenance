// @flow
import React from 'react';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  OPEN_MODAL, Action, CLOSE_MODAL, SUBMIT_NEW_ETABLISSEMENT, DELETE,
} from '../../reducer/action';
import store from '../../utils/store';
import { unnormalize } from '../../utils';
import TableData from '../../component/TableData';
import { fetchAPI } from '../../utils/apiManager';


const reducer = 'etablissement';

function Etablissements({
  classes,
  rows,
  fields,
  mapping,
  form,
  openModal,
  closeModal,
  fetch,
  insertEtablissement,
  fetchEtablissement,
  deleteEtablissement,
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
  insertEtablissement: Function,
  deleteEtablissement: Function,
  fetchEtablissement: Function,
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
      fetchData={fetchEtablissement}
      insertData={insertEtablissement}
      deleteData={deleteEtablissement}

    />
  );
}

const ms = ({ etablissement: { form, byId, fetch } }, ownProps) => ({
  ...ownProps,
  fields: ['name', 'address'],
  rows: unnormalize(byId),
  mapping: {},
  fetch,
  form,
  byId,
});


const md = (dispatch, ownProps) => ({
  fetchEtablissement: async () => fetchAPI(reducer),
  insertEtablissement: async () => {
    const { etablissement } = store.getState();
    const data = {
      ...etablissement.form,
      modal: undefined,
    };
    return fetchAPI(reducer, data, 'insert')
      .then(() => {
        dispatch(new Action(SUBMIT_NEW_ETABLISSEMENT));
      })
      .catch((err) => {
        console.warn(err);
      });
  },
  deleteEtablissement: async idEtablissement => fetchAPI(reducer, { _id: idEtablissement }, 'delete')
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
}))(Etablissements)));
