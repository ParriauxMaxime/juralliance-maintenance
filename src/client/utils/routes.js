import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import Etablissements from '../screen/admin/Etablissements';

const AdminRouter = ({ children }) => (
  <Router>
    <React.Fragment>

      {children}
      <Switch>
        <Route path="/etablissements" component={Etablissements} />
        <Route path="*" component={null} />
      </Switch>
    </React.Fragment>
  </Router>
);

export default AdminRouter;
