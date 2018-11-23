import React from 'react';
import {
  withStyles, Drawer, List, ListItem, ListItemText, Divider,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { MenuDrawerItems } from '../utils/constant';

function MenuDrawer({ classes, children, open }) {
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
          <ListItem button key={text}>
            <Link to={`/${text.toLocaleLowerCase()}`}>
              <ListItemText primary={text} />
            </Link>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

const ms = ({ ui }) => ({
  open: ui.menuDrawerOpen,
});

const drawerWidth = 240;

export default connect(ms)(withStyles(theme => ({
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
}))(MenuDrawer));
