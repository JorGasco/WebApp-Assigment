'use strict';

import JsonStore from './json-store.js';
            
const developerStore = {

  store: new JsonStore('./models/developer-store.json', { developers: [] }),
  collection: 'developers',

  getAllDevelopers() {
    return this.store.findAll(this.collection);
  },

};

export default developerStore;