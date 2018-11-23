import React from 'react';
import { withStyles } from '@material-ui/core';

function Login({ classes, children }) {
  return (
    <div className={classes.root}>
      { children }
    </div>
  );
}

export default withStyles(theme => ({
  root: {

  },
}))(Login);
