import React from 'react';
import { withRouter } from 'react-router';
import {
  withStyles, Drawer, List, ListItem, ListItemText, Divider,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { MenuDrawerItems } from '../utils/constant';

function MenuDrawer({
  classes, children, open, history,
}) {
  const redirectTo = text => () => history.push(`/${text.toLocaleLowerCase()}`);
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        root: open ? classes.drawerHidden : classes.drawerPaper,
        paper: open ? classes.drawerHidden : classes.drawerPaper,
      }}
    >
      <div className={classes.toolbar} />
      <List>
        {MenuDrawerItems.map((text, index) => (
          <ListItem button key={text} onClick={redirectTo(text)}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

const ms = ({ ui }, ownProps) => ({
  ...ownProps,
  open: ui.menuDrawerOpen,
});

const drawerWidth = 240;

export default withRouter(connect(ms)(withStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    transition: '0.2s ease-in',
  },
  drawerHidden: {
    transition: '0.2s ease-in',
    width: 0,
  },
}))(MenuDrawer)));
