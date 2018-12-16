import React from 'react';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';

function User({ classes, children }) {
  return (
    <div className={classes.root}>
      { children }
    </div>
  );
}

const mapStateToProps = (store, ownProps) => ({
  ...ownProps,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(theme => ({
  root: {

  },
}))(User));
