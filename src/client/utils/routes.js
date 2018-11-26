import React from 'react';
import {
  Router, Route, Switch,
} from 'react-router-dom';
import Etablissements from '../screen/admin/Etablissements';


const AdminRouter = ({ children, history }) => (
  <React.Fragment>
    {children}
    <Router history={history}>
      <Switch>
        <Route path="/etablissements" component={Etablissements} />
        <Route path="*" component={null} />
      </Switch>
    </Router>
  </React.Fragment>
);

export default AdminRouter;
