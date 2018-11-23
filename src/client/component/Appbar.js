import React from "react";
import { connect } from 'react-redux'
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
  MenuItem
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { Action, MENU_DRAWER_CLICK } from "../reducer/action";

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
    this.props.dispatch(new Action(MENU_DRAWER_CLICK))
  }

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
        <AppBar position="relative" className={classes.appBar}>
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.handleDrawerClick}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Photos
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
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={this.handleClose}>My account</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
    );
  }
}

const ms = ({ui}) => {
  return {}
}

export default connect(ms)(withStyles(styles)(Appbar));
