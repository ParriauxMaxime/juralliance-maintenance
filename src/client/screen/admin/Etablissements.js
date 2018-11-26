// @flow
import React from 'react';
import { withStyles, Modal } from '@material-ui/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import CRUDTable from '../../component/CRUDTable';
import { etablissements } from '../../utils/mocks';
import Form from '../../component/Form';
import AddButton from '../../component/AddButton';
import {
  ETABLISSEMENT_OPEN_MODAL, Action, ETABLISSEMENT_CLOSE_MODAL, SUBMIT_NEW_ETABLISSEMENT, FETCH, ETABLISSEMENT_DELETE,
} from '../../reducer/action';
import fetchAPI from '../../utils/apiManager';
import store from '../../utils/store';
import { unnormalize } from '../../utils';


const reducer = 'etablissement';

function Etablissements({
  classes,
  children,
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
  history: { push },
  byId,
}: {
  classes: Object,
  children: ?any,
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
  if ((Date.now() - (fetch || 0) > (120 * 1000))) { fetchEtablissement(); }
  const redirectTo = id => push(`/${reducer}/${id}`);
  return (
    <div className={classes.root}>
      <AddButton onClick={openModal} />
      <CRUDTable
        rows={rows}
        fields={fields}
        mapping={mapping}
        onDelete={deleteEtablissement}
        onEdit={redirectTo}
        reducer={reducer}
        actions={['edit', 'delete']}
      />
      <Modal
        tabIndex={-1}
        onClose={closeModal}
        className={classes.modal}
        open={form.modal}
      >
        <Form reducer={reducer} form={form} onSubmit={insertEtablissement} />
      </Modal>
    </div>
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
  fetchEtablissement: async () => fetchAPI(reducer)
    .then((res) => {
      dispatch(new Action(FETCH, res.body.data));
    }),
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
      dispatch(new Action(ETABLISSEMENT_DELETE, { _id: idEtablissement }));
    }).catch((e) => {
      console.warn(e);
    }),
  updateEtablissement: () => {

  },
  openModal: () => dispatch(new Action(ETABLISSEMENT_OPEN_MODAL)),
  closeModal: () => dispatch(new Action(ETABLISSEMENT_CLOSE_MODAL)),
});


export default withRouter(connect(ms, md)(withStyles(theme => ({
  root: {

  },
  modal: {
    margin: 50,
    top: '20vh',
  },
}))(Etablissements)));
