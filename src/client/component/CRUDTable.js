import React from 'react';
import {
  withStyles, Table, TableHead, TableBody, TableRow, TableCell,
} from '@material-ui/core';
import { connect } from 'react-redux';

function CRUDTable({
  classes, children, rows, fields, mapping,
}) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          {
        fields.map(field => (
          <TableCell key={`header-${field}`}>
            {
              rows.map((row, index) => (
                <TableRow key={`row-${field[0] || 'test'}-${index}`}>
                  {
                  fields.map(field => (
                    <TableCell key={`${field}`}>
                      {row[field] || 'default'}
                    </TableCell>
                  ))
                  }
                </TableRow>
              ))
            }
          </TableCell>
        ))
      }
        </TableRow>
      </TableHead>
      <TableBody />
    </Table>
  );
}

const ms = (store, ownProps) => ({
  fields: [],
  rows: [],
  mapping: {},

});

export default connect(ms)(withStyles(theme => ({
  root: {

  },
}))(CRUDTable));
