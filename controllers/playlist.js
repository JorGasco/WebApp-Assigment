'use strict';

// import all required modules
import logger from '../utils/logger.js';
import playlistStore from '../models/playlist-store.js';
import { v4 as uuidv4 } from 'uuid';
import accounts from './accounts.js';

const playlist = {
  index(request, response) {
      const loggedInUser = accounts.getCurrentUser(request);  
      const playlistId = request.params.id;
      logger.debug('Playlist id = ' + playlistId);
      if (loggedInUser) {
      const viewData = {
        title: 'Playlist',
        playlist: playlistStore.getPlaylist(playlistId),
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      };
      response.render('playlist', viewData);
      }
      else response.redirect('/');
  },
  deleteSong(request, response) {
    const playlistId = request.params.id;
    const songId = request.params.songid;
    logger.debug(`Deleting Song ${songId} from Playlist ${playlistId}`);
    playlistStore.removeSong(playlistId, songId);
    response.redirect('/playlist/' + playlistId);
  },
  addSong(request, response) {
    const playlistId = request.params.id;
    const playlist = playlistStore.getPlaylist(playlistId);
    const newSong = {
      id: uuidv4(),
      title: request.body.title,
      artist: request.body.artist,
      genre: request.body.genre,
      duration: request.body.duration,
    };
    playlistStore.addSong(playlistId, newSong);
    response.redirect('/playlist/' + playlistId);
  },
  updateSong(request, response) {
    const playlistId = request.params.id;
    const songId = request.params.songid;
    logger.debug("updating song " + songId);
    const updatedSong = {
      id: songId,
      title: request.body.title,
      artist: request.body.artist,
      genre: request.body.genre,
      duration: request.body.duration
    };
    playlistStore.editSong(playlistId, songId, updatedSong);
    response.redirect('/playlist/' + playlistId);
  }
};

export default playlist;