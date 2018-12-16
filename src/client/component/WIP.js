// @flow
import React from 'react';
import {
  withStyles, Paper, Typography, LinearProgress,
} from '@material-ui/core';

function WIP({ classes }: {classes: Object}) {
  return (
    <div className={classes.root}>
      <Paper className={`${classes.root} ${classes.paper}`}>
        <Typography className={classes.margin} variant="h2">
          { 'Under construction' }
        </Typography>
        <Typography className={classes.margin} variant="h5">
          { 'Come back later' }
        </Typography>
        <LinearProgress />
      </Paper>
    </div>
  );
}

export default withStyles(theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    margin: 'auto',
  },
  paper: {
    textAlign: 'center',
    padding: theme.spacing.unit,
  },
  margin: {
    margin: theme.spacing.unit * 2,
  },

}))(WIP);
