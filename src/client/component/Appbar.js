import React from 'react';
import { connect } from 'react-redux';
import {
  withStyles,
  AppBar,
  FormGroup,
  FormControlLabel,
  Switch,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import withRouter from 'react-router/withRouter';
import { Action, MENU_DRAWER_CLICK, LOG_OUT } from '../reducer/action';
import { fetchEndpoint } from '../utils/apiManager';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
});

class Appbar extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
  };

  handleDrawerClick = () => {
    this.props.dispatch(new Action(MENU_DRAWER_CLICK));
  }

  handleChange = (event) => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, logout } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <AppBar position="relative" className={classes.appBar}>
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.handleDrawerClick}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
              Juralliance maintenance
          </Typography>
          {auth && (
          <div>
            <IconButton
              aria-owns={open ? 'menu-appbar' : undefined}
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={this.handleClose}
            >
              <MenuItem onClick={this.handleClose}>Mon Profil</MenuItem>
              <MenuItem onClick={logout}>Se déconnecter</MenuItem>
            </Menu>
          </div>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

const ms = ({ ui }) => ({});
const md = (dispatch, { history }) => ({
  dispatch,
  logout: () => {
    history.push('/login');
    dispatch(new Action(LOG_OUT));
  },
});

export default withRouter(connect(ms, md)(withStyles(styles)(Appbar)));
