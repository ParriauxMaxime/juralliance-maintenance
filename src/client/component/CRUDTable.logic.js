// @flow
import React from 'react';
import {
  TableHead, TableRow, TableCell, TableSortLabel, TableBody, IconButton,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import _ from 'underscore';
import { Etablissement } from '../utils/mocks';
import store from '../utils/store';
import { Action, SORT_TABLE } from '../reducer/action';

type Data = Etablissement | any;


class TableManager {
  rows: [Data];

  fields: [string];

  onEdit: Function;

  onDelete: Function;

  reducer: string;

  options: {
    order: 'asc' | 'desc',
    orderBy: string,
    actions: [string]
  } = {
    order: 'desc',
    orderBy: '',
    actions: [],
  };


  constructor(props: Object) {
    _.extend(this, props);
  }

  orderBy(text: string) { if (text) this.options.orderBy = text; return this.options.orderBy; }

  dispatchSort = (field: string, reducer: string) => {
    store.dispatch(new Action(SORT_TABLE, {
      orderBy: field,
      reducer,
    }));
  }

  desc(a: Object, b: Object) {
    const { orderBy } = this.options;
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  getSorting = () => {
    const { orderBy, order } = this.options;
    return order === 'desc' ? (a, b) => this.desc(a, b, orderBy) : (a, b) => -this.desc(a, b, orderBy);
  }

  renderHead() {
    const { orderBy, order, actions } = this.options;
    return (
      <TableHead>
        <TableRow>
          {
            this.fields.map(field => (
              <TableCell key={`header-${field}`}>
                <TableSortLabel
                  active={orderBy === field}
                  direction={order || 'desc'}
                  onClick={() => this.dispatchSort(field, this.reducer)}
                >
                  {field}
                </TableSortLabel>
              </TableCell>
            ))
          }
          {
            actions.indexOf('edit') !== -1 && (
              <TableCell>
                {'Modifier'}
              </TableCell>
            )
          }
          {
            actions.indexOf('delete') !== -1 && (
              <TableCell>
                {'Supprimer'}
              </TableCell>
            )
          }
        </TableRow>
      </TableHead>
    );
  }


  renderBody() {
    const {
      rows, fields, options: { actions }, onEdit, onDelete,
    } = this;
    return (
      <TableBody>
        {
          [...rows]
            .sort(this.getSorting())
            .map((row, index) => (
              <TableRow key={`row-${fields[0] || 'test'}-${index}`}>
                {
                fields.map(field => (
                  <TableCell key={`${field}`}>
                    {row[field] || 'default'}
                  </TableCell>
                ))
                }
                {
                actions.indexOf('edit') !== -1 && (
                  <TableCell key={`${row._id}-edit`}>
                    <IconButton onClick={() => onEdit(row._id)}><EditIcon /></IconButton>
                  </TableCell>
                )
                }
                {
                actions.indexOf('delete') !== -1 && (
                  <TableCell key={`${row._id}-delete`}>
                    <IconButton onClick={() => onDelete(row._id)}><DeleteIcon /></IconButton>
                  </TableCell>
                )
                }
              </TableRow>
            ))
        }
      </TableBody>
    );
  }
}

export default TableManager;
