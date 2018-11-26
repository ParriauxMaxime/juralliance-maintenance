import React from 'react';
import { withStyles, IconButton, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

function AddButton({ classes, children, onClick }) {
  return (
    <IconButton variant="fab" onClick={onClick}>
      <Tooltip title="Créer">
        <AddIcon color="primary" />
      </Tooltip>
    </IconButton>
  );
}

export default withStyles(theme => ({
  root: {

  },
}))(AddButton);
