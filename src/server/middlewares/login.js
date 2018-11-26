// @flow
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dbManager from '../dbManager';
import { secret } from '../conf';

const mapModels = async (models: [string], username): [Object] => {
  const promises = models.map(e => dbManager.getModel(e).findOne({ username }));
  return Promise.all(promises);
};

export const hashSaltPassword = () => {
};

export default async (req: Object, res: Object, next: Function) => {
  const response = {
    data: {},
    error: null,
  };
  let status = 200;
  console.info(req.user);
  const { body: { username, password } } = req;
  const [admin, agent, direction] = await mapModels(['admin', 'agent', 'direction'], username);
  console.info('admin', admin);
  console.info('agent', agent);
  console.info('direction', direction);
  const UserNameNotFound = () => {
    status = 401;
    response.error = `User ${username} not found`;
  };
  const WrongPassword = () => {
    status = 401;
    response.error = 'Username / password tupple mismatch';
  };
  if (admin) {
    const pwd = bcrypt.hashSync(password, admin.password ? bcrypt.getRounds(admin.password) : 10);
    const auth = bcrypt.compareSync(password, admin.password);
    if (auth) {
      response.data.admin = jwt.sign({ admin_token: admin._id }, secret);
    } else {
      WrongPassword();
    }
  } else if (direction) {
    const auth = bcrypt.compareSync(password, direction.password);
    if (auth) {
      response.data.direction = jwt.sign({ direction_token: direction._id }, secret);
    } else {
      WrongPassword();
    }
  } else if (agent) {
    const auth = bcrypt.compareSync(password, agent.password);
    if (auth) {
      response.data.agent = jwt.sign({ agent_token: agent._id }, secret);
    } else {
      WrongPassword();
    }
  } else {
    UserNameNotFound();
  }
  // if ()
  // response.data.access_token
  res.status(status).json(response).send();
  next();
};
