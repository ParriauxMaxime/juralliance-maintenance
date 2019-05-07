import db from '../dbManager';

export const apiMiddleware = async (req, res, next) => {
  let status = 200;
  const data = {
    data: null,
    error: null,
  };
  const api = req.originalUrl.split('/').slice(-1)[0];
  const { type, ...rest } = req.body;
  console.info('=>', req.originalUrl);
  console.info('=> api', api, type);
  const model = db.getModel(api);
  switch (type) {
    case 'insert': {
      try {
        console.info('=> data', req.body);
        await model.create(rest);
        data.data = { rest };
      } catch (err) {
        status = 500;
        data.error = err;
      }
      break;
    }
    case 'find': {
      try {
        data.data = await model.find(rest);
      } catch (err) {
        status = 500;
        data.error = err;
      }
      break;
    }
    case 'update': {
      try {
        data.data = await model.updateOne({ _id: rest._id }, rest);
      } catch (err) {
        status = 500;
        data.error = err;
      }
      break;
    }
    case 'delete': {
      try {
        data.data = await model.deleteOne({ _id: rest._id });
      } catch (error) {
        status = 500;
        data.error = error;
      }
      break;
    }
    default: {
      break;
    }
  }
  res.status(status).json(data).send();
  next();
};

export default apiMiddleware;
