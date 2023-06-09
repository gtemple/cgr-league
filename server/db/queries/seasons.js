// db/queries/seasons.js

const db = require('../../configs/db.config');

const getAllSeasons = () => {
	return db.query("SELECT * FROM seasons;").then(data => {
		return data.rows;
	})
}

const getSeasonResults = (id) => {
	return db.query(`
  SELECT u.id as user_id, u.human, u.first_name, u.last_name, u.initials, u.profile_image, r.id, r.dnf, r.fastest_lap, r.sprint, r.position, r.dotd, r.race_distance, r.race_order, r.dnf, r.pole_position, r.created_at, t.team_name, tr.name, tr.layout, tr.img, s.game, s.id as season_id
  FROM race_results r
  INNER JOIN users u ON r.user_id = u.id
  INNER JOIN tracks tr ON r.track_id = tr.id
  INNER JOIN seasons s ON r.season_id = s.id
  INNER JOIN teams t ON t.user_id = u.id AND t.season_id = s.id
  WHERE s.id = $1
  GROUP BY r.id, u.id, t.id, tr.id, s.game, s.id
  ORDER BY u.id, r.race_order
`, [id]).then(data => {
		return data.rows;
	})
}


module.exports = {getAllSeasons, getSeasonResults}