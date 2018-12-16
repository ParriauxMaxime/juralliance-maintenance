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

const admin = 'admin';
const agent = 'agent';
const direction = 'direction';


export default async (req: Object, res: Object, next: Function) => {
  const response = {
    data: {},
    error: null,
  };
  let status = 200;
  const UserNameNotFound = () => {
    status = 401;
    response.error = `User ${username} not found`;
  };
  const WrongPassword = () => {
    status = 401;
    response.error = 'Username / password tupple mismatch';
  };
  console.info(req.user);
  const { body: { username, password } } = req;
  try {
    const [user] = await mapModels(['user'], username);
    const { password: dbPwd, type, _id } = user;
    const auth = bcrypt.compareSync(password, dbPwd);
    if (auth) { response.data[type] = jwt.sign({ [`${type}_token`]: _id }, secret); }
    // const pwd = bcrypt.hashSync(password, password ? bcrypt.getRounds(password) : 10);
    else { WrongPassword(); }
  } catch (err) {
    UserNameNotFound();
  } finally {
    res.status(status).json(response).send();
  }
  next();
};
