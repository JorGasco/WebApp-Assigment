'use strict';

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';

const playlistStore = {

  store: new JsonStore('./models/playlist-store.json', { playlistCollection: [] }),
  collection: 'playlistCollection',

  getAllPlaylists() {
    return this.store.findAll(this.collection);
  },
  
  getPlaylist(id) {
    return this.store.findOneBy(this.collection, (collection => collection.id === id));
  },
  
  removeSong(id, songId) {
    const arrayName = "songs";
    this.store.removeItem(this.collection, id, arrayName, songId);
  },
  
  removePlaylist(id) {
    const playlist = this.getPlaylist(id);
    this.store.removeCollection(this.collection, playlist);
  },
  
  removeAllPlaylists() {
    this.store.removeAll(this.collection);
  },
  
  addPlaylist(playlist) {
    this.store.addCollection(this.collection, playlist);
  },
  
  addSong(id, song) {
    const arrayName = "songs";
    this.store.addItem(this.collection, id, arrayName, song);
  },
  
  editSong(id, songId, updatedSong) {
    const arrayName = "songs";
    this.store.editItem(this.collection, id, songId, arrayName, updatedSong);
  },
  
  getUserPlaylists(userid) {
    return this.store.findBy(this.collection, (playlist => playlist.userid === userid));
  },

};

export default playlistStore;