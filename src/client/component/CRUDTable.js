// @flow

import React from 'react';
import {
  withStyles, Table, Paper,
} from '@material-ui/core';
import { connect } from 'react-redux';
import TableManager from './CRUDTable.logic';

function CRUDTable({
  classes,
  children,
  rows,
  fields,
  mapping,
  reducer,
  orderBy,
  actions,
  onEdit,
  onDelete,
  order,
}: {
  classes: Object,
  children: ?any,
  rows: [any],
  fields: [string],
  actions: [string],
  mapping: Object,
  reducer: string,
  orderBy: ?string,
  order: ?string
}) {
  const manager = new TableManager({
    rows,
    fields,
    reducer,
    onEdit,
    onDelete,
    options: {
      orderBy,
      order,
      actions,
    },
  });
  return (
    <React.Fragment>
      <Paper>
        <Table>
          {manager.renderHead()}
          {manager.renderBody()}
        </Table>
      </Paper>
    </React.Fragment>
  );
}

const ms = (store, ownProps) => ({
  ...ownProps,
  fields: ownProps.fields || [],
  rows: ownProps.rows || [],
  mapping: ownProps.mapping || {},
  reducer: ownProps.reducer || '',
  orderBy: store[ownProps.reducer]?.tableOptions?.orderBy,
  order: store[ownProps.reducer]?.tableOptions?.order,
});

export default connect(ms)(withStyles(theme => ({
  root: {

  },
}))(CRUDTable));
