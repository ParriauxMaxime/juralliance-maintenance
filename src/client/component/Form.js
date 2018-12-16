import React from 'react';
import {
  withStyles, Paper, Grid, Button, Typography,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { forms } from '../forms';

function Form({
  model, classes, children, form,
  paperClassName,
  onSubmit,
}) {
  return (
    <Paper className={`${classes.root} ${paperClassName || ''}`}>
      <Typography variant="h5">{model.title}</Typography>
      <Grid container>
        {
        model.keys.map((key) => {
          const { component: Component, ...props } = model[key];
          const { sm, md } = model.ui[key];
          console.info(model, form);
          return (
            <Grid className={classes.item} item key={key} sm={sm} md={md}>
              <Component {...props} value={form[key]} />
            </Grid>
          );
        })
        }
      </Grid>
      <div className={classes.spacer} />
      <Grid container justify="flex-end">
        {
          model.actions.map((action, i) => {
            const {
              component: Action, label, variant, submit,
            } = action;
            const key = action.label || `action-spacer-${i}`;
            return (
              <Grid className={classes.item} key={key} item>
                { Action
                && (
                <Action
                  onClick={submit ? onSubmit : undefined}
                  variant={variant}
                  color="primary"
                >
                  {label}
                </Action>
                ) }
              </Grid>
            );
          })
        }
      </Grid>
    </Paper>
  );
}

const ms = (store, ownProps) => {
  const model = forms[ownProps.reducer] || {};
  return {
    ...ownProps,
    model,
  };
};

export default connect(ms)(withStyles(theme => ({
  root: {
    padding: theme.spacing.unit * 3,
  },
  spacer: {
    height: theme.spacing.unit * 3,
  },
  item: {
    margin: '4px 8px',
  },
}))(Form));
