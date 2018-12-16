import React, { Fragment } from 'react';
import { withStyles, Grow } from '@material-ui/core';
import createBrowserHistory from 'history/createBrowserHistory';
import { Router, Route } from 'react-router-dom';
import Redirect from 'react-router-dom/Redirect';
import Switch from 'react-router/Switch';
import { connect } from 'react-redux';
import Appbar from '../component/Appbar';
import MenuDrawer from '../component/MenuDrawer';
import AdminRouter from '../utils/routes';
import Login from './Login';
import Snackbar from '../component/Snackbar';


const history = createBrowserHistory();

function Base({
  classes, children, admin, agent, direction,
}) {
  return (
    <React.Fragment>
      <Router history={history}>
        <Switch>

          <Route
            path="/login"
            render={() => {
              if (admin || agent || direction) return <Redirect to="/" />;
              return <Login />;
            }}
          />
          <Route
            path="*"
            render={() => {
              if (admin) {
                return (
                  <div className={classes.root}>
                    <Appbar />
                    <div className={classes.content}>
                      <Grow in>
                        <AdminRouter history={history}>
                          <MenuDrawer />
                        </AdminRouter>
                      </Grow>
                    </div>
                  </div>
                );
              }
              return <Redirect to="/login" />;
            }
        }
          />
        </Switch>
      </Router>
      <Snackbar />
    </React.Fragment>
  );
}

const ms = ({ login: { token, type } }, ownProps) => ({
  ...ownProps,
  token,
  type,
  admin: localStorage.getItem('admin-access-token'),
  agent: localStorage.getItem('agent-access-token'),
  direction: localStorage.getItem('direction-access-token'),
});


export default connect(ms)(withStyles(theme => ({
  content: {
    display: 'flex',
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
}))(Base));
