
import mongoose from 'mongoose';
import _ from 'underscore';
import { schemas } from '../schemas';


const connectionURI = 'mongodb://localhost:27017/juralliance';

export class DBManager {
  constructor(props) {
    _.extend(this, props);
  }

  getConnections = () => mongoose.connections

  getModel(model) {
    try {
      const m = this.conn.models[model];
      if (!m) throw 'err';
      return m;
    } catch (err) {
      console.error('MODEL', model, 'NOT FOUND');
      console.error(err);
      return null;
    }
  }

  async connect() {
    await mongoose
      .connect(this.connectionURI, { useNewUrlParser: true })
      .then((conn) => {
        this.conn = conn;
        console.log(`Connected to mongoDB on ${this.connectionURI}`);
      })
      .then(() => {
        this.loadModels();
      });
  }

  loadModels = () => {
    const {
      EtablissementSchema, UserSchema,
    } = schemas;
    mongoose.model('user', UserSchema);
    mongoose.model('etablissement', EtablissementSchema);
    console.log('-- models loaded');
  }
}


export default new DBManager({ connectionURI });
