import _ from 'underscore'

export class Etablissement {
  name: string = "";
  _id: string = null;
  address: string = "";
  agents: [] = [];

  constructor(props) {
    _.extend(this, props);
  }
}

export const etablissements = [
  new Etablissement({
    name: "Hello world",
    address: "7 rue du 8 mai"
  }),
  new Etablissement({
    name: "Never gonna",
    address: "Los angeles"
  }),
  new Etablissement({
    name: "give you up",
    address: "paris"
  }),
]
