// db/queries/seasons.js

const db = require('../../configs/db.config');

const getAllSeasons = () => {
	return db.query("SELECT * FROM seasons;").then(data => {
		return data.rows;
	})
}

const getSeasonResults = (id) => {
	return db.query(`
  SELECT u.id as user_id, u.human, u.first_name, u.last_name, u.initials, u.profile_image, r.id, r.dnf, r.fastest_lap, r.sprint, r.position, r.race_order, r.created_at, t.team_name, tr.name, s.game
  FROM race_results r
  INNER JOIN users u ON r.user_id = u.id
  INNER JOIN tracks tr ON r.track_id = tr.id
  INNER JOIN seasons s ON r.season_id = s.id
  INNER JOIN teams t ON t.user_id = u.id AND t.season_id = s.id
  WHERE s.id = $1
  GROUP BY r.id, u.id, t.id, tr.id, s.game
  ORDER BY u.id, r.race_order
`, [id]).then(data => {
		return data.rows;
	})
}


module.exports = {getAllSeasons, getSeasonResults}