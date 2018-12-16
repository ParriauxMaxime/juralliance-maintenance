// @flow
import React from 'react';
import { Modal } from '@material-ui/core';
import CRUDTable from './CRUDTable';
import Form from './Form';
import AddButton from './AddButton';

export default function TableData({
  classes,
  rows,
  fields,
  mapping,
  form,
  openModal,
  reducer,
  closeModal,
  fetch,
  history: { push },
  fetchData,
  insertData,
  deleteData,
}: {
  reducer: string,
  classes: Object,
  fetch: number,
  rows: [Object],
  fields: [string],
  mapping: Object,
  form: Object,
  history: {push: Function},
  openModal: Function,
  closeModal: Function,
  fetch: number,
  fetchData: Function,
  insertData: Function,
  deleteData: Function,
}) {
  if ((Date.now() - (fetch || 0) > (120 * 1000))) { fetchData(); }
  const redirectTo = id => push(`/${reducer}/${id}`);
  return (
    <div className={classes.root}>
      <AddButton onClick={openModal} />
      <CRUDTable
        rows={rows}
        fields={fields}
        mapping={mapping}
        onDelete={deleteData}
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
        <Form reducer={reducer} form={form} onSubmit={insertData} />
      </Modal>
    </div>
  );
}
