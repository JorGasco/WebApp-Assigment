'use strict';

import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

import logger from '../utils/logger.js';

class JsonStore {
  constructor(file, defaults) {
    this.db = new Low(new JSONFile(file))
    this.db.read()
    this.db.data ||= defaults
  }  

  findAll(collection) {
    return this.db.data[collection];
  }
 
  findOneBy(collection, filter) {
    const results = this.db.data[collection].filter(filter);
    return results[0];
  }
  
  async removeCollection(collection, obj) {
    const index = this.db.data[collection].indexOf(obj);
    if (index > -1) {
      this.db.data[collection].splice(index, 1);
    }
    await this.db.write()
  }
  
  async removeItem(collection, id, arr, itemId) {
    const data = this.db.data[collection].filter(c => c.id === id);
    const item = data[0][arr].filter(i => i.id === itemId);
    const index = data[0][arr].indexOf(item[0]);    
    if (index > -1) {
      data[0][arr].splice(index, 1);
    }
    await this.db.write()
  }
  
  async removeAll(collection) {
    this.db.data[collection].length = 0;
    await this.db.write()
  }
  
  async addCollection(collection, obj) {
    this.db.data[collection].push(obj);
    await this.db.write()
  }
  
  async addItem(collection, id, arr, obj) {
    const data = this.db.data[collection].filter(c => c.id === id);
    data[0][arr].push(obj);
    await this.db.write();
  }
  
  async editItem(collection, id, itemId, arr, obj) {
    const data = this.db.data[collection].filter(c => c.id === id);
    let index = data[0][arr].findIndex(i => i.id === itemId);
    data[0][arr].splice(index, 1, obj);
    await this.db.write();
  }
  
  findBy(collection, filter) {
    const results = this.db.data[collection].filter(filter);
    return results;
  }
  
}

export default JsonStore;