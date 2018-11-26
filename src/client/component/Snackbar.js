import React from 'react';
import {
  withStyles, Snackbar, SnackbarContent, Icon,
} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import WarningIcon from '@material-ui/icons/Warning';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';
import { SNACKBAR_CLOSE, Action } from '../reducer/action';

const getContent = (content) => {
  const userNotFoundRegex = /User (.*) not found/;
  const wrongPasswordRegex = /Username \/ password tupple mismatch/;
  if (userNotFoundRegex.test(content)) return `Utilisateur ${content.replace(userNotFoundRegex, '$1')} non trouvé`;
  if (wrongPasswordRegex.test(content)) return 'Mauvais mot de passe';
  return content;
};

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

function SnackBar({
  classes, children, text, open, variant, handleClose,
}) {
  const MyIcon = variantIcon[variant] || null;
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <SnackbarContent
        className={`${variant ? classes[variant] : ''}`}
        message={(
          <span>
            {MyIcon && <Icon><MyIcon /></Icon>}
            { getContent(text) }
          </span>
        )}
        action={[
          <IconButton
            key="Fermer"
            aria-label="Fermer"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
}

const mapStateToProps = ({ ui }, ownProps) => ({
  ...ownProps,
  open: ui.snackbar.open,
  text: ui.snackbar.text,
  variant: ui.snackbar.variant,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  dispatch,
  handleClose: () => {
    dispatch(new Action(SNACKBAR_CLOSE));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(theme => ({
  root: {

  },
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
}))(SnackBar));
