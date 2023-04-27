// db/queries/users.js

const db = require('../../configs/db.config');

const getAllUsers = () => {
	return db.query("SELECT * FROM users;").then(data => {
		return data.rows;
	})
}

const getUserBioById = (id) => {
	return db.query(`
  SELECT * FROM users
  WHERE users.id = $1;
  `, [id]).then(data => {
		return data.rows;
	})
}

const getUserById = (id) => {
	return db.query(`
  SELECT u.id as user_id, u.human, u.first_name, u.last_name, u.initials, u.profile_image, r.id, r.dnf, r.fastest_lap, r.sprint, r.position, r.created_at, t.team_name, tr.name, s.game
  FROM race_results r
  INNER JOIN users u ON r.user_id = u.id
  INNER JOIN tracks tr ON r.track_id = tr.id
  INNER JOIN seasons s ON r.season_id = s.id
  INNER JOIN teams t ON t.user_id = u.id AND t.season_id = s.id
  WHERE u.id = $1
  GROUP BY r.id, u.id, t.id, tr.id, s.game
`, [id]).then(data => {
		return data.rows;
	})
}

module.exports = {getAllUsers, getUserBioById, getUserById}