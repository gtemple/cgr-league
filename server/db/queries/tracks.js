// db/queries/tracks.js

const db = require('../../configs/db.config');

const getAllTracks = () => {
	return db.query("SELECT * FROM tracks;").then(data => {
		return data.rows;
	})
}

const getTracksById = id => {
	return db.query("SELECT * FROM tracks; WHERE id = $1", [id]).then(data => {
		return data.rows;
	})
}

module.exports = {getAllTracks, getTracksById}