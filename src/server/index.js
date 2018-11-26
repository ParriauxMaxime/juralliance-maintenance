import jwt from 'express-jwt';
import { apiMiddleware } from './middlewares/api';
import loginMiddleware from './middlewares/login';
import db from './dbManager';
import { secret } from './conf';

const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const history = require('connect-history-api-fallback');

const config = require('../../webpack.config');

const app = express();

const compiler = webpack(config);

const port = 8080;

db.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(history());
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
}));

app.use('/login', loginMiddleware);

app.use(jwt({
  secret,
  credentialsRequired: false,
  getToken: function fromHeaderOrQuerystring(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    } if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  },
}));

app.use('/api/*', apiMiddleware);

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});
app.post('/api/world', (req, res) => {
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

// app.get('*', (req, res) => {
//   //res.send('lol');
// });

const server = app.listen(port, () => console.log(`Listening on port ${port}`));
