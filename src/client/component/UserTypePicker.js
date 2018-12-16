// @flow
import React, { PureComponent } from 'react';
import {
  withStyles, FormControl, InputLabel, Select, Input, MenuItem,
} from '@material-ui/core';

export const userType: {
  admin: string,
  direction: string,
  agent: string,
} = {
  admin: 'admin',
  direction: 'direction',
  agent: 'agent',
};

function UserTypePicker({
  classes,
  value,
  onChange,
}: {
  classes: Object,
  value: string,
  onChange: Function
}) {
  return (
    <FormControl className={classes.formControl}>
      <InputLabel shrink htmlFor="type-label-placeholder">
            Type
      </InputLabel>
      <Select
        value={value === '' ? userType.agent : value}
        required
        onChange={onChange}
        input={<Input name="type" id="type-label-placeholder" />}
        displayEmpty
        name="type"
        className={classes.selectEmpty}
      >
        {
        Object.values(userType).map((type: string) => (
          <MenuItem key={type} value={type}>{type}</MenuItem>
        ))
      }
      </Select>
    </FormControl>
  );
}

export default withStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
}))(UserTypePicker);
