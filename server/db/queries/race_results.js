// db/queries/race_results.js

const db = require('../../configs/db.config');

const getAllRaceResults = () => {
	return db.query("SELECT * FROM race_results;").then(data => {
		return data.rows;
	})
}

const getRaceResultsById = id => {
	return db.query("SELECT * FROM race_results; WHERE id = $1", [id]).then(data => {
		return data.rows;
	})
}

module.exports = {getAllRaceResults, getRaceResultsById}