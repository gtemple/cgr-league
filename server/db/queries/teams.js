// db/queries/teams.js

const db = require('../../configs/db.config');

const getAllTeams = () => {
	return db.query("SELECT * FROM teams;").then(data => {
		return data.rows;
	})
}

const getTeamsById = id => {
	return db.query("SELECT * FROM teams; WHERE id = $1", [id]).then(data => {
		return data.rows;
	})
}

module.exports = {getAllTeams, getTeamsById}