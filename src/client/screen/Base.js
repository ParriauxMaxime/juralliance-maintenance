import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core';
import Appbar from '../component/Appbar';
import MenuDrawer from '../component/MenuDrawer';
import AdminRouter from '../utils/routes';

function Base({ classes, children }) {
  const connected = true;
  if (connected) {
    return (
      <div className={classes.root}>
        <Appbar />
        <div className={classes.content}>
          <AdminRouter>
            <MenuDrawer />

          </AdminRouter>
        </div>
      </div>
    );
  }
  return (
    <React.Fragment>
      Login
    </React.Fragment>
  );
}

export default withStyles(theme => ({
  content: {
    display: 'flex',
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
}))(Base);
