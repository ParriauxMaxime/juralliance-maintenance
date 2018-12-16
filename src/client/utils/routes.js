import React from 'react';
import {
  Router, Route, Switch,
} from 'react-router-dom';
import Etablissements from '../screen/admin/Etablissements';
import Users from '../screen/admin/Users';
import WIP from '../component/WIP';
import Etablissement from '../screen/admin/Etablissement';
import User from '../screen/admin/User';


const AdminRouter = ({ children, history }) => (
  <React.Fragment>
    {children}
    <Router history={history}>
      <Switch>
        <Route path="/etablissements" component={Etablissements} />
        <Route path="/utilisateurs" component={Users} />
        <Route path="/etablissement/:id" component={Etablissement} />
        <Route path="/utilisateur/:id" component={User} />
        <Route path="*" component={WIP} />
      </Switch>
    </Router>
  </React.Fragment>
);

export default AdminRouter;
