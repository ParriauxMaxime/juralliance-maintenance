import React from 'react';
import { withStyles } from '@material-ui/core';
import CRUDTable from '../../component/CRUDTable';

function Etablissements({ classes, children }) {
  return (
    <div className={classes.root}>
      <CRUDTable />
    </div>
  );
}

export default withStyles(theme => ({
  root: {

  },
}))(Etablissements);
